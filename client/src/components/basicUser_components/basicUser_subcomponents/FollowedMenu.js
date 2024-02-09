import { useEffect, useState } from "react";
import MenuFullScreen from "../../profile_components/restaurant_components/restaurant_subcomponents/MenuFullScreen";
import { WEEKDAYS, convertToNormalHours, determineIsRecurring, formatDateDisplay, formatMenuDayAvailability, formatSpecialEventDays } from "../../../lib/utils";

const FollowedMenu = ({restaurant}) => {

    const [allMenus, setAllMenus] = useState(restaurant.Menus)
    const [menus, setMenus] = useState([]);
    const [allMenuTypes, setAllMenuTypes] = useState([]);
    const [currentMenuType, setCurrentMenuType] = useState("")

    const [allSpecialsEvents, setAllSpecialsEvents] = useState(restaurant.SpecialEvents);
    const [specialsEvents, setSpecialsEvents] = useState([]);
    const [specialEventTypes, setSpecialEventTypes] = useState([]);
    const [currentSpecialEventType, setCurrentSpecialEventType] = useState("");


    useEffect(() => {
        const allMenus = restaurant.Menus
        const menuTypes = []
        allMenus.forEach(menu => menuTypes.push(menu.menuType))
        const menuTypesNoRepeats = [...new Set(menuTypes)]
        setAllMenuTypes(menuTypesNoRepeats)
        const allSpecialsEvents = restaurant.SpecialEvents
        const typeOfSpecialsEvents = []
        for (let i = 0; i < allSpecialsEvents.length; i++) {
            if (allSpecialsEvents[i].recurring) {
                typeOfSpecialsEvents.push("Recurring Specials")
            } else {
                typeOfSpecialsEvents.push("Upcoming Specials")
            }
        }
        const allSpecialsEventsNoRepeats = [...new Set(typeOfSpecialsEvents)]
        setSpecialEventTypes(allSpecialsEventsNoRepeats)
    }, [])

    const filterMenus = (x) => {
        const filteredMenus = allMenus.filter(menu => menu.menuType === x)
        setMenus(filteredMenus)
        setSpecialsEvents([])
        setCurrentSpecialEventType("")
    }

    const filterSpecialsEvents = (y) => {
        const filteredSpecialsEvents = allSpecialsEvents.filter(specialEvent => specialEvent.recurring === determineIsRecurring(y))
        setSpecialsEvents(filteredSpecialsEvents)
        setMenus([])
        setCurrentMenuType("")
    }


    return (
        <div>
            <div className="flex flex-row gap-3 border-b">
                {allMenuTypes.map(menuType => (
                    <div>
                        <p className={`border-x border-t p-1 cursor-pointer border-slate-900 ${currentMenuType === menuType ? "font-bold" : ""} `}
                            onClick={() => {setCurrentMenuType(menuType); filterMenus(menuType)}}>{menuType}</p>
                    </div>
                ))}
                {specialEventTypes.map(type => (
                    <div>
                        <p className={`border-x border-t p-1 cursor-pointer border-slate-900 ${currentSpecialEventType === type ? "font-bold" : ""} `}
                            onClick={() => {setCurrentSpecialEventType(type); filterSpecialsEvents(type)}}>{type}</p>
                    </div>
                ))}
            </div>

            <div className="flex flex-col">
                <div className={"flex flex-col pl-2"}>
                    {menus && menus.map((x, i) => {
                        return (
                            <div>
                                <p className="text-center text-2xl pt-4">{i === 0 ? `Available ${x.everyday ? "everyday" : formatMenuDayAvailability(WEEKDAYS.map(day => x[day.toLowerCase()] ? day : null))} from ${x.startTime} - ${x.endTime}` : ""}</p>
                                <MenuFullScreen menu={x}/>
                            </div>
                        )
                    })}
                    {specialsEvents && specialsEvents.map((specialEvent) => {
                        return (
                            <div className="pt-2">
                                <div>
                                    {specialEvent.specialOrEvent === "special" ? <p className="text-xl font-medium underline">Special</p> : <p className="text-xl font-medium underline">Event</p>}
                                </div>
                                <div className="flex flex-row pl-2">
                                    <p>{specialEvent.name} - {specialEvent.description}</p>
                                </div>
                                <div className="flex flex-row pl-2">
                                    {specialEvent.specialOrEvent === "special" ? <p>Available&nbsp;</p> : <p>Happening&nbsp;</p>}
                                    {specialEvent.specialEventDate ? <p>{formatDateDisplay(specialEvent.specialEventDate)}</p> : <p>every {formatSpecialEventDays(specialEvent.weekdays.sort())}</p>}
                                    <p>&nbsp;from {convertToNormalHours(specialEvent.startTime)} - {convertToNormalHours(specialEvent.endTime)}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>
            
        </div>
    );
}
 
export default FollowedMenu;