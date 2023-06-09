import { Link, useParams } from "react-router-dom";
import SpecialsForm from "./restaurant_subcomponents/SpecialsForm";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/UserContext";
import { formatSpecialEventDays } from "../../../lib/utils";

const Specials = () => {
    const {RestaurantId} = useParams();
    const {user, setUser} = useContext(UserContext);
    const userId = user.id

    const [allSpecialsEventsVisible, setAllSpecialsEventsVisible] = useState(false);
    const [recurringSpecialsEventsVisible, setRecurringSpecialsEventsVisible] = useState(false);
    const [specialsFormVisible, setSpecialsFormVisible] = useState(false);
    const [allSpecialsEvents, setAllSpecialsEvents] = useState([]);
    const [recurringSpecialsEvents, setRecurringSpecialsEvents] = useState([]);
    
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

    const config = {
        headers: {"token": localStorage.getItem("token")},
        params: {
            RestaurantId: RestaurantId,
            userId: user.id
        }
    };

    const getAllSpecialsEvents = () => {
        axios.get(`http://localhost:3000/api/get_all_specials_events/${RestaurantId}/${userId}`, config)
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
        <div className="container">
            <div className="flex flex-row justify-center pt-3">
                <p className="text-3xl">Specials/Events</p>
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
                    <div className={`${allSpecialsEventsVisible ? "flex" : "hidden"}`}>
                        {allSpecialsEventsVisible && <div>
                            {allSpecialsEvents.map(specialEvent => (
                                <div key={specialEvent.id} className="flex flex-col w-full py-2">
                                    <div className="flex flex-col pl-10">
                                        <div>
                                            {specialEvent.specialOrEvent === "special" ? <p className="text-lg font-medium underline">Special:</p> : <p className="text-lg font-medium underline">Event:</p>}
                                        </div>
                                        <div className="flex flex-row">
                                            <p>{specialEvent.name} - {specialEvent.description}</p>
                                        </div>
                                        <div className="flex flex-row">
                                            <p>Available &nbsp;</p>
                                            {specialEvent.specialEventDate ? <p>{specialEvent.specialEventDate}</p> : <p>every {formatSpecialEventDays(specialEvent.weekdays)}</p>}
                                            <p>&nbsp; from {specialEvent.startTime} - {specialEvent.endTime}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>}
                    </div>
                    <div className={`${recurringSpecialsEventsVisible ? "flex" : "hidden"}`}>
                        {recurringSpecialsEventsVisible && <div>
                            {recurringSpecialsEvents.map(specialEvent => (
                                <div key={specialEvent.id} className="flex flex-col w-full py-2">
                                    <div className="flex flex-col pl-10">
                                        <div>
                                            {specialEvent.specialOrEvent === "special" ? <p className="text-lg font-medium underline">Special:</p> : <p className="text-lg font-medium underline">Event:</p>}
                                        </div>
                                        <div className="flex flex-row">
                                            <p>{specialEvent.name} - {specialEvent.description}</p>
                                        </div>
                                        <div className="flex flex-row">
                                            <p>Available &nbsp;</p>
                                            {specialEvent.specialEventDate ? <p>{specialEvent.specialEventDate}</p> : <p>every {formatSpecialEventDays(specialEvent.weekdays)}</p>}
                                            <p>&nbsp; from {specialEvent.startTime} - {specialEvent.endTime}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>}
                    </div>

                </div>
                
            </div>
        </div>
        // <div className="justify-center">
        //     <div className="grid grid-cols-1 justify-center justify-items-center">
        //         <p className="text-4xl text-center">Specials/Events</p>
                
        //     </div>
        //     <div className="grid grid-cols-3 justify-center pt-2">
        //         <div className="flex justify-center">
        //             <button className="border border-white p-2 rounded-lg w-1/2" onClick={toggleAllSpecialsEventsVisible}>All Specials</button>
        //         </div>
        //         <div className="flex justify-center">
        //             <button className="border border-white p-2 rounded-lg w-1/2" onClick={toggleRecurringSpecialsEventsVisible}>Recurring Specials</button>
        //         </div>
        //         <div className="flex justify-center">
        //             <button className="border border-white p-2 rounded-lg w-1/2"><Link to={`/add_specials/${RestaurantId}`}>Add Specials/Events</Link></button>
        //         </div>
        //     </div>

            // </div>


        
    );
}
 
export default Specials;