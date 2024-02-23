import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card"
import { TOWNS, formatWhatIsOpenTime } from "../lib/utils";
import {BiRightArrow} from "react-icons/bi"
import { FaChevronDown, FaChevronLeft } from "react-icons/fa";
import {restaurantCalls} from "../api/restaurant.js"

const AllRestaurants = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [towns, setTowns] = useState([]);
    const [town, setTown] = useState("all")
    const [time, setTime] = useState("");
    const [weekday, setWeekday] = useState("");
    const [filterDisplay, setFilterDisplay] = useState(false)
    
    const toggleFilterDisplay = () => {
        setFilterDisplay(!filterDisplay)
    }

    const addTown = (townName) => {
        let town = document.getElementById(townName)
        if (town.checked) {
            setTowns(towns => [...towns, town.value])
        } else if (!town.checked && towns.includes(town.value)) {
            setTowns(towns.filter(x => x !== town.value))
        }
    }

    const addTime = () => {
        let date = new Date();
        let currHour = String(date.getHours());
        let currMinute = String(date.getMinutes());
        let currWeekday = date.getDay();
        let filterTime = document.getElementById("open")
        if (filterTime.checked) {
            setTime(formatWhatIsOpenTime(currHour, currMinute))
            setWeekday(currWeekday)
            console.log(formatWhatIsOpenTime(currHour, currMinute))
        } else if (!filterTime.checked) {
            setTime("")
            setWeekday("")
        }
    }
    
    useEffect(() => {
        restaurantCalls.getAllRestaurants(town, towns, time, weekday)
        .then((response) => {
            setRestaurants(response.data)
        })
    }, [town, towns, time])

    return (
        <div className="flex justify-center">
        <div className="w-[90%]">
            <div className="flex md:flex-row flex-col w-full bg-[#dfebf2] pt-4 h-screen">
                <div className="flex flex-col md:w-1/6 w-full">
                    <div className="flex flex-col w-full pl-8">
                        <div className="flex flex-row w-full gap-12 justify-center md:justify-start">
                            <p className="md:text-2xl text-lg font-semibold text-nowrap md:border-0 border-b-2 border-black">View by:</p>
                            <button onClick={toggleFilterDisplay} className="md:hidden">{filterDisplay ? <FaChevronDown /> : <FaChevronLeft />}</button>
                        </div>
                        
                        <div className={`md:inline ${filterDisplay ? "" : "hidden"}`}>
                            <p className="font-semibold border-y-2 border-slate-300 mt-2 mb-2 md:w-full w-1/6 sm:w-[8%]">Town</p>
                            {TOWNS.map((town) => (
                                <div className="flex flex-row">
                                    <input type="checkbox" name={town} id={town} className="mr-2" value={town} onClick={() => addTown(town)}/>
                                    <label htmlFor="" className="text-nowrap">{town}</label>
                                </div>
                            ))}
    
                            <p className="font-semibold border-y-2 border-slate-300 mt-2 mb-2 md:w-full w-[36%] sm:w-[17%] text-nowrap">What's open</p>
                            <div className="flex flex-row">
                                <input type="checkbox" name="open" id="open" className="mr-2" value="open" onClick={() => addTime()}/>
                                <label htmlFor="" className="text-nowrap">Currently Open</label>
                            </div>
                        </div>
                        
                    </div>
                </div>
                
                
                <div className="flex flex-col md:w-5/6">
                    <p className="text-center md:text-4xl text-2xl md:pt-0 pt-3">Restaurants and Bars</p>
                    <div className="flex flex-col justify-center gap-2 pt-4">
                        <div className="flex flex-wrap justify-center gap-2">
                            {restaurants.map(restaurant => (
                                <Card className="relative md:w-[380px] md:h-[450px] w-[190px] h-[225px] bg-white outline outline-2 -outline-offset-8 outline-slate-300" key={restaurant.id}>
                                    <img className="w-full h-1/2" src={`${process.env.REACT_APP_API_ENDPOINT}/${restaurant.profileImage}`} alt="not working"/>
                                    <p className="md:text-xl text-base md:pl-5 pt-2 font-semibold text-center text-balance cursor-pointer"><Link to={`/restaurants/${restaurant.id}`}>{restaurant.restaurantName}</Link></p>
                                    <p className="md:overflow-hidden pl-5 pr-5 pt-2 mb-20 hidden md:inline">{restaurant.description}</p>
                                    <div className="md:pt-3 md:pl-[38%] pl-[25%] pt-4">
                                        <button type="button" className="bg-[#56707E] px-6 py-2 text-white text-sm font-semibold outline outline-1 -outline-offset-4"><Link to={`/restaurants/${restaurant.id}`}>Details</Link></button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                
                
                </div>
            </div>
            
        </div></div>
    );
}
 
export default AllRestaurants;