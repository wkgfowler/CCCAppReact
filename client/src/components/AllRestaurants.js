import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card"
import { TOWNS, formatWhatIsOpenTime } from "../lib/utils";
import {BiRightArrow} from "react-icons/bi"

const AllRestaurants = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [towns, setTowns] = useState([]);
    const [town, setTown] = useState("all")
    const [time, setTime] = useState("");
    const [weekday, setWeekday] = useState("");

    

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

    const navigate = useNavigate();

    const config = {
        params: {
            towns: towns,
            time: time,
            weekday: weekday
        }
    }

    const getRestaurants = () => {
        axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/getRestaurants/${town}`, config)
        .then((response) => {
            console.log(response.data)
            setRestaurants(response.data)
        }, (error) => {
            console.log(error)
        })
    }
    
    useEffect(() => {
        getRestaurants()
    }, [town, towns, time])

    return (
        <div className="container">
            <div className="flex flex-row w-full bg-[#dfebf2] pt-4 h-screen">
                <div className="flex flex-col w-1/6">
                    <div className="flex flex-col w-full pl-8">
                        <p className="text-2xl font-semibold">View by:</p>
                        
                        <p className="font-semibold border-y-2 border-slate-300 mt-2 mb-2">Town</p>
                        {TOWNS.map((town) => (
                            <div className="flex flex-row">
                                <input type="checkbox" name={town} id={town} className="mr-2" value={town} onClick={() => addTown(town)}/>
                                <label htmlFor="">{town}</label>
                            </div>
                        ))}

                        <p className="font-semibold border-y-2 border-slate-300 mt-2 mb-2">What's open</p>
                        <div className="flex flex-row">
                            <input type="checkbox" name="open" id="open" className="mr-2" value="open" onClick={() => addTime()}/>
                            <label htmlFor="">Currently Open</label>
                        </div>
                    </div>
                </div>
                
                
                <div className="flex flex-col w-5/6">
                    <p className="text-center text-4xl">Restaurants and Bars</p>
                    <div className="flex flex-col justify-center gap-2 pt-4">
                        <div className="flex flex-wrap justify-center gap-2">
                            {restaurants.map(restaurant => (
                                <Card className="relative w-[380px] h-[450px] bg-white outline outline-2 -outline-offset-8 outline-slate-300" key={restaurant.id}>
                                    <img className="w-full h-1/2" src={`${process.env.REACT_APP_API_ENDPOINT}/${restaurant.profileImage}`} alt="not working"/>
                                    <p className="text-xl pl-5 pt-2 font-semibold">{restaurant.restaurantName}</p>
                                    <p className="overflow-hidden pl-5 pr-5 pt-2 mb-20">{restaurant.description}</p>
                                    <div className="absolute bottom-5 pl-5">
                                        <button type="button" className="bg-[#56707E] px-6 py-2 text-white text-sm font-semibold outline outline-1 -outline-offset-4"><Link to={`/restaurants/${restaurant.id}`}>Details</Link></button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                
                
                </div>
            </div>
            
        </div>
    );
}
 
export default AllRestaurants;