import { useRef, useState } from "react";
import { ENDHOURS, STARTHOURS, WEEKDAYSVALUES, capitalizeFirstLetter, convertToNormalHours, formatDateDisplay, formatEndHoursValue, formatRecurringOrNot, formatSpecialEventDays, formatStartHoursValue } from "../../../../lib/utils";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import DeleteRestaurantSpecialModal from "./DeleteRestaurantSpecialModal";

const EditSpecialsForm = ({specialEvent, getAllSpecialsEvents}) => {

    const [editting, setEditting] = useState(false);

    const [dateVisibility, setDateVisibility] = useState(!specialEvent.recurring);
    const [recurringVisibility, setRecurringVisibility] = useState(specialEvent.recurring)
    const [specialEventDate, setSpecialEventDate] = useState(""); 
    const [charCount, setCharCount] = useState(0);
    const [actualWeekdays, setActualWeekdays] = useState(specialEvent.weekdays);

    const [sundayChecked, setSundayChecked] = useState(actualWeekdays.includes(0))

    const specialOrEventRef = useRef();
    const specialEventNameRef = useRef();
    const specialEventDescriptionRef = useRef();
    const startTimeRef = useRef();
    const endTimeRef = useRef();
    const recurringRef = useRef();

    const isDaily = () => {
        const option = document.getElementById("editRecurring");
        if (option.value === "true") {
            setRecurringVisibility(true)
            setDateVisibility(false)
            console.log(actualWeekdays)
        } else if (option.value === "false") {
            setDateVisibility(true)
            setRecurringVisibility(false)
            console.log(actualWeekdays)
        } else if (option.value === "") {
            setDateVisibility(false)
            setRecurringVisibility(false)
        }
    };

    const addWeekdays = (day) => {
        let weekday = document.getElementById(day)
        if (weekday.checked) {
            setActualWeekdays(actualWeekdays => [...actualWeekdays, weekday.value])
            console.log(actualWeekdays)
        } else if (!weekday.checked && actualWeekdays.includes(weekday.value)) {
            setActualWeekdays(actualWeekdays.filter(dayOfWeek => dayOfWeek !== weekday.value))
            console.log(actualWeekdays)
        }
    }

    const onSubmitForm = async (e) => {
        e.preventDefault();
        axios.post(`http://localhost:3000/api/update_special_event/${specialEvent.id}`, {
            specialOrEvent: specialOrEventRef.current.value,
            name: specialEventNameRef.current.value,
            description: specialEventDescriptionRef.current.value,
            recurring: recurringRef.current.value,
            weekdays: actualWeekdays,
            specialEventDate: specialEventDate,
            startTime: startTimeRef.current.value,
            endTime: endTimeRef.current.value
        }, {
            headers: {
                "token" : localStorage.getItem("token")
            }
        })
        .then((response) => {
            console.log(response)
            setEditting(!editting)
            getAllSpecialsEvents();
        }, (error) => {
            console.log("not quite")
            console.log(error)
        })
    }

    return (
        <div className="">
            {editting ? 
                <form onSubmit={onSubmitForm}>
                    <div className="flex flex-col px-10 pt-2 border-2 border-black">
                        <p className="text-2xl font-medium">{specialEvent.name}</p>
                        {specialEvent.specialOrEvent === "special" ? 
                            <div className="grid grid-cols-2 pb-2">
                                <p className="text-xl text-left">Special or an event?</p>
                                <select name="specialEvent" id="specialEvent" className="w-5/12 ml-4"  ref={specialOrEventRef}>
                                    <option value="special">Special</option>
                                    <option value="event">Event</option>
                                </select>
                            </div>
                            :
                            <div className="grid grid-cols-2 pb-2">
                                <p className="text-xl text-left">Special or an event?</p>
                                <select name="specialEvent" id="specialEvent" className="w-5/12 ml-4"  ref={specialOrEventRef}>
                                    <option value="event">Event</option>
                                    <option value="special">Special</option>
                                </select>
                            </div>}
                        
                        {specialEvent.recurring ? 
                        <div className="grid grid-cols-2">
                            <p className="text-xl text-left">Reccuring every week or only once?</p>
                            <select name="editRecurring" id="editRecurring" className="w-5/12 ml-4" ref={recurringRef} onChange={isDaily}>
                                <option value="true">Reccuring every week</option>
                                <option value="false">Only once</option>

                            </select>
                        </div> 
                        : 
                        <div className="grid grid-cols-2">
                            <p className="text-xl text-left">Reccuring every week or only once?</p>
                            <select name="editRecurring" id="editRecurring" className="w-5/12 ml-4" ref={recurringRef} onChange={isDaily}>
                                <option value="false">Only once</option>
                                <option value="true">Reccuring every week</option>
                            </select>
                        </div>}

                        <div id="recurringSpecial" className={`grid grid-cols-4 ${recurringVisibility ? "" : "hidden"}`}>
                            {WEEKDAYSVALUES.map(weekday => (
                                <div>
                                    {actualWeekdays.includes(weekday.value) ? 
                                        <input type="checkbox" name={weekday.day} id={weekday.day} value={weekday.value} onChange={() => addWeekdays(weekday.day)} defaultChecked/> 
                                        : 
                                        <input type="checkbox" name={weekday.day} id={weekday.day} value={weekday.value} onChange={() => addWeekdays(weekday.day)}/>}
                                    <label>{capitalizeFirstLetter(weekday.day)}</label>
                                </div>
                            ))}
                        </div>

                        <div id="dateSpecial" className={`grid grid-cols-1 ${dateVisibility ? "" : "hidden"}`}>
                            <div>
                                <label for="specialEventDate" className="text-xl pr-2">When:</label>
                                <input type="date" id="specialEventDate" name="specialEventDate" defaultValue={specialEvent.specialEventDate} onChange={(e) => setSpecialEventDate(e.target.value)}></input>
                            </div>
                        </div>


                        <div className="grid grid-cols-1 pt-3">
                            <div className="grid grid-rows-2 gap-1">
                                <label for="specialEventName">Special or Event Name:</label>
                                <input type="text" name="specialEventName" id="specialEventName" defaultValue={specialEvent.name} ref={specialEventNameRef}/>
                            </div>
                            <div className="grid grid-rows-3 pt-3">
                                <label for="specialEventDescription">Special or Event Description:</label>
                                <textarea className="-translate-y-11" type="text" name="specialEventDescription" id="specialEventDescription" 
                                    onChange={(e) => setCharCount(e.target.value.length)} rows="3" cols="75" ref={specialEventDescriptionRef}
                                    defaultValue={specialEvent.description}>
                                </textarea>
                                <p className="-translate-y-10">{specialEvent.description ? specialEvent.description.length  : charCount} / 400 character limit</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 -translate-y-16">
                            <div>
                                <label htmlFor="">Special/Event starting time:</label>
                                <select name="startTime" className="ml-2" id="startTime" ref={startTimeRef}>
                                    <option value={specialEvent.startTime}>{convertToNormalHours(specialEvent.startTime)}</option>
                                    {STARTHOURS.map(x => {
                                        return ( 
                                            <option value={x.value}>{x.display}</option>
                                        )}
                                    )}
                                </select>
                            </div>
                            <div className="pl-4">
                                <label htmlFor="">Special/Event ending time:</label>
                                <select name="endTime" className="ml-2" id="endTime" ref={endTimeRef}>
                                <option value={specialEvent.endTime}>{convertToNormalHours(specialEvent.endTime)}</option>
                                    {ENDHOURS.map(x => {
                                        return ( 
                                            <option value={x.value}>{x.display}</option>
                                        )}
                                    )}
                                </select>
                            </div>
                        </div>

                        <button className="text-white bg-[#56707E] rounded px-2 py-1">Submit</button>
                    </div> 
                </form>
                
                : 
                
                <div key={specialEvent.id} className="flex flex-row w-full py-3">
                    <div className="flex flex-col pl-10">
                        <div>
                            <p className="font-bold">{specialEvent.name}</p>
                        </div>
                        <div className="flex flex-row">
                            <p>{specialEvent.description}</p>
                        </div>
                        <div className="flex flex-row">
                            {specialEvent.specialOrEvent === "special" ? <p>Available &nbsp;</p> : <p>Happening &nbsp;</p>}
                            {specialEvent.specialEventDate ? <p>{formatDateDisplay(specialEvent.specialEventDate)}</p> : <p>every {formatSpecialEventDays(specialEvent.weekdays.sort())}</p>}
                            <p>&nbsp; from {convertToNormalHours(specialEvent.startTime)} - {convertToNormalHours(specialEvent.endTime)}</p>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <button className="text-white bg-green-900 rounded px-2 py-1" onClick={() => setEditting(!editting)}>Edit</button>
                    </div>
                    <div className="flex flex-col">
                        <DeleteRestaurantSpecialModal specialEvent={specialEvent} getAllSpecialsEvents={getAllSpecialsEvents}/>
                    </div>
                </div>
            }
        </div>
    )
}
 
export default EditSpecialsForm;