import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Map from "./profile_components/restaurant_components/restaurant_subcomponents/Map";

const Restaurant = () => {
    const [menuTypes, setMenuTypes] = useState([]);
    const [specialTypes, setSpecialTypes] = useState([]);
    const [valid, setValid] = useState(true);
    const [restaurant, setRestaurant] = useState("");
    const [mainPageVisible, setMainPageVisible] = useState(true);

    const toggleMainPageVisible = () => {
        setMainPageVisible(!mainPageVisible);
    }

    const {id} = useParams()

    useEffect(() => {
        validRestaurant()
    }, [])

    const validRestaurant = () => {
        axios.get(`http://localhost:3000/restaurants/${id}`, { params: {
            id
        }
        })
        .then((response) => {
            console.log(response.data)
            const eachMenu = response.data.restaurant.Menus
            const eachMenuType = []
            for (let i = 0; i < eachMenu.length; i++) {
                eachMenuType.push(eachMenu[i].menuType)
            }
            const eachMenuTypeNoRepeats = [...new Set(eachMenuType)]
            const eachSpecial = response.data.restaurant.SpecialEvents
            const eachSpecialType = []
            for (let i = 0; i < eachSpecial.length; i++) {
                if (eachSpecial[i].recurring) {
                    eachSpecialType.push("Recurring Specials")
                } else {
                    eachSpecialType.push("Upcoming Specials")
                }
            }
            const eachSpecialTypeNoRepeats = [...new Set(eachSpecialType)]
            setSpecialTypes(eachSpecialTypeNoRepeats)
            setMenuTypes(eachMenuTypeNoRepeats)
            setValid(response.data)
            setRestaurant(response.data.restaurant)
        }, (error) => {
            console.log(error)
        })
    };
    if (valid) {
        return (
            <div className="container">
                <p className="text-4xl text-center pt-3">{restaurant.restaurantName}</p>
                <div className="flex flex-row pt-4">
                    <div className="flex flex-col w-2/12">
                        <p className={`text-lg cursor-pointer ${mainPageVisible ? "font-bold border-y border-l pl-2 border-slate-900" : ""}`} onClick={toggleMainPageVisible}>Main Page</p>
                        {specialTypes.map((y) => {
                            return (
                                <p className={`text-lg cursor-pointer`}>{y}</p>
                            )
                        })}
                        {menuTypes.map((x) => {
                            return (
                                <p className={`text-lg cursor-pointer`}>{x}</p>
                            )
                        })}
                        <p>Map area</p>
                        <Map restaurant={restaurant}/>
                    </div>
                    <div className="flex flex-col w-10/12">
                        <div className={mainPageVisible ? "flex" : "hidden"}>
                            <img className="w-full h-1/2 px-1 pt-1" src={`http://localhost:3000/${restaurant.profileImage}`} alt="not working"/>
                        </div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        )
    } else {
        <div>
            <p>Try again</p>
        </div>
    }
                // <div>
                //     <p className="text-3xl text-center">{restaurant.restaurantName}</p>
                //     <div className="flex flex-row gap-3">
                //         <p>Main Page</p>
                //         {specialTypes.map((y) => {
                //             return (
                //                 <p>{y}</p>
                //             )
                //         })}
                //         {menuTypes.map((x) => {
                //             return (
                //                 <p>{x}</p>
                //             )
                //         })}
                //     </div>
                //     <div>
                //         <p>Map area</p>
                //         <Map restaurant={restaurant}/>
                //     </div>
                    
                // </div>
                
}
 
export default Restaurant;