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
    let firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();
    let lastDayOfMonth = new Date(currYear, currMonth + 1, 0).getDate();
    let lastDayOfLastMonth = new Date(currYear, currMonth, 0).getDate();
    let firstDayOfNextMonth = new Date(currYear, currMonth, lastDayOfMonth).getDay();
    const isToday = (num) => {
        if (num === today && currMonth === new Date().getMonth() && currYear === new Date().getFullYear()) {
            return true
        } else {
            return false
        }
    }
    
    let [days, setDays] = useState([]);
    let [prevMonthDays, setPrevMonthDays] = useState([]);
    let [nextMonthDays, setNextMonthDays] = useState([]);
    let [today, setToday] = useState(currDate)
    let [currentMonth, setCurrentMonth] = useState(currMonth);
    let [currentYear, setCurrentYear] = useState(currYear);
    const settingNextMonth = (month, year) => {
        month += 1
        if(month > 11) {
            month = 0
            setCurrentYear(currentYear + 1)
        }
        return month
    }

    const settingPrevMonth = (month, year) => {
        month -= 1
        if (month < 0) {
            month = 11
            setCurrentYear(currentYear - 1)
        }
        return month
    }
    
    let determineFirstDayOfNextMonth = new Date(currentYear, currentMonth + 1, 1).getDay();
    let determineLastDayOfNextMonth = new Date(currentYear, currentMonth + 2, 0).getDate();
    let determineLastDayOfLastMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    let showFirstDayOfNextMonth = new Date(currentYear, currentMonth + 1, determineLastDayOfNextMonth).getDay();

    let determineFirstDayOfPrevMonth = new Date(currentYear, currentMonth - 1, 1).getDay();
    let determineLastDayOfPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
    let determineLastDayOfPrevLastMonth = new Date(currentYear, currentMonth - 1, 0).getDate();
    let showFirstDayOfLastMonth = new Date(currentYear, currentMonth - 1, determineLastDayOfPrevMonth).getDay();
    
    useEffect(() => {
        getSpecials();
        setDays(formatMonth(lastDayOfMonth))
        setPrevMonthDays(formatLastMonth(firstDayOfMonth, lastDayOfLastMonth))
        setNextMonthDays(formatNextMonth(firstDayOfNextMonth))
    }, [today ,towns, eventsOrSpecials])

    const nextMonth = () => {
        setCurrentMonth(settingNextMonth(currentMonth)) 
        setDays(formatMonth(determineLastDayOfNextMonth))
        setPrevMonthDays(formatLastMonth(determineFirstDayOfNextMonth, determineLastDayOfLastMonth))
        setNextMonthDays(formatNextMonth(showFirstDayOfNextMonth))
    }

    const prevMonth = () => {
        setCurrentMonth(settingPrevMonth(currentMonth))
        setDays(formatMonth(determineLastDayOfPrevMonth))
        setPrevMonthDays(formatLastMonth(determineFirstDayOfPrevMonth, determineLastDayOfPrevLastMonth))
        setNextMonthDays(formatNextMonth(showFirstDayOfLastMonth))
    }


    // getting specials/events
    const config = {
        params: {
            // currentYear: currentYear,
            // currentMonth: formatDateMonth(currentMonth),
            // today: formatDateDate(today),
            // day: formatDateDay(currentYear, currentMonth, today),
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

    return (
        <div className="container w-full">
            <div className="flex flex-row w-full bg-[#dfebf2] pt-4 h-[2500px]">
                
                {/* calendar section */}
                <div className="flex flex-col w-1/4"></div>
                <div className="fixed flex flex-col w-1/4">
                    <div className="w-full">
                        <header className="flex items-center justify-between pt-6 px-8 pb-3">
                            <p className="text-2xl font-medium">{months[currentMonth]} {currentYear}</p>
                            <div className="grid grid-cols-2">
                                <span className="hover:bg-slate-400 rounded-full" onClick={prevMonth}><IoIosArrowBack className="h-8 w-8 my-0 mx-1 text-center leading-8 cursor-pointer"/></span>
                                <span className="hover:bg-slate-400 rounded-full" onClick={nextMonth}><IoIosArrowForward className="h-8 w-8 my-0 mx-1 text-center leading-8 cursor-pointer"/></span>
                            </div>
                        </header>

                        <div className="p-5">
                            <ul className="flex flex-wrap text-center font-medium">
                                <li className="w-[calc(100%/7)] relative">Sun</li>
                                <li className="w-[calc(100%/7)] relative">Mon</li>
                                <li className="w-[calc(100%/7)] relative">Tue</li>
                                <li className="w-[calc(100%/7)] relative">Wed</li>
                                <li className="w-[calc(100%/7)] relative">Thu</li>
                                <li className="w-[calc(100%/7)] relative">Fri</li>
                                <li className="w-[calc(100%/7)] relative">Sat</li>
                            </ul>
                            <ul className="flex flex-wrap text-center mb-4">
                                {prevMonthDays.map(day => (
                                    <li className="w-[calc(100%/7)] text-slate-400 relative mt-7 cursor-pointer before:absolute before:h-6 before:w-8 before:rounded-full 
                                    before:translate-x-1/2 before:translate-y-1/2 before:-z-10 z-10 before:bottom-3 before:right-4 hover:before:bg-slate-400">{day}</li>
                                ))}
                                {days.map(day => (
                                    <li onClick={() => setToday(day)} className={classNames(isToday(day) ? "bg-slate-400 rounded-full" : "", "w-[calc(100%/7)] relative mt-7 cursor-pointer before:absolute before:h-6 before:w-10 before:rounded-full before:translate-x-1/2 before:translate-y-1/2 before:-z-10 z-10 before:bottom-3 before:right-6 hover:before:bg-slate-400")}>{day}</li>
                                ))}
                                {nextMonthDays.map(day => (
                                    <li className="w-[calc(100%/7)] text-slate-400 relative mt-7 cursor-pointer before:absolute before:h-6 before:w-8 before:rounded-full before:translate-x-1/2 before:translate-y-1/2 before:-z-10 z-10 before:bottom-3 before:right-4 hover:before:bg-slate-400">{day}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    
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
                    <p className="text-center text-4xl">{months[currentMonth]} {today}, {currentYear} Specials & Events</p>
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