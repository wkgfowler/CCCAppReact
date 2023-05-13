import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { classNames, formatDateDate, formatDateDay, formatDateMonth, formatLastMonth, formatMonth, formatNextMonth, formatSpecialEventDays, months } from '../lib/utils';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"

const SpecialsEvents = () => {
    let [specials, setSpecials] = useState([]);
    const navigate = useNavigate();
    

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
    }, [today])

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

    // changing dates and getting events
    // const changeDate = (day) => {
    //     setToday(day);
    //     getSpecials();
    // }


    // getting specials/events
    const config = {
        headers: {"token": localStorage.getItem("token")},
        params: {
            currentYear: currentYear,
            currentMonth: formatDateMonth(currentMonth),
            today: formatDateDate(today),
            day: formatDateDay(currentYear, currentMonth, today)
        }
    };

    const getSpecials = () => {
        axios.get(`http://localhost:3000/api/get_specials/${currentYear}-${formatDateMonth(currentMonth)}-${formatDateDate(today)}/${formatDateDay(currentYear, currentMonth, today)}`, config)
        .then((response) => {
            console.log(response.data)
            setSpecials(response.data)
        }, (error) => {
            console.log(error)
        })
    }

    return (
        <div className="flex flex-wrap justify-center justify-items-center items-center min-h-screen">
            <p className="text-center text-4xl">{months[currentMonth]} {today}, {currentYear} Specials & Events</p>
            <div className="flex flex-wrap w-screen justify-center">
                {specials.map(special => (
                        <div className="flex flex-col w-full" key={special.id}>
                            
                                <div className="flex flex-row justify-evenly">
                                    <div>
                                        <p>{special.restaurant.restaurant_name}</p>
                                    </div>
                                    <div>
                                        {special.specialOrEvent === "special" ? <p>Special - {special.name}</p> : <p>Event - {special.name}</p>}
                                    </div>
                                    
                                </div>
                        
                                <div className="flex flex-row justify-evenly">
                                    <div>
                                        <p>{special.description}</p>
                                    </div>
                                    <div>
                                        <p>From {special.startTime} - {special.endTime}</p>
                                    </div>
                                </div>
                        </div>
                ))}
            </div>

            <div className="w-1/3 bg-slate-200 rounded-xl">
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
                            <li className="w-[calc(100%/7)] text-slate-400 relative mt-7 cursor-pointer before:absolute before:h-10 before:w-10 before:rounded-full 
                            before:translate-x-1/2 before:translate-y-1/2 before:-z-10 z-10 before:bottom-3 before:right-7 hover:before:bg-slate-400">{day}</li>
                        ))}
                        {days.map(day => (
                            <li onClick={() => setToday(day)} className={classNames(isToday(day) ? "bg-slate-400 rounded-full" : "", "w-[calc(100%/7)] relative mt-7 cursor-pointer before:absolute before:h-10 before:w-10 before:rounded-full before:translate-x-1/2 before:translate-y-1/2 before:-z-10 z-10 before:bottom-3 before:right-7 hover:before:bg-slate-400")}>{day}</li>
                        ))}
                        {nextMonthDays.map(day => (
                            <li className="w-[calc(100%/7)] text-slate-400 relative mt-7 cursor-pointer before:absolute before:h-10 before:w-10 before:rounded-full before:translate-x-1/2 before:translate-y-1/2 before:-z-10 z-10 before:bottom-3 before:right-7 hover:before:bg-slate-400">{day}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
 
export default SpecialsEvents;