import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const ContactInfo = () => {
    const {user, setUser} = useContext(UserContext)
    const [number, setNumber] = useState("")
    const {restaurantId} = useParams();
    const userId = user.id;
    const [restaurantInfo, setRestaurantInfo] = useState({})

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

    const config = {
        headers: {"token": localStorage.getItem("token")},
        params: {
            restaurantId: restaurantId,
            userId: user.id
        }
    }

    const getContactInfo = () => {
        axios.get(`http://localhost:3000/api/get_contact_info/${restaurantId}/${userId}`, config)
        .then((response) => {
            console.log(response.data)
            setRestaurantInfo(response.data)
        }, (error) => {
            console.log(error)
        })
    };

    useEffect(() => {
        getContactInfo();
    }, [])

    const onSubmitForm = async (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/api/contact_info', {
            id: restaurantId,
            street_address: streetAddressRef.current.value,
            town: townRef.current.value,
            phone_number: number
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
                    <input type="text" name="streetAddress" value={restaurantInfo.street_address ? restaurantInfo.street_address : ""} ref={streetAddressRef} className="my-2 bg-transparent border-b-2 outline-none" required/>
                </div>
                <div className="flex justify-center pt-2">
                    <label className="text-lg">Select your town:</label>
                </div>
                <div className="flex justify-center">
                    <select name="town" ref={townRef} className="text-center my-2 bg-transparent border-1">
                        {restaurantInfo.town ? <option value={restaurantInfo.town}>{restaurantInfo.town}</option> : <option value="default">--Your Town--</option>}
                        <option value="Atlantic Beach">Atlantic Beach</option>
                        <option value="Morehead City">Morehead City</option>
                    </select>
                </div>
                <div className="flex justify-center pt-2">
                    <label className="text-lg">Phone Number:</label>
                </div>
                <div className="flex justify-center">
                    <input type="tel" name="phone_number" value={restaurantInfo.phone_number ? restaurantInfo.phone_number : number} onChange={e => handleInput(e)} className="text-center my-2 bg-transparent border-b-2" required/>
                </div>
                <div className="flex justify-center">
                    <button className="">Submit</button>
                </div>
            </form>
        </div>
    );
}
 
export default ContactInfo;