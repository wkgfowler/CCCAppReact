import { FaChevronDown, FaChevronLeft } from "react-icons/fa";
import { TOWNS, classNames, formatDateDate, formatDateDay, formatDateMonth, formatLastMonth, formatMonth, formatNextMonth, formatSpecialEventDays, months } from '../lib/utils';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { specialEventCalls } from "../api/specialEvent";

const SpecialsEvents = () => {
    let [specials, setSpecials] = useState([]);
    const [eventsOrSpecials, setEventsOrSpecials] = useState([]);
    const [towns, setTowns] = useState([]);
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
        specialEventCalls.getAllSpecialsEvents(currentYear, currentMonth, today, towns, eventsOrSpecials)
        .then((response) => {
            setSpecials(response.data)
        })
        console.log(currentYear)
        console.log(currentMonth)
        console.log(today)
        console.log(formatDateDay(currentYear, currentMonth, today))
    }, [today ,towns, eventsOrSpecials])


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
        <div className="flex justify-center">
            <div className="w-[90%]">
                <div className="flex md:flex-row flex-col w-full bg-[#dfebf2] pt-4 h-screen">

                    <div className="md:fixed flex md:flex-col md:w-1/4 flex-row w-full">


                        <div className="flex flex-col w-full pl-8">
                            <div className="flex flex-row w-full gap-12 justify-center md:justify-start">
                                <p className="md:text-2xl text-lg font-semibold text-nowrap md:border-0 border-b-2 border-black">View by:</p>
                                <button onClick={toggleFilterDisplay} className="md:hidden">{filterDisplay ? <FaChevronDown /> : <FaChevronLeft />}</button>
                            </div>
                            <div className={`md:inline ${filterDisplay ? "" : "hidden"}`}>
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


                    </div>
                    <div className="flex flex-col md:w-3/4 md:ml-[25%] w-full md:pt-0 pt-3">
                        <p className="text-center md:text-4xl text-2xl md:px-0 px-4">{months[currentMonth - 1]} {today}, {currentYear} Specials & Events</p>
                        <input className="md:w-1/4 w-1/2 place-self-center my-2 py-1" type="date" name="date" id="date" onChange={() => inputDate("date")} defaultValue={`${currentYear}-${formatDateMonth(currentMonth)}-${formatDateDate(today)}`}/>
                        {specials.map(special => (
                            special.SpecialEvents.map((x, i) => (
                            <div className="flex flex-col w-full py-2" key={x.id}>
                                <div className="flex flex-col pl-10">
                                    <div>
                                        {i === 0 ? <p className="md:text-3xl text-xl">{special.restaurantName}</p> : ""}
                                    </div>
                                    <div className="pl-3">
                                        {x.specialOrEvent === "special" ? <p className="text-base md:text-lg font-medium underline">Special:</p> : <p className="text-base md:text-lg font-medium underline">Event:</p>}
                                    </div>
                                    <div className="flex flex-row pl-3 md:text-base text-sm">
                                        {x.name} - {x.description}
                                    </div>
                                    <div className="pl-3 md:text-base text-sm">
                                        <p>Available from {x.startTime} - {x.endTime}</p>
                                    </div>
                                </div>
                            </div>
                        ))))}
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default SpecialsEvents;