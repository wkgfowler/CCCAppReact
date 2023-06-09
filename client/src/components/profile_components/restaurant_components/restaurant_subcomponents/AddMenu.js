import { useContext, useRef, useState } from 'react';
import { MENUENDHOURS, MENUMINUTES, MENUSTARTHOURS, MENUTYPES, WEEKDAYS, formatMenuTime } from '../../../../lib/utils';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../../../context/UserContext';

const AddMenu = () => {
    const {user, setUser} = useContext(UserContext)
    const {RestaurantId} = useParams();
    const inputRef = useRef(null);
    const [menu, setMenu] = useState([]);
    const menuTypeRef = useRef();
    const startHourRef = useRef();
    const startMinuteRef = useRef();
    const startAMPMRef = useRef();
    const endHourRef = useRef();
    const endMinuteRef = useRef();
    const endAMPMRef = useRef();
    const sunday = document.getElementById("Sunday");
    const monday = document.getElementById("Monday");
    const tuesday = document.getElementById("Tuesday");
    const wednesday = document.getElementById("Wednesday");
    const thursday = document.getElementById("Thursday");
    const friday = document.getElementById("Friday");
    const saturday = document.getElementById("Saturday");
    const [everyday, setEveryday] = useState(true);
    const [startDisabled, setStartDisabled] = useState(false);
    const [endDisabled, setEndDisabled] = useState(false);
    const [daysVisibility, setDaysVisibility] = useState(false);
    const navigate = useNavigate();
    
    const handleStartTime = (time) => {
        const hour = document.getElementById(`${time}Hour`)
        const minute = document.getElementById(`${time}Minute`)
        const AMPM = document.getElementById(`${time}AMPM`)

        if (hour.value === "Open") {
            setStartDisabled(true);
            minute.value = ""
            AMPM.value = ""
        }

        if (hour.value !== "Open") {
            setStartDisabled(false)
        }
    }

    const handleEndTime = (time) => {
        const hour = document.getElementById(`${time}Hour`)
        const minute = document.getElementById(`${time}Minute`)
        const AMPM = document.getElementById(`${time}AMPM`)

        if (hour.value === "Close") {
            setEndDisabled(true);
            minute.value = ""
            AMPM.value = ""
        }

        if (hour.value !== "Close") {
            setEndDisabled(false)
        }
    }

    const handleMenuClick = () => {
        inputRef.current.click();
    }

    const handleMenuChange = (event) => {
        setMenu(Array.from(event.target.files));
    }

    const areDaysVisible = () => {
        const days = document.getElementById("dayAvailability")
        if (days.value === "selectDays") {
            setDaysVisibility(true)
            setEveryday(false)
        } else {
            setEveryday(true)
            setDaysVisibility(false)
        }
    }
    
    const onSubmitForm = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('RestaurantId', RestaurantId);
        formData.append('menuType', menuTypeRef.current.value);
        formData.append('startTime', formatMenuTime(startHourRef.current.value, startMinuteRef.current.value, startAMPMRef.current.value));
        formData.append('endTime', formatMenuTime(endHourRef.current.value, endMinuteRef.current.value, endAMPMRef.current.value));
        formData.append('everyday', everyday)
        formData.append('sunday', sunday.checked);
        formData.append('monday', monday.checked);
        formData.append('tuesday', tuesday.checked);
        formData.append('wednesday', wednesday.checked);
        formData.append('thursday', thursday.checked);
        formData.append('friday', friday.checked);
        formData.append('saturday', saturday.checked);
        menu.forEach((file) => {
            formData.append('menuImage', file)
        });
        axios.post('http://localhost:3000/api/add_menu', formData, {
            headers: {
                "token" : localStorage.getItem("token")
            }
        })
        .then(() => {
            console.log("there is no error")
            navigate(`/profile/${user.id}`)
        }, (error) => {
            console.log("not quite")
            console.log(error)
        })
    }

    return (
        <div>
            <form onSubmit={onSubmitForm}>
                <p className="text-2xl pt-2">Add a menu for your restaurant:</p>

                {/* menu type */}
                <div className="flex justify-start pt-2 gap-2">
                    <label>Select a menu type:</label>
                    <select name="menuType" id="menuType" ref={menuTypeRef}>
                        <option value="">--Menu type--</option>
                        {MENUTYPES.map(x => {
                            return (
                                <option value={x}>{x}</option>
                            )
                        })}
                    </select>
                </div>

                {/* menu time availability */}
                <div className="flex justify-start pt-2 gap-2">
                    <div className="flex">
                        <label>Menu availability: </label>
                        <select ref={startHourRef} name="startHour" className="ml-2" id="startHour" onClick={() => handleStartTime("start")}>
                            {MENUSTARTHOURS.map(x => {
                                return (
                                    <option value={x.value}>{x.display}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="flex">
                        <select ref={startMinuteRef} name="startMinute" className="pl-1" disabled={startDisabled} id="startMinute">
                        {MENUMINUTES.map(x => {
                            return (
                                <option value={x.value}>{x.display}</option>
                            )
                        })}
                        </select>
                    </div>
                    <div className="flex">
                        <select ref={startAMPMRef} name="startAMPM" className="pl-1" disabled={startDisabled} id="startAMPM">
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                        </select>
                    </div>
                    
                    <p>to</p>
                    <select ref={endHourRef} name="endHour" className="pl-1" id="endHour" onClick={() => handleEndTime("end")}>
                        {MENUENDHOURS.map(x => {
                            return (
                                <option value={x.value}>{x.display}</option>
                            )
                        })}
                    </select>
                    <select ref={endMinuteRef} name="endMinute" className="pl-1" disabled={endDisabled} id="endMinute">
                        {MENUMINUTES.map(x => {
                            return (
                                <option value={x.value}>{x.display}</option>
                            )
                        })}
                    </select>
                    <select ref={endAMPMRef} name="endAMPM" className="pl-1" disabled={endDisabled} id="endAMPM">
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                    </select>
                </div>
                
                {/* menu days availability */}
                <div className="flex justify-start pt-2">
                    <div>
                        <label>What days is the menu available?</label>
                        <select name="dayAvailability" id="dayAvailability" className="ml-2" onChange={areDaysVisible}>
                            <option value="everyday">Everyday</option>
                            <option value="selectDays">Select days</option>
                        </select>
                    </div>

                </div>
                <div className={`flex ${daysVisibility ? "" : "hidden"}`}>
                    {WEEKDAYS.map(x => {
                        return (
                            <div className="pl-2">
                                <input type="checkbox" name={x} id={x} value={x} />
                                <label className="pl-1">{x}</label>
                            </div>
                        )
                    })}
                </div>

                <div className="flex justify-start" onClick={handleMenuClick}>
                    {menu.length >= 1 ? menu.map(x => {
                        return (
                            <img src={URL.createObjectURL(x)} alt="" className="w-1/2 h-1/2"/>
                        )
                    }) : <img src={require('../../../../images/add-image-80.png')} alt=""/>}
                    <input type="file" size="lg" id="menuImage" name="menuImage" multiple ref={inputRef} style={{display: "none"}} onChange={handleMenuChange}/>
                </div>

                <div className="flex justify-start">
                    <button className="outline outline-2 bg-slate-900 text-white rounded px-2 py-1 mt-2">Submit</button>
                </div>
            </form>
        </div>
    );
}
 
export default AddMenu;