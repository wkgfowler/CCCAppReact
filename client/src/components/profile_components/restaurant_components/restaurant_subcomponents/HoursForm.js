import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useRouteLoaderData } from "react-router-dom";
import { UserContext } from "../../../../context/UserContext";
import { CLOSEHOURS, OPENHOURS, convertToNormalHours } from "../../../../lib/utils";

const HoursForm = ({restaurant, setHoursVisible, hoursVisible, alert}) => {
    const date = new Date();
    const navigate = useNavigate();

    const [hours, setHours] = useState([]);
    const [valid, isValid] = useState(false);
    const {user, setUser} = useContext(UserContext);
    const {RestaurantId} = useParams();
    const userId = user.id;

    const breakfast = document.getElementById("breakfast");
    const brunch = document.getElementById("brunch");
    const lunch = document.getElementById("lunch");
    const dinner = document.getElementById("dinner")

    const [mealsOffered, setMealsOffered] = useState([]);

    const mondayOpenRef = useRef();
    const mondayCloseRef = useRef();
    const tuesdayOpenRef = useRef();
    const tuesdayCloseRef = useRef();
    const wednesdayOpenRef = useRef();
    const wednesdayCloseRef = useRef();
    const thursdayOpenRef = useRef();
    const thursdayCloseRef = useRef();
    const fridayOpenRef = useRef();
    const fridayCloseRef = useRef();
    const saturdayOpenRef = useRef();
    const saturdayCloseRef = useRef();
    const sundayOpenRef = useRef();
    const sundayCloseRef = useRef();

    const config = {
        headers: {"token": localStorage.getItem("token")},
        params: {
            RestaurantId: RestaurantId,
            userId: user.id
        }
    };

    const getHours = () => {
        axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/get_hours/${RestaurantId}/${userId}`, config)
        .then((response) => {
            console.log(response.data)
            isValid(response.data.valid)
            // console.log(response.data.hours)
            setHours(response.data.hours)
        }, (error) => {
            console.log(error)
        })
    };

    useEffect(() => {
        console.log(restaurant)
        setMealsOffered(mealsOffered => [...mealsOffered, ...restaurant.mealTimes])
        getHours();
    }, [])

    const onSubmitForm = async (e) => {
        e.preventDefault();
        let filteredMeals = [...new Set(mealsOffered)]
        axios.post('http://localhost:3000/api/update_hours', {
            RestaurantId: RestaurantId,
            mealTimes: filteredMeals,
            sundayOpen: sundayOpenRef.current.value,
            sundayClose: sundayCloseRef.current.value,
            mondayOpen: mondayOpenRef.current.value,
            mondayClose: mondayCloseRef.current.value,
            tuesdayOpen: tuesdayOpenRef.current.value,
            tuesdayClose: tuesdayCloseRef.current.value,
            wednesdayOpen: wednesdayOpenRef.current.value,
            wednesdayClose: wednesdayCloseRef.current.value,
            thursdayOpen: thursdayOpenRef.current.value,
            thursdayClose: thursdayCloseRef.current.value,
            fridayOpen: fridayOpenRef.current.value,
            fridayClose: fridayCloseRef.current.value,
            saturdayOpen: saturdayOpenRef.current.value,
            saturdayClose: saturdayCloseRef.current.value
        }, {
            headers: {
                "token" : localStorage.getItem("token")
            }
        })
        .then((response) => {
            console.log(response)
            setHoursVisible(!hoursVisible)
            alert.success('Information updated successfully.')
            // navigate(`/profile/${user.id}`)
        }, (error) => {
            console.log("not quite")
            console.log(error)
        })
    }

    const dayClose = (day) => {
        const dayOpen = document.getElementById(`${day}Open`)
        const dayClose = document.getElementById(`${day}Close`)

        if (dayOpen.value === "Closed") {
            dayClose.setAttribute("disabled", "")
            dayClose.value = "Closed"
        }
        
        if (dayOpen.value !== "Closed") {
            dayClose.removeAttribute("disabled")
            dayClose.value = ""
        }
    };

    const addMealtimes = (meal) => {
        let mealtime = document.getElementById(meal)
        if (mealtime.checked) {
            setMealsOffered(mealsOffered => [...mealsOffered, mealtime.value])
        } else if (!mealtime.checked && mealsOffered.includes(mealtime.value)) { 
            setMealsOffered(mealsOffered.filter(theMeal => theMeal !== mealtime.value))
        }
    }

    if (valid) {
        return (
            <div className="flex justify-center text-white">
                <form onSubmit={onSubmitForm}>
                    <p className="text-2xl pt-4 pt-2 text-center underline">Mealtimes:</p>
                    <div className="grid grid-cols-4 pb-2">
                    <div>
                        {mealsOffered.includes("Breakfast") ? 
                            <input type="checkbox" name="breakfast" id="breakfast" 
                            checked value="Breakfast" onClick={() => addMealtimes("breakfast")} />
                            :   
                            <input type="checkbox" name="breakfast" id="breakfast" value="Breakfast" 
                            onClick={() => addMealtimes("breakfast")} />}
                        <label htmlFor="">Breakfast</label>
                    </div>
                    <div>
                        {mealsOffered.includes("Brunch") ?
                            <input type="checkbox" name="brunch" id="brunch" 
                            checked value={"Brunch"} onClick={() => addMealtimes("brunch")}/> 
                            : 
                            <input type="checkbox" name="brunch" id="brunch" 
                            value={"Brunch"} onClick={() => addMealtimes("brunch")} />}
                        <label htmlFor="">Brunch</label>
                    </div>
                    <div>
                        {mealsOffered.includes("Lunch") ? 
                            <input type="checkbox" name="lunch" id="lunch" checked value={"Lunch"}
                            onClick={() => addMealtimes("lunch")} /> 
                            : 
                            <input type="checkbox" name="lunch" id="lunch" value={"Lunch"} 
                            onClick={() => addMealtimes("lunch")} />}
                        <label htmlFor="">Lunch</label>
                    </div>
                    <div>
                        {mealsOffered.includes("Dinner") ? 
                            <input type="checkbox" name="dinner" id="dinner" checked value={"Dinner"}
                            onClick={() => addMealtimes("dinner")} /> 
                            : 
                            <input type="checkbox" name="dinner" id="dinner" value={"Dinner"}
                            onClick={() => addMealtimes("dinner")} />}
                        <label htmlFor="">Dinner</label>
                    </div>
                </div>
                    <p className="text-2xl pt-4 pb-2 text-center underline">Your restaurant's hours</p>
                    <div className="grid grid-cols-4 pb-2">
                        <div>
                            <label htmlFor="">Monday's opening time:</label>
                        </div>
                        <div>
                            <select name="mondayOpen" className="ml-2 text-black" id="mondayOpen" ref={mondayOpenRef} onClick={() => dayClose("monday")}>
                                {hours.length >= 1 ? <option value={`${hours.find(item => item.weekday === 1).openHour}`}>{convertToNormalHours(`${hours.find(item => item.weekday === 1).openHour}`)}</option> : <option value="">--Select an opening time--</option>}
                                {OPENHOURS.map(x => {
                                    return ( 
                                        <option value={x.value}>{x.display}</option>
                                    )}
                                )}
                            </select>
                        </div>
                        <div className="pl-4">
                            <label htmlFor="">Monday's closing time:</label>
                        </div>
                        <div>
                            <select name="mondayClose" className="ml-2 text-black" id="mondayClose" ref={mondayCloseRef}>
                            {hours.length >= 1 ? <option value={`${hours.find(item => item.weekday === 1).closeHour}`}>{convertToNormalHours(`${hours.find(item => item.weekday === 1).closeHour}`)}</option> : <option value="">--Select a closing time--</option>}
                                {CLOSEHOURS.map(x => {
                                    return ( 
                                        <option value={x.value}>{x.display}</option>
                                    )}
                                )}
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 pb-2">
                        <div>
                            <label htmlFor="">Tuesday's opening time:</label>
                        </div>
                        <div>
                            <select name="tuesdayOpen" className="ml-2 text-black" id="tuesdayOpen" ref={tuesdayOpenRef} onClick={() => dayClose("tuesday")}>
                            {hours.length >= 1 ? <option value={`${hours.find(item => item.weekday === 2).openHour}`}>{convertToNormalHours(`${hours.find(item => item.weekday === 2).openHour}`)}</option> : <option value="">--Select an opening time--</option>}
                                {OPENHOURS.map(x => {
                                    return ( 
                                        <option value={x.value}>{x.display}</option>
                                    )}
                                )}
                            </select>
                        </div>
                        <div className="pl-4">
                            <label htmlFor="">Tuesday's closing time:</label>
                        </div>
                        <div>
                            <select name="tuesdayClose" className="ml-2 text-black" id="tuesdayClose" ref={tuesdayCloseRef}>
                            {hours.length >= 1 ? <option value={`${hours.find(item => item.weekday === 2).closeHour}`}>{convertToNormalHours(`${hours.find(item => item.weekday === 2).closeHour}`)}</option> : <option value="">--Select a closing time--</option>}
                                {CLOSEHOURS.map(x => {
                                    return ( 
                                        <option value={x.value}>{x.display}</option>
                                    )}
                                )}
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 pb-2">
                        <div>
                            <label htmlFor="">Wednesday's opening time:</label>
                        </div>
                        <div>
                            <select name="wednesdayOpen" className="ml-2 text-black" id="wednesdayOpen" ref={wednesdayOpenRef} onClick={() => dayClose("wednesday")}>
                            {hours.length >= 1 ? <option value={`${hours.find(item => item.weekday === 3).openHour}`}>{convertToNormalHours(`${hours.find(item => item.weekday === 3).openHour}`)}</option> : <option value="">--Select an opening time--</option>}
                                {OPENHOURS.map(x => {
                                    return ( 
                                        <option value={x.value}>{x.display}</option>
                                    )}
                                )}
                            </select>
                        </div>
                        <div className="pl-4">
                            <label htmlFor="">Wednesday's closing time:</label>
                        </div>
                        <div>
                            <select name="wednesdayClose" className="ml-2 text-black" id="wednesdayClose" ref={wednesdayCloseRef}>
                            {hours.length >= 1 ? <option value={`${hours.find(item => item.weekday === 3).closeHour}`}>{convertToNormalHours(`${hours.find(item => item.weekday === 3).closeHour}`)}</option> : <option value="">--Select a closing time--</option>}
                                {CLOSEHOURS.map(x => {
                                    return ( 
                                        <option value={x.value}>{x.display}</option>
                                    )}
                                )}
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 pb-2">
                        <div>
                            <label htmlFor="">Thursday's opening time:</label>
                        </div>
                        <div>
                            <select name="thursdayOpen" className="ml-2 text-black" id="thursdayOpen" ref={thursdayOpenRef} onClick={() => dayClose("thursday")}>
                            {hours.length >= 1 ? <option value={`${hours.find(item => item.weekday === 4).openHour}`}>{convertToNormalHours(`${hours.find(item => item.weekday === 4).openHour}`)}</option> : <option value="">--Select an opening time--</option>}
                                {OPENHOURS.map(x => {
                                    return ( 
                                        <option value={x.value}>{x.display}</option>
                                    )}
                                )}
                            </select>
                        </div>
                        <div className="pl-4">
                            <label htmlFor="">Thursday's closing time:</label>
                        </div>
                        <div>
                            <select name="thursdayClose" className="ml-2 text-black" id="thursdayClose" ref={thursdayCloseRef}>
                            {hours.length >= 1 ? <option value={`${hours.find(item => item.weekday === 4).closeHour}`}>{convertToNormalHours(`${hours.find(item => item.weekday === 4).closeHour}`)}</option> : <option value="">--Select a closing time--</option>}
                                {CLOSEHOURS.map(x => {
                                    return ( 
                                        <option value={x.value}>{x.display}</option>
                                    )}
                                )}
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 pb-2">
                        <div>
                            <label htmlFor="">Friday's opening time:</label>
                        </div>
                        <div>
                            <select name="fridayOpen" className="ml-2 text-black" id="fridayOpen" ref={fridayOpenRef} onClick={() => dayClose("friday")}>
                            {hours.length >= 1 ? <option value={`${hours.find(item => item.weekday === 5).openHour}`}>{convertToNormalHours(`${hours.find(item => item.weekday === 5).openHour}`)}</option> : <option value="">--Select an opening time--</option>}
                                {OPENHOURS.map(x => {
                                    return ( 
                                        <option value={x.value}>{x.display}</option>
                                    )}
                                )}
                            </select>
                        </div>
                        <div className="pl-4">
                            <label htmlFor="">Friday's closing time:</label>
                        </div>
                        <div>
                            <select name="fridayClose" className="ml-2 text-black" id="fridayClose" ref={fridayCloseRef}>
                            {hours.length >= 1 ? <option value={`${hours.find(item => item.weekday === 5).closeHour}`}>{convertToNormalHours(`${hours.find(item => item.weekday === 5).closeHour}`)}</option> : <option value="">--Select a closing time--</option>}
                                {CLOSEHOURS.map(x => {
                                    return ( 
                                        <option value={x.value}>{x.display}</option>
                                    )}
                                )}
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 pb-2">
                        <div>
                            <label htmlFor="">Saturday's opening time:</label>
                        </div>
                        <div>
                            <select name="saturdayOpen" className="ml-2 text-black" id="saturdayOpen" ref={saturdayOpenRef} onClick={() => dayClose("saturday")}>
                            {hours.length >= 1 ? <option value={`${hours.find(item => item.weekday === 6).openHour}`}>{convertToNormalHours(`${hours.find(item => item.weekday === 6).openHour}`)}</option> : <option value="">--Select an opening time--</option>}
                                {OPENHOURS.map(x => {
                                    return ( 
                                        <option value={x.value}>{x.display}</option>
                                    )}
                                )}
                            </select>
                        </div>
                        <div className="pl-4">
                            <label htmlFor="">Saturday's closing time:</label>
                        </div>
                        <div>
                            <select name="saturdayClose" className="ml-2 text-black" id="saturdayClose" ref={saturdayCloseRef}>
                            {hours.length >= 1 ? <option value={`${hours.find(item => item.weekday === 6).closeHour}`}>{convertToNormalHours(`${hours.find(item => item.weekday === 6).closeHour}`)}</option> : <option value="">--Select a closing time--</option>}
                                {CLOSEHOURS.map(x => {
                                    return ( 
                                        <option value={x.value}>{x.display}</option>
                                    )}
                                )}
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-4">
                        <div>
                            <label htmlFor="">Sunday's opening time:</label>
                        </div>
                        <div>
                            <select name="sundayOpen" className="ml-2 text-black" id="sundayOpen" ref={sundayOpenRef} onClick={() => dayClose("sunday")}>
                            {hours.length >= 1 ? <option value={`${hours.find(item => item.weekday === 0).openHour}`}>{convertToNormalHours(`${hours.find(item => item.weekday === 0).openHour}`)}</option> : <option value="">--Select an opening time--</option>}
                                {OPENHOURS.map(x => {
                                    return ( 
                                        <option value={x.value}>{x.display}</option>
                                    )}
                                )}
                            </select>
                        </div>
                        <div className="pl-4">
                            <label htmlFor="">Sunday's closing time:</label>
                        </div>
                        <div>
                            <select name="sundayClose" className="ml-2 text-black" id="sundayClose" ref={sundayCloseRef}>
                            {hours.length >= 1 ? <option value={`${hours.find(item => item.weekday === 0).closeHour}`}>{convertToNormalHours(`${hours.find(item => item.weekday === 0).closeHour}`)}</option> : <option value="">--Select a closing time--</option>}
                                {CLOSEHOURS.map(x => {
                                    return ( 
                                        <option value={x.value}>{x.display}</option>
                                    )}
                                )}
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-center py-2">
                        <button className="outline outline-2 bg-[#56707E] rounded px-2 py-1">Submit</button>
                    </div>
                    
                </form>
            </div>
        );
    } else {
        return (
            <div>
                <p>Not authorized</p>
            </div>
        )
    }
}
 
export default HoursForm;