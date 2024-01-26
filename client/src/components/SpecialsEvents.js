import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { TOWNS, classNames, formatDateDate, formatDateDay, formatDateMonth, formatLastMonth, formatMonth, formatNextMonth, formatSpecialEventDays, months } from '../lib/utils';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"

const SpecialsEvents = () => {
    let [specials, setSpecials] = useState([]);
    const [eventsOrSpecials, setEventsOrSpecials] = useState([]);
    const [towns, setTowns] = useState([]);
    const navigate = useNavigate();

    const addTown = (townName) => {
        let town = document.getElementById(townName)
        if (town.checked) {
            setTowns(towns => [...towns, town.value])
        } else if (!town.checked && towns.includes(town.value)) {
            setTowns(towns.filter(x => x !== town.value))
        }
    }

    const addEventOrSpecial = (type) => {
        let whatType = document.getElementById(type)
        if (whatType.checked) {
            setEventsOrSpecials(eventsOrSpecials => [...eventsOrSpecials, whatType.value])
        } else if (!whatType.checked && eventsOrSpecials.includes(whatType.value)) {
            setEventsOrSpecials(eventsOrSpecials.filter(x => x !== whatType.value))
        }
    }

    let date = new Date();
    let currDate = date.getDate();
    let currYear = date.getFullYear();
    let currMonth = date.getMonth();

    
    let [today, setToday] = useState(currDate)
    let [currentMonth, setCurrentMonth] = useState(currMonth + 1);
    let [currentYear, setCurrentYear] = useState(currYear);
    
    useEffect(() => {
        getSpecials();
    }, [today ,towns, eventsOrSpecials])




    // getting specials/events
    const config = {
        params: {
            towns: towns,
            eventsOrSpecials: eventsOrSpecials
        }
    };

    const getSpecials = () => {
        axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/get_specials/${currentYear}-${formatDateMonth(currentMonth)}-${formatDateDate(today)}/${formatDateDay(currentYear, currentMonth, today)}`, config)
        .then((response) => {
            console.log(response.data)
            setSpecials(response.data)
        }, (error) => {
            console.log(error)
        })
    }

    const inputDate = (id) => {
        let input = document.getElementById(id)
        console.log(input.value)
        let inputSplit = input.value.split("-")
        console.log(inputSplit)
        setCurrentYear(inputSplit[0])
        setCurrentMonth(inputSplit[1])
        setToday(inputSplit[2])
    }

    return (
        <div className="container w-full">
            <div className="flex flex-row w-full bg-[#dfebf2] pt-4 h-[2500px]">
                
                {/* calendar section */}
                <div className="flex flex-col w-1/4"></div>
                <div className="fixed flex flex-col w-1/4">
                    
                    
                    <div className="flex flex-col w-full pl-8">
                        <p className="text-2xl font-semibold">View by:</p>
                        <p className="font-semibold border-y mt-2">Special or Event</p>
                        <div className="flex flex-row pt-2">
                            <input type="checkbox" name="special" id="special" className="mr-2" value="special" onClick={() => addEventOrSpecial("special")}/>
                            <label htmlFor="">Specials</label>
                        </div>
                        <div className="flex flex-row">
                            <input type="checkbox" name="event" id="event" className="mr-2" value="event" onClick={() => addEventOrSpecial("event")}/>
                            <label htmlFor="">Events</label>
                        </div>
                        <p className="font-semibold border-y mt-2 mb-2 ">Town</p>
                        {TOWNS.map((town) => (
                            <div className="flex flex-row">
                                <input type="checkbox" name={town} id={town} className="mr-2" value={town} onClick={() => addTown(town)}/>
                                <label htmlFor="">{town}</label>
                            </div>
                        ))}
                    </div>


                </div>
                <div className="flex flex-col w-3/4">
                    <p className="text-center text-4xl">{months[currentMonth - 1]} {today}, {currentYear} Specials & Events</p>
                    <input className="w-1/4 place-self-center my-2 py-1" type="date" name="date" id="date" onChange={() => inputDate("date")} defaultValue={`${currentYear}-${formatDateMonth(currentMonth)}-${formatDateDate(today)}`}/>
                    {specials.map(special => (
                        special.SpecialEvents.map((x, i) => (
                        <div className="flex flex-col w-full py-2" key={x.id}>
                            <div className="flex flex-col pl-10">
                                <div>
                                    {i === 0 ? <p className="text-3xl">{special.restaurantName}</p> : ""}
                                </div>
                                <div className="pl-3">
                                    {x.specialOrEvent === "special" ? <p className="text-lg font-medium underline">Special:</p> : <p className="text-lg font-medium underline">Event:</p>}
                                </div>
                                <div className="flex flex-row pl-3">
                                    {x.name} - {x.description}
                                </div>
                                <div className="pl-3">
                                    <p>Available from {x.startTime} - {x.endTime}</p>
                                </div>
                            </div>
                        </div>
                    ))))}
                </div>
            </div>
        </div>
    );
}
 
export default SpecialsEvents;