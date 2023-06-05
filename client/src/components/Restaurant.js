import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Map from "./profile_components/restaurant_components/restaurant_subcomponents/Map";

const Restaurant = () => {
    const [menuTypes, setMenuTypes] = useState([]);
    const [specialTypes, setSpecialTypes] = useState([]);
    const [valid, setValid] = useState(true);
    const [restaurant, setRestaurant] = useState("")

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

    return (
        <div className="container">
            {valid ? (
                <div>
                    <p className="text-3xl text-center">{restaurant.restaurantName}</p>
                    <div className="flex flex-row gap-3">
                        <p>Main Page</p>
                        {specialTypes.map((y) => {
                            return (
                                <p>{y}</p>
                            )
                        })}
                        {menuTypes.map((x) => {
                            return (
                                <p>{x}</p>
                            )
                        })}
                    </div>
                    <div>
                        <p>Map area</p>
                        <Map restaurant={restaurant}/>
                    </div>
                    
                </div>
                
            ) : (
                <p>Try again</p>
            )}
        </div>
    );
}
 
export default Restaurant;