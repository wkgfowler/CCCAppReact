import { useEffect, useState } from "react";
import { WEEKDAYS, months } from "../../../lib/utils";

const TodaysSpecials = ({restaurants}) => {

    const [allSpecialsEvents, setAllSpecialsEvents] = useState([])

    let date = new Date();
    let currDay = date.getDay();

    let [weekday, setWeekday] = useState(currDay)

    useEffect(() => {
        console.log(restaurants)
        let allSpecialsEventsList = [];
        restaurants.forEach(restaurant => {
            if (restaurant.SpecialEvents) {
                restaurant.SpecialEvents.forEach(x => {
                    allSpecialsEventsList.push(x)
                })
            } else {
                allSpecialsEventsList.push("hehehe")
            }
        });
        console.log(allSpecialsEventsList)
        setAllSpecialsEvents(allSpecialsEventsList)
    }, [])

    return (
        <div className="flex justify-center">
            <p className="text-center md:text-4xl text-2xl md:px-0 px-4">{WEEKDAYS[weekday]} Specials & Events</p>
            <p>{restaurants.length}</p>
        </div>
    );
}
 
export default TodaysSpecials;