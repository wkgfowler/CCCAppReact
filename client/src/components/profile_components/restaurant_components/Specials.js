import { Link, useParams } from "react-router-dom";
import SpecialsForm from "./restaurant_subcomponents/SpecialsForm";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/UserContext";
import { convertToNormalHours, formatDateDisplay, formatSpecialEventDays } from "../../../lib/utils";
import EditSpecialsForm from "./restaurant_subcomponents/EditSpecialsForm";

const Specials = () => {
    const {RestaurantId} = useParams();
    const {user, setUser} = useContext(UserContext);
    const userId = user.id

    const [allSpecialsEventsVisible, setAllSpecialsEventsVisible] = useState(false);
    const [recurringSpecialsEventsVisible, setRecurringSpecialsEventsVisible] = useState(false);
    const [specialsFormVisible, setSpecialsFormVisible] = useState(false);
    const [allSpecialsEvents, setAllSpecialsEvents] = useState([]);
    const [recurringSpecialsEvents, setRecurringSpecialsEvents] = useState([]);
    const [specialOrEvent, setSpecialOrEvent] = useState([]);
    
    const toggleAllSpecialsEventsVisible = () => {
        setAllSpecialsEventsVisible(!allSpecialsEventsVisible)
        setRecurringSpecialsEventsVisible(false)
        setSpecialsFormVisible(false)
    };

    const toggleRecurringSpecialsEventsVisible = () => {
        setRecurringSpecialsEventsVisible(!recurringSpecialsEventsVisible)
        setAllSpecialsEventsVisible(false)
        setSpecialsFormVisible(false)
    };

    const toggleSpecialsFormVisible = () => {
        setSpecialsFormVisible(!specialsFormVisible)
        setAllSpecialsEventsVisible(false)
        setRecurringSpecialsEventsVisible(false)
    }

    const addType = (typeName) => {
        let type = document.getElementById(typeName)
        if (type.checked) {
            setSpecialOrEvent(specialOrEvent => [...specialOrEvent, type.value])
        } else if (!type.checked && specialOrEvent.includes(type.value)) {
            setSpecialOrEvent(specialOrEvent.filter(x => x !== type.value))
        }
    }

    const config = {
        headers: {"token": localStorage.getItem("token")},
        params: {
            RestaurantId: RestaurantId,
            userId: user.id,
            specialOrEvent: specialOrEvent
        }
    };

    const getAllSpecialsEvents = () => {
        axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/get_all_specials_events/${RestaurantId}/${userId}/${specialOrEvent}`, config)
        .then((response) => {
            // console.log(response.data)
            setAllSpecialsEvents(response.data.allSpecialsEvents)
            setRecurringSpecialsEvents(response.data.recurringSpecialsEvents)
        }, (error) => {
            console.log(error)
        })
    };

    useEffect(() => {
        getAllSpecialsEvents();
    }, [])

    return (
        <div className="container bg-[#dfebf2] pb-3">
            <div className="flex flex-row justify-center pt-3">
                <p className="text-3xl">Specials & Events</p>
            </div>

            <div className="flex flex-row justify-center gap-6 pt-3">
                <p className="text-xl">Filter by:</p>
                <div>
                    <input type="checkbox" name="special" id="special" value="special" />
                    <label for="special" className="text-xl">Specials</label>
                </div>
                <div>
                    <input type="checkbox" name="event" id="event" value="event"/>
                    <label for="event" className="text-xl">Events</label>
                </div>
                <div>
                    <input type="checkbox" name="nonrecurring" id="nonrecurring" value="false"/>
                    <label for="nonrecurring" className="text-xl">Nonrecurring</label>
                </div>
                <div>
                    <input type="checkbox" name="recurring" id="recurring" value="true"/>
                    <label for="recurring" className="text-xl">Recurring</label>
                </div>
            </div>

            <div className="flex flex-row pt-4">

                <div className="flex flex-col w-2/12 pr-16">
                    <p className={`text-lg cursor-pointer ${specialsFormVisible ? "font-bold border-y border-l pl-2 border-slate-900" : ""}`} onClick={toggleSpecialsFormVisible}>Add A Special/Event</p>
                    <p className={`text-lg cursor-pointer ${allSpecialsEventsVisible ? "font-bold border-y border-l pl-2 border-slate-900" : ""}`} onClick={toggleAllSpecialsEventsVisible}>All Specials</p>
                    <p className={`text-lg cursor-pointer ${recurringSpecialsEventsVisible ? "font-bold border-y border-l pl-2 border-slate-900" : ""}`} onClick={toggleRecurringSpecialsEventsVisible}>Recurring Specials</p>
                </div>

                <div className="flex flex-col w-10/12 justify-start">

                    
                    <div className={`${specialsFormVisible ? "flex" : "hidden"}`}>
                        <SpecialsForm />
                    </div>


                    <div className={`${allSpecialsEventsVisible ? "flex flex-col" : "hidden"}`}>
                        {allSpecialsEventsVisible && <div>
                            {allSpecialsEvents.map(specialEvent => (
                                <div key={specialEvent.id} className="flex flex-col w-full py-2">
                                    <EditSpecialsForm specialEvent={specialEvent} getAllSpecialsEvents={getAllSpecialsEvents}/>
                                </div>
                            ))}
                        </div>}
                    </div>


                    <div className={`${recurringSpecialsEventsVisible ? "flex flex-col" : "hidden"}`}>
                        {recurringSpecialsEventsVisible && <div>
                            {recurringSpecialsEvents.map(specialEvent => (
                                <div key={specialEvent.id} className="flex flex-col w-full py-2">
                                    <EditSpecialsForm specialEvent={specialEvent} getAllSpecialsEvents={getAllSpecialsEvents}/>
                                </div>
                            ))}
                        </div>}
                    </div>

                </div>
                
            </div>

        </div>
        
    );
}
 
export default Specials;