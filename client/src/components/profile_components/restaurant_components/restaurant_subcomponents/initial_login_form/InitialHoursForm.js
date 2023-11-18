import React, { useRef, useState } from 'react';
import { CLOSEHOURS, OPENHOURS, convertToNormalHours } from "../../../../../lib/utils";

function InitialHoursForm({prev , next, mealsOffered, setMealsOffered, mondayOpenRef, mondayCloseRef, tuesdayOpenRef, tuesdayCloseRef, wednesdayOpenRef, wednesdayCloseRef, thursdayOpenRef, thursdayCloseRef, fridayOpenRef, fridayCloseRef, saturdayOpenRef, saturdayCloseRef, sundayOpenRef, sundayCloseRef}) {
    const [isFoodOffered, setIsFoodOffered] = useState(false);

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

    const areMealsOffered = (response) => {
        let resp = document.getElementById(response)
        console.log(resp)
        if (resp.value === "true") {
            setIsFoodOffered(true)
        } else if (resp.value === "false") {
            setIsFoodOffered(false)
        }
    }

    const addMealtimes = (meal) => {
        let mealtime = document.getElementById(meal)
        if (mealtime.checked) {
            setMealsOffered(mealsOffered => [...mealsOffered, mealtime.value])
        } else if (!mealtime.checked && mealsOffered.includes(mealtime.value)) { 
            setMealsOffered(mealsOffered.filter(theMeal => theMeal !== mealtime.value))
        }
    }


  return (
    <div className="pt-4">
        <div className="flex flex-row">
            <p className="text-xl">Does your business serve food?</p>
            <select name="food" className="ml-2 text-black rounded" id="food" onClick={() => areMealsOffered("food")}>
                <option value="">--Select an option--</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
            </select>
        </div>
        
        <div className={`${isFoodOffered ? "" : "hidden"}`}>
            <p className="text-2xl pt-4 pt-2 text-center underline">Which mealtimes do you offer?</p>    
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
        </div>
        <p className="text-2xl pt-4 pb-4 text-center underline">Your restaurant's hours</p>
                <div className="grid grid-cols-4 pb-2">
                    <div>
                        <label htmlFor="">Monday's opening time:</label>
                    </div>
                    <div>
                        <select name="mondayOpen" className="ml-2 text-black rounded" id="mondayOpen" ref={mondayOpenRef} onClick={() => dayClose("monday")}>
                            <option value="">--Select an opening time--</option>
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
                        <select name="mondayClose" className="ml-2 text-black rounded" id="mondayClose" ref={mondayCloseRef}>
                        <option value="">--Select a closing time--</option>
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
                        <select name="tuesdayOpen" className="ml-2 text-black rounded" id="tuesdayOpen" ref={tuesdayOpenRef} onClick={() => dayClose("tuesday")}>
                        <option value="">--Select an opening time--</option>
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
                        <select name="tuesdayClose" className="ml-2 text-black rounded" id="tuesdayClose" ref={tuesdayCloseRef}>
                        <option value="">--Select a closing time--</option>
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
                        <select name="wednesdayOpen" className="ml-2 text-black rounded" id="wednesdayOpen" ref={wednesdayOpenRef} onClick={() => dayClose("wednesday")}>
                        <option value="">--Select an opening time--</option>
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
                        <select name="wednesdayClose" className="ml-2 text-black rounded" id="wednesdayClose" ref={wednesdayCloseRef}>
                        <option value="">--Select a closing time--</option>
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
                        <select name="thursdayOpen" className="ml-2 text-black rounded" id="thursdayOpen" ref={thursdayOpenRef} onClick={() => dayClose("thursday")}>
                        <option value="">--Select an opening time--</option>
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
                        <select name="thursdayClose" className="ml-2 text-black rounded" id="thursdayClose" ref={thursdayCloseRef}>
                        <option value="">--Select a closing time--</option>
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
                        <select name="fridayOpen" className="ml-2 text-black rounded" id="fridayOpen" ref={fridayOpenRef} onClick={() => dayClose("friday")}>
                        <option value="">--Select an opening time--</option>
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
                        <select name="fridayClose" className="ml-2 text-black rounded" id="fridayClose" ref={fridayCloseRef}>
                        <option value="">--Select a closing time--</option>
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
                        <select name="saturdayOpen" className="ml-2 text-black rounded" id="saturdayOpen" ref={saturdayOpenRef} onClick={() => dayClose("saturday")}>
                        <option value="">--Select an opening time--</option>
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
                        <select name="saturdayClose" className="ml-2 text-black rounded" id="saturdayClose" ref={saturdayCloseRef}>
                        <option value="">--Select a closing time--</option>
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
                        <select name="sundayOpen" className="ml-2 text-black rounded" id="sundayOpen" ref={sundayOpenRef} onClick={() => dayClose("sunday")}>
                        <option value="">--Select an opening time--</option>
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
                        <select name="sundayClose" className="ml-2 text-black rounded" id="sundayClose" ref={sundayCloseRef}>
                        <option value="">--Select a closing time--</option>
                            {CLOSEHOURS.map(x => {
                                return ( 
                                    <option value={x.value}>{x.display}</option>
                                )}
                            )}
                        </select>
                    </div>
                </div>
                <div className="flex flex-row justify-evenly py-2 pt-4">
                    <button className="outline outline-2 bg-[#56707E] rounded px-2 py-1" onClick={(e) => prev(e)}>Previous</button>
                    <button className="outline outline-2 bg-[#56707E] rounded px-2 py-1" onClick={(e) => next(e)}>Next</button>
                </div>
    
            </div>
  )
}

export default InitialHoursForm