import { Link, useParams } from "react-router-dom";
import SpecialsForm from "./restaurant_subcomponents/SpecialsForm";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/UserContext";

import EditSpecialsForm from "./restaurant_subcomponents/EditSpecialsForm";

const Specials = () => {
    const {RestaurantId} = useParams();
    const {user, setUser} = useContext(UserContext);
    const userId = user.id

    const [specialsFormVisible, setSpecialsFormVisible] = useState(false);
    const [allSpecialsEvents, setAllSpecialsEvents] = useState([]);
    const [specialOrEvent, setSpecialOrEvent] = useState([]);
    const [recurringOrNot, setRecurringOrNot] = useState([]);

    const toggleSpecialsFormVisible = () => {
        setSpecialsFormVisible(!specialsFormVisible)
    }

    const addType = (typeName) => {
        let type = document.getElementById(typeName)
        if (type.checked) {
            setSpecialOrEvent(specialOrEvent => [...specialOrEvent, type.value])
        } else if (!type.checked && specialOrEvent.includes(type.value)) {
            setSpecialOrEvent(specialOrEvent.filter(x => x !== type.value))
        }
    }

    const addRecurring = (obj) => {
        let objType = document.getElementById(obj)
        if (objType.checked) {
            setRecurringOrNot(recurringOrNot => [...recurringOrNot, objType.value])
        } else if (!objType.chcked && recurringOrNot.includes(objType.value)) {
            setRecurringOrNot(recurringOrNot.filter(x => x !== objType.value))
        }
    }

    const config = {
        headers: {"token": localStorage.getItem("token")},
        params: {
            RestaurantId: RestaurantId,
            userId: user.id,
            specialOrEvent: specialOrEvent,
            recurring: recurringOrNot
        }
    };

    const getAllSpecialsEvents = () => {
        axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/get_all_specials_events/${RestaurantId}/${userId}`, config)
        .then((response) => {
            console.log(response.data)
            setAllSpecialsEvents(response.data)
        }, (error) => {
            console.log(error)
        })
    };

    useEffect(() => {
        getAllSpecialsEvents();
    }, [specialOrEvent, recurringOrNot])

    return (
        <div className="container bg-[#dfebf2] pb-3">
            <div className="flex flex-row justify-center pt-3">
                <p className="text-3xl">Specials & Events</p>
            </div>

            <div className="flex flex-row justify-center gap-6 pt-3">
                <div className="pr-12">
                    <button className="text-white bg-[#56707E] rounded px-2 py-1" onClick={toggleSpecialsFormVisible}>Add Special/Event</button>
                </div>
                <p className="text-xl">Filter by:</p>
                <div>
                    <input type="checkbox" name="special" id="special" value="special" onClick={() => addType("special")}/>
                    <label for="special" className="text-xl">Specials</label>
                </div>
                <div>
                    <input type="checkbox" name="event" id="event" value="event" onClick={() => addType("event")}/>
                    <label for="event" className="text-xl">Events</label>
                </div>
                <div>
                    <input type="checkbox" name="nonrecurring" id="nonrecurring" value="false" onClick={() => addRecurring("nonrecurring")}/>
                    <label for="nonrecurring" className="text-xl">Nonrecurring</label>
                </div>
                <div>
                    <input type="checkbox" name="recurring" id="recurring" value="true" onClick={() => addRecurring("recurring")}/>
                    <label for="recurring" className="text-xl">Recurring</label>
                </div>
                
            </div>
                    
            <div className={`${specialsFormVisible ? "flex flex-col justify-center" : "hidden"}`}>
                <SpecialsForm getAllSpecialsEvents={getAllSpecialsEvents}/>
            </div>

            <div className="flex flex-col pl-10">
                {allSpecialsEvents !== undefined && allSpecialsEvents.map(specialEvent => (
                    <div key={specialEvent.id} className="flex flex-col w-full py-2">
                        <EditSpecialsForm specialEvent={specialEvent} getAllSpecialsEvents={getAllSpecialsEvents}/>
                    </div>
                ))}
            </div>
            

        </div>
        
    );
}
 
export default Specials;