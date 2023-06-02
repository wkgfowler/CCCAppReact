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

    const [allSpecialsEventsVisible, setAllSpecialsEventsVisible] = useState(false)
    const [allSpecialsEvents, setAllSpecialsEvents] = useState([]);
    const makeAllSpecialsEventsVisible =() => {
        setAllSpecialsEventsVisible(!allSpecialsEventsVisible)
    };

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
            console.log(response.data)
            setAllSpecialsEvents(response.data)
        }, (error) => {
            console.log(error)
        })
    };

    useEffect(() => {
        getAllSpecialsEvents();
    }, [])

    return (
        <div className="justify-center">
            <div className="grid grid-cols-1 justify-center justify-items-center">
                <p className="text-4xl text-center">Specials/Events</p>
                
            </div>
            <div className="grid grid-cols-3 justify-center pt-2">
                <div className="flex justify-center">
                    <button className="border border-white p-2 rounded-lg w-1/2" onClick={makeAllSpecialsEventsVisible}>All Specials</button>
                </div>
                <div className="flex justify-center">
                    <button className="border border-white p-2 rounded-lg w-1/2">Recurring Specials</button>
                </div>
                <div className="flex justify-center">
                    <button className="border border-white p-2 rounded-lg w-1/2"><Link to={`/add_specials/${RestaurantId}`}>Add Specials/Events</Link></button>
                </div>
            </div>

            {allSpecialsEventsVisible && <div>
                {allSpecialsEvents.map(specialEvent => (
                    <div key={specialEvent.id}>
                        <div className="grid grid-cols-3 justify-around">
                            <div>
                                <p>{specialEvent.name}</p>
                            </div>
                            <div>
                                {specialEvent.specialEventDate ? <p>{specialEvent.specialEventDate}</p> : <p>Every {formatSpecialEventDays(specialEvent.weekdays)}</p>}
                            </div>
                            <div>
                                <p>{specialEvent.startTime} - {specialEvent.endTime}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 justify-center">
                            <p>{specialEvent.description}</p>
                        </div>
                    </div>
                ))}
            </div>}
        </div>
        
    );
}
 
export default Specials;