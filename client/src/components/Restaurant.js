import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Map from "./profile_components/restaurant_components/restaurant_subcomponents/Map";
import { WEEKDAYS, formatMenuDayAvailability } from "../lib/utils";

const Restaurant = () => {
    const [menuTypes, setMenuTypes] = useState([]);
    const [specialTypes, setSpecialTypes] = useState([]);
    const [valid, setValid] = useState(true);
    const [restaurant, setRestaurant] = useState("");
    const [specialsEvents, setSpecialsEvents] = useState([]);
    const [menus, setMenus] = useState([]);
    const [mainPageVisible, setMainPageVisible] = useState(true);
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMainPageVisible = () => {
        setMainPageVisible(!mainPageVisible);
        setMenuVisible(false);
    }

    const toggleMenuVisible = () => {
        setMenuVisible(true);
        setMainPageVisible(false);
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
            setMenus(response.data.restaurant.Menus)
            setSpecialsEvents(response.data.restaurant.SpecialEvents);
            setRestaurant(response.data.restaurant)
        }, (error) => {
            console.log(error)
        })
    };

    const getMenuTypes = () => {
        axios.get(`http://localhost:3000/restaurants/${id}/${typeOfMenu}`, { params: {
            id: id
        }})
    }

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
                        <div className={`${menuVisible ? "flex" : "hidden"}`}>
                            {menus ? menus.map((x, i) => {
                                return (
                                    <div>
                                        <p>{i === 0 ? x.menuType : ""}</p>
                                        <br />
                                        <p>{i === 0 ? `Available ${x.everyday ? "everyday" : formatMenuDayAvailability(WEEKDAYS.map(day => x[day.toLowerCase()] ? day : null))} from ${x.startTime} - ${x.endTime}` : ""}</p>
                                        {/* <p>{i === 0 ? `Available ${x.everyday ? "everyday" : formatMenuDayAvailability([determineSundayAvailability(x.sunday), determineMondayAvailability(x.monday), determineTuesdayAvailability(x.tuesday), determineWednesdayAvailability(x.wednesday), determineThursdayAvailability(x.thursday), determineFridayAvailability(x.friday), determineSaturdayAvailability(x.saturday)])} from ${x.startTime} - ${x.endTime}` : ""}</p> */}
                                        <img src={`http://localhost:3000/${x.menuImage}`} alt="error" />
                                    </div>
                                )
                            }) : ""}
                        </div>
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