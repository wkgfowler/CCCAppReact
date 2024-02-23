import { useContext, useEffect, useRef, useState } from "react";
import { ENDHOURS, STARTHOURS, WEEKDAYSVALUES, capitalizeFirstLetter } from "../../../../lib/utils";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../../../context/UserContext";

const SpecialsForm = ({getAllSpecialsEvents}) => {
    const {user, setUser} = useContext(UserContext)
    const navigate = useNavigate()
    const {RestaurantId} = useParams();
    const [dateVisibility, setDateVisibility] = useState(false);
    const [recurringVisibility, setRecurringVisibility] = useState(false)
    const [specialEventDate, setSpecialEventDate] = useState(""); 
    const [charCount, setCharCount] = useState(0);
    const [actualWeekdays, setActualWeekdays] = useState([]);

    const specialOrEventRef = useRef();
    const specialEventNameRef = useRef();
    const specialEventDescriptionRef = useRef();
    const startTimeRef = useRef();
    const endTimeRef = useRef();
    const recurringRef = useRef();

    const isDaily = () => {
        const option = document.getElementById("isRecurring");
        if (option.value === "true") {
            setRecurringVisibility(true)
            setDateVisibility(false)
        } else if (option.value === "false") {
            setDateVisibility(true)
            setRecurringVisibility(false)
        } else if (option.value === "") {
            setDateVisibility(false)
            setRecurringVisibility(false)
        }
    };

    const addWeekdays = (day) => {
        let weekday = document.getElementById(day)
        console.log(weekday)
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
        axios.post('http://localhost:3000/api/add_special_event', {
            RestaurantId: RestaurantId,
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
            navigate(0)
        }, (error) => {
            console.log("not quite")
            console.log(error)
        })
    }

    return (
        <div className="flex justify-center">
            <form onSubmit={onSubmitForm}>
                <p className="text-2xl pt-2 pb-4 text-center font-semibold">Add a special/event</p>
                <div className="grid grid-cols-2 pb-2">
                    <p className="text-xl text-left">Are you adding a special or an event?</p>
                    <select name="specialEvent" id="specialEvent" className="w-5/12 ml-4" ref={specialOrEventRef}>
                        <option value="">--Select an option--</option>
                        <option value="special">Special</option>
                        <option value="event">Event</option>
                    </select>
                </div>
                <div className="grid grid-cols-2">
                    <p className="text-xl text-left">Is this reccuring every week or only once?</p>
                    <select name="isRecurring" id="isRecurring" className="w-5/12 ml-4" ref={recurringRef} onChange={isDaily}>
                        <option value="">--Select an option--</option>
                        <option value="false">Only once</option>
                        <option value="true">Reccuring every week</option>
                    </select>
                </div>

                <div id="recurringSpecial" className={`grid grid-cols-4 ${recurringVisibility ? "" : "hidden"}`}>
                    {WEEKDAYSVALUES.map(weekday => (
                            <div>
                                <input type="checkbox" name={weekday.day} id={weekday.day} value={weekday.value} onClick={() => addWeekdays(weekday.day)}/>
                                <label>{capitalizeFirstLetter(weekday.day)}</label>
                            </div>
                        ))}
                </div>

                <div id="dateSpecial" className={`grid grid-cols-1 ${dateVisibility ? "" : "hidden"}`}>
                    <div>
                        <label for="specialEventDate" className="text-xl pr-2">When:</label>
                        <input type="date" id="specialEventDate" name="specialEventDate" onChange={(e) => setSpecialEventDate(e.target.value)}></input>
                    </div>
                </div>

                <div className="grid grid-cols-1 pt-3">
                    <div className="grid grid-rows-2 gap-1">
                        <label for="specialEventName">Special or Event Name:</label>
                        <input type="text" name="specialEventName" id="specialEventName" ref={specialEventNameRef}/>
                    </div>
                    <div className="grid grid-rows-3 pt-3">
                        <label for="specialEventDescription">Special or Event Description:</label>
                        <textarea className="-translate-y-11" type="text" name="specialEventDescription" id="specialEventDescription" onChange={(e) => setCharCount(e.target.value.length)} rows="3" cols="75" ref={specialEventDescriptionRef}></textarea>
                        <p className="-translate-y-10">{charCount} / 400 character limit</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 -translate-y-16">
                    <div>
                        <label htmlFor="">Special/Event starting time:</label>
                        <select name="startTime" className="ml-2" id="startTime" ref={startTimeRef}>
                            <option value="">--Select a starting time--</option>
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
                        <option value="">--Select an ending time--</option>
                            {ENDHOURS.map(x => {
                                return ( 
                                    <option value={x.value}>{x.display}</option>
                                )}
                            )}
                        </select>
                    </div>
                </div>
                <div className="flex justify-center -translate-y-10">
                        <button className="text-white bg-[#56707E] rounded px-2 py-1">Submit</button>
                </div>
            </form>
        </div>
    );
}
 
export default SpecialsForm;