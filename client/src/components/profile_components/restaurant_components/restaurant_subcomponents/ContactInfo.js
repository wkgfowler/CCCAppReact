import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../../../context/UserContext";
import { TOWNS } from "../../../../lib/utils";

const ContactInfo = ({restaurant, setInfoVisible, infoVisible, alert}) => {
    const {user, setUser} = useContext(UserContext)
    const [number, setNumber] = useState("")
    const {RestaurantId} = useParams();

    const handleInput = e => {
        const formattedNumber = formatPhoneNumber(e.target.value);
        setNumber(formattedNumber)
    }

    const formatPhoneNumber = (value) => {
        if (!value) return value;
        const phoneNumber = value.replace(/[^\d]/g, "");
        const phoneNumberLength = phoneNumber.length;
        if (phoneNumberLength < 4) return phoneNumber;
        if (phoneNumberLength < 7) {
            return `(${phoneNumber.slice(0,3)}) ${phoneNumber.slice(3)}`;
        }
        return `(${phoneNumber.slice(0,3)}) ${phoneNumber.slice(
            3,
            6,
            )}-${phoneNumber.slice(6,10)}`;
    }

    const streetAddressRef = useRef();
    const townRef = useRef();

    useEffect(() => {
        if (restaurant.phoneNumber) {
            setNumber(restaurant.phoneNumber)
        }
    } , [])


    const onSubmitForm = async (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/api/contact_info', {
            id: RestaurantId,
            streetAddress: streetAddressRef.current.value,
            town: townRef.current.value,
            phoneNumber: number
        }, {
            headers: {
                "token": localStorage.getItem("token")
            }
        })
        .then((response) => {
            console.log(response.data);
            setInfoVisible(!infoVisible);
            alert.success('Information updated successfully.')
        }, (error) => {
            console.log(error)
        })
    }

    return (
        <div className="flex justify-center pt-4">
            <form onSubmit={onSubmitForm}>
                <div className="flex justify-center">
                    <label className="text-lg">Street Address:</label>
                </div>
                <div className="flex justify-center">
                    <input type="text" name="streetAddress" defaultValue={restaurant.streetAddress ? restaurant.streetAddress : ""} ref={streetAddressRef} className="text-center my-2 rounded text-black" required/>
                </div>
                <div className="flex justify-center pt-2">
                    <label className="text-lg">Select your town:</label>
                </div>
                <div className="flex justify-center">
                    <select name="town" ref={townRef} className="text-center my-2 bg-[#56707E] border-1">
                        {restaurant.town ? <option defaultValue={restaurant.town}>{restaurant.town}</option> : <option value="default">--Your Town--</option>}
                        {TOWNS.map(town => (
                            <option value={town}>{town}</option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-center pt-2">
                    <label className="text-lg">Phone Number:</label>
                </div>
                <div className="flex justify-center">
                    <input type="tel" name="phoneNumber" onChange={e => handleInput(e)} defaultValue={restaurant.phoneNumber} className="text-center my-2 rounded text-black" required/>
                </div>
                <div className="flex justify-center pt-2">
                    <button className="outline outline-2 bg-[#56707E] rounded px-2 py-1">Submit</button>
                </div>
            </form>
        </div>
    );
}
 
export default ContactInfo;