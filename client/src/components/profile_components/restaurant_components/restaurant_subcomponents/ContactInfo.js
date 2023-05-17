import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../../../context/UserContext";

const ContactInfo = ({restaurant}) => {
    const {user, setUser} = useContext(UserContext)
    const [number, setNumber] = useState("")
    const {restaurantId} = useParams();

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
            id: restaurantId,
            streetAddress: streetAddressRef.current.value,
            town: townRef.current.value,
            phoneNumber: number
        }, {
            headers: {
                "token": localStorage.getItem("token")
            }
        })
        .then((response) => {
            console.log(response.data)
        }, (error) => {
            console.log(error)
        })
    }

    return (
        <div className="flex justify-center">
            <form onSubmit={onSubmitForm}>
                <p className="text-2xl pt-4 pb-2 text-center underline">Contact Info</p>
                <div className="flex justify-center">
                    <label className="text-lg">Street Address:</label>
                </div>
                <div className="flex justify-center">
                    <input type="text" name="streetAddress" defaultValue={restaurant.streetAddress ? restaurant.streetAddress : ""} ref={streetAddressRef} className="my-2 bg-transparent border-b-2 outline-none" required/>
                </div>
                <div className="flex justify-center pt-2">
                    <label className="text-lg">Select your town:</label>
                </div>
                <div className="flex justify-center">
                    <select name="town" ref={townRef} className="text-center my-2 bg-transparent border-1">
                        {restaurant.town ? <option value={restaurant.town}>{restaurant.town}</option> : <option value="default">--Your Town--</option>}
                        <option value="Atlantic Beach">Atlantic Beach</option>
                        <option value="Morehead City">Morehead City</option>
                    </select>
                </div>
                <div className="flex justify-center pt-2">
                    <label className="text-lg">Phone Number:</label>
                </div>
                <div className="flex justify-center">
                    <input type="tel" name="phoneNumber" value={number} onChange={e => handleInput(e)} defaultValue={restaurant.phoneNumber} className="text-center my-2 bg-transparent border-b-2" required/>
                </div>
                <div className="flex justify-center">
                    <button className="">Submit</button>
                </div>
            </form>
        </div>
    );
}
 
export default ContactInfo;