import axios from "axios";
import { FaFacebook, FaInstagram } from "react-icons/fa"
import { Fragment, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Map from "./profile_components/restaurant_components/restaurant_subcomponents/Map";
import { WEEKDAYS, convertToNormalHours, determineIsRecurring, formatDateDisplay, formatMenuDayAvailability, formatSpecialEventDays, months } from "../lib/utils";
import { UserContext } from "../context/UserContext";
import { PermissionContext } from "../context/PermissionContext";
import { useAlert } from "react-alert";
import MenuFullScreen from "./profile_components/restaurant_components/restaurant_subcomponents/MenuFullScreen";
import { restaurantCalls } from "../api/restaurant";

const Restaurant = () => {
    const {user, setUser} = useContext(UserContext)
    const {permission, setPermission} = useContext(PermissionContext)

    let date = new Date();
    let weekday = date.getDay();

    const [menuTypes, setMenuTypes] = useState([]);
    const [specialTypes, setSpecialTypes] = useState([]);
    const [valid, setValid] = useState(true);
    const [restaurant, setRestaurant] = useState("");
    const [allSpecialsEvents, setAllSpecialsEvents] = useState([])
    const [specialsEvents, setSpecialsEvents] = useState([]);
    const [allMenus, setAllMenus] = useState([]);
    const [menus, setMenus] = useState([]);
    const [hours, setHours] = useState([]);
    const [images, setImages] = useState([]);
    const [mainPageVisible, setMainPageVisible] = useState(true);
    const [menuVisible, setMenuVisible] = useState(false);
    const [typeOfMenu, setTypeOfMenu] = useState("all");
    const [typeOfSpecialsEvents, setTypeOfSpecialsEvents] = useState("");
    const [specialsEventsVisible, setSpecialsEventsVisible] = useState(false);
    const [visibleTitle, setVisibleTitle] = useState("Description");
    const [todaysOpenHour, setTodaysOpenHour] = useState();
    const [todaysCloseHour, setTodaysCloseHour] = useState();
    const [followed, setFollowed] = useState(false);

    const toggleMainPageVisible = () => {
        setMainPageVisible(true);
        setVisibleTitle("Description")
        setMenuVisible(false);
        setSpecialsEventsVisible(false);
    }

    const toggleMenuVisible = () => {
        setMenuVisible(true);
        setMainPageVisible(false);
        setSpecialsEventsVisible(false);
    }

    const toggleSpecialsEventsVisible = () => {
        setSpecialsEventsVisible(true);
        setMainPageVisible(false);
        setMenuVisible(false);
    }

    const {id} = useParams()

    useEffect(() => {
        validRestaurant()
    }, [])

    const validRestaurant = () => {
        restaurantCalls.getRestaurant(id, user.id)
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
            setAllMenus(response.data.restaurant.Menus)
            setAllSpecialsEvents(response.data.restaurant.SpecialEvents)
            setRestaurant(response.data.restaurant)
            setHours(response.data.hours)
            setImages(response.data.images)
            setFollowed(response.data.valid)
            let daysHours = response.data.hours.filter(hour => hour.weekday === weekday);
            console.log(daysHours);
            setTodaysOpenHour(convertToNormalHours(daysHours[0].openHour));
            setTodaysCloseHour(convertToNormalHours(daysHours[0].closeHour));
        }, (error) => {
            console.log(error)
        })
    };
    
    const filterMenus = (x) => {
        const filteredMenus = allMenus.filter(menu => menu.menuType === x)
        setMenus(filteredMenus)
    }

    const filterSpecialsEvents = (y) => {
        const filteredSpecialsEvents = allSpecialsEvents.filter(specialEvent => specialEvent.recurring === determineIsRecurring(y))
        setSpecialsEvents(filteredSpecialsEvents)
    }


    // trying to add the ability to follow restaurant
    const alert = useAlert();

    const followRestaurant = () => {
        if (user) {
            axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/followRestaurant`, {
                restaurantId: id,
                userId: user.id
            }, {
                headers: {
                    "token": localStorage.getItem("token")
                }
            })
            .then((response) => {
                console.log("FUCKING RIGHT")
                alert.success(`Now following ${restaurant.restaurantName}`)
                setFollowed(true)
            }, (error) => {
                console.log(error)
            })
        } else {
            alert.error("You must log in to follow a restaurant")
        }
    }

    const unfollowRestaurant = (restaurantId, userId) => {
        axios.delete(`${process.env.REACT_APP_API_ENDPOINT}/api/unfollowRestaurant/${restaurantId}/${userId}`)
        .then((response) => {
            console.log("right again!!")
            setFollowed(false)
            alert.success(`No longer following ${restaurant.restaurantName}`)
        }, (error) => {
            console.log(error)
        })
    }

    if (valid) {
        return (
            <div className="container text-[#56707E]">
                <div className="flex flex-row">
                    <div className="w-full border-b-2 border-[#56707E] pb"></div>
                    <div className="w-full translate-y-3">
                        <p className="text-2xl text-center">Todays Hours: {todaysOpenHour === "Closed" ? todaysOpenHour : `${todaysOpenHour} - ${todaysCloseHour}`}</p>
                    </div>
                    <div className="w-full border-b-2 border-[#56707E] pb"></div>
                </div>
         
                <div className="flex flex-row pt-4">

                    <div className="flex flex-col w-full h-1/3">
    
                            <div className="flex flex-row w-full">

                                <div className="flex flex-col w-1/2 text-white pt-1 rounded">                
                                    <Map className="" restaurant={restaurant}/>
                                </div>

                                <div className="flex flex-col w-1/2 h-full">
                                    <div id="carouselExampleIndicators" className="carousel slide h-full" data-ride="carousel">
                                        <div className="carousel-indicators">
                                            {images.map((image,i) => (
                                                i === 1 ?
                                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={i} className="active" aria-current="true" aria-label={i}></button>
                                                :
                                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={i} aria-label={i}></button>
                                            ))}
                                        </div>
                                        <div className="carousel-inner h-auto">
                                            <div className="carousel-item active">
                                                <img className="pt-1 h-[409px] w-full" src={`${process.env.REACT_APP_API_ENDPOINT}/${restaurant.profileImage}`} alt="not working"/>
                                            </div>
                                            {images.map(image => (
                                                <div className="carousel-item">
                                                    <img className="pt-1 h-[409px] w-full" src={`${process.env.REACT_APP_API_ENDPOINT}/${image.image}`} alt="not working"/>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                            </div>
                            
                    </div>
                </div>

                <div className="flex flex-row w-full">
                    <div className="w-1/2">
                        <div className="flex flex-col border-1 w-4/5 border-white ml-20 -translate-y-32 bg-white pt-6 pl-6 rounded">
                            <p className="text-4xl font-semibold">{restaurant.restaurantName}</p>
                            <br />
                            <p className="text-md">{restaurant.streetAddress}, {restaurant.town}, NC</p>
                            <p className="text-md">{restaurant.phoneNumber}</p>
                            <a href={`https://${restaurant.websiteURL}`} className="cursor-pointer" target="_blank">{restaurant.websiteURL}</a>
                            <br />
                            <div className="flex flex-row gap-2">
                                {restaurant.facebookURL && <a href={`https://${restaurant.facebookURL}`} className="cursor-pointer" target="_blank"><FaFacebook className="text-2xl"/></a>}
                                {restaurant.instagramURL && <a href={`https://${restaurant.instagramURL}`} className="cursor-pointer" target="_blank"><FaInstagram className="text-2xl"/></a>}
                                {/* {user.followedRestaurants.some(checkRestaurantId) ? <button onClick={() => unfollowRestaurant(restaurant.id, user.id)}>Unfollow</button> : <button onClick={followRestaurant}>Follow us!</button>} */}
                                {followed ? <button onClick={() => unfollowRestaurant(restaurant.id, user.id)}>Unfollow</button> : <button onClick={followRestaurant}>Follow us!</button>}
                            </div>
                        </div>
                    </div>    
                
                </div>
                


                <div className="flex flex-col w-full -translate-y-28">
                    
                    <div className="flex flex-row w-full justify-center gap-4">
                        <p className={`text-2xl cursor-pointer mt-4 ${mainPageVisible ? "font-bold border-x border-t px-2 border-slate-900" : ""}`} onClick={toggleMainPageVisible}>Description</p>
                            {specialTypes.map((y) => {
                                return (
                                    <p className={`text-2xl cursor-pointer mt-4 ${specialsEventsVisible && 
                                        typeOfSpecialsEvents === y ? "font-bold border-x border-t px-2 border-slate-900" : ""}`}
                                        onClick={() => {setTypeOfSpecialsEvents(y); setVisibleTitle(y); filterSpecialsEvents(y); toggleSpecialsEventsVisible()}}>{y}</p>
                                )
                            })}
                            {menuTypes.map((x) => {
                                return (
                                    <p className={`text-2xl cursor-pointer mt-4 ${menuVisible && typeOfMenu === x ? 
                                        "font-bold border-x border-t px-2 border-slate-900" : ""}`} 
                                        onClick={() => {setTypeOfMenu(x); setVisibleTitle(x); filterMenus(x); toggleMenuVisible()}}>{x}</p>
                                )
                            })}
                    </div>
                    
                    <div className="flex flex-row w-full border-t-2">
                        
                        <div className="flex flex-col w-1/5">
                            <br />
                            <div className="flex flex-col w-full bg-[#B2C9CE] rounded pl-6 py-6 gap-1">
                                <p className="text-xl font-semibold underline">HOURS</p>
                                    {hours.map((x) => (
                                        <div className="flex flex-row">
                                            <p className="font-semibold">{WEEKDAYS[x.weekday]}&nbsp; | &nbsp;</p>
                                            <p>{x.openHour === "Closed" ? x.openHour : `${convertToNormalHours(x.openHour)} - ${convertToNormalHours(x.closeHour)}`}</p>
                                        </div>
                                    ))}
                            </div>
                            
                        </div>
                    
                        <div className="flex flex-col w-4/5">
                            <div className={mainPageVisible ? "flex" : "hidden"}>
                                <div className="flex flex-row w-full">
                                    <p className="text-lg pl-6 pt-3">{restaurant.description}</p>
                                </div>  
                            </div>
                            <div className={`${specialsEventsVisible ? "flex" : "hidden"}`}>
                                {specialsEvents.map(specialEvent => (
                                    <div key={specialEvent.id} className="flex flex-col w-full text-lg pl-6 pt-4">
                                        <div className="flex flex-col">
                                            <div>
                                                {specialEvent.specialOrEvent === "special" ? <p className="text-xl font-medium underline">Special</p> : <p className="text-xl font-medium underline">Event</p>}
                                            </div>
                                            <div className="flex flex-row pl-2">
                                                <p>{specialEvent.name} - {specialEvent.description}</p>
                                            </div>
                                            <div className="flex flex-row pl-2">
                                                {specialEvent.specialOrEvent === "special" ? <p>Available &nbsp;</p> : <p>Happening &nbsp;</p>}
                                                {specialEvent.specialEventDate ? <p>{formatDateDisplay(specialEvent.specialEventDate)}</p> : <p>every {formatSpecialEventDays(specialEvent.weekdays.sort())}</p>}
                                                <p>&nbsp; from {convertToNormalHours(specialEvent.startTime)} - {convertToNormalHours(specialEvent.endTime)}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        
                        
                            <div className={`${menuVisible ? "flex flex-col pl-2" : "hidden"}`}>
                                {menus ? menus.map((x, i) => {
                                    return (
                                        <div>
                                            <p className="text-center text-2xl pt-4">{i === 0 ? `Available ${x.everyday ? "everyday" : formatMenuDayAvailability(WEEKDAYS.map(day => x[day.toLowerCase()] ? day : null))} from ${x.startTime} - ${x.endTime}` : ""}</p>
                                            {/* <img src={`${process.env.REACT_APP_API_ENDPOINT}/${x.menuImage}`} alt="error" id={`${x.id}`} onClick={() => testFullScreen(x.id)}/> */}
                                            <MenuFullScreen menu={x}/>
                                        </div>
                                    )
                                }) : ""}
                            </div>
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
}
 
export default Restaurant;