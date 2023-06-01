import ContactInfo from "./restaurant_subcomponents/ContactInfo";
import HoursForm from "./restaurant_subcomponents/HoursForm";
import { SlArrowDown, SlArrowLeft } from "react-icons/sl"
import { useContext, useEffect, useState } from "react";
import AdditionalInfo from "./restaurant_subcomponents/AdditionalInfo";
import { useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../../context/UserContext";
import { useAlert } from "react-alert";


const EditInfo = () => {
    const [restaurant, setRestaurant] = useState();
    const [valid, setValid] = useState(false);
    const [hoursVisible, setHoursVisible] = useState(false);
    const [infoVisible, setInfoVisible] = useState(false);
    const [additionalInfoVisible, setAdditionalInfoVisible] = useState(false);
    const {restaurantId} = useParams();
    const {user, setUser} = useContext(UserContext);
    const userId = user.id
    const alert = useAlert();

    const config = {
        headers: {"token": localStorage.getItem("token")},
        params: {
            restaurantId: restaurantId,
            userId: userId
        }
    }

    const getRestaurant = () => {
        axios.get(`http://localhost:3000/api/get_restaurant/${restaurantId}/${userId}`, config)
        .then((response) => {
            setValid(response.data.valid)
            setRestaurant(response.data.restaurant)
        })
    };
    
    useEffect(() => {
        getRestaurant();
    }, [])

    const hoursVisibility = () => {
        setHoursVisible(!hoursVisible)
    }

    const infoVisibility = () => {
        setInfoVisible(!infoVisible)
    }

    const additionalInfoVisibility = () => {
        setAdditionalInfoVisible(!additionalInfoVisible)
    }


    if (valid) {
        return (
            <div className="container">
                <div className="justify-center flex">

                    <div className="justify-center basis-2/3">
                        <div className="border-b-2 pb-2">
                            <div className="pt-5 flex justify-center">
                                <button className="w-full cursor-pointer" onClick={hoursVisibility}>
                                    <div className="flex justify-evenly">
                                        <p className="text-3xl">Edit Hours</p>
                                        {!hoursVisible ? <SlArrowLeft className="text-2xl"/> : <SlArrowDown className="text-2xl"/>}
                                    </div>
                                </button>
                            </div>
                            <div className={`${hoursVisible ? "flex justify-center" : "hidden"}`}>
                                <HoursForm restaurant={restaurant} setHoursVisible={setHoursVisible} hoursVisible={hoursVisible} alert={alert}/>
                            </div>
                        </div>

                        <div className="border-b-2 pb-2">
                            <div className="pt-4 flex justify-center">
                                <button className="w-full cursor-pointer" onClick={infoVisibility}>
                                    <div className="flex justify-evenly">
                                        <p className="text-3xl">Edit Contact Info</p>
                                        {!infoVisible ? <SlArrowLeft className="text-2xl"/> : <SlArrowDown className="text-2xl"/>}
                                    </div>
                                </button>
                            </div>
                            <div className={`${infoVisible ? "flex justify-center" : "hidden"}`}>
                                <ContactInfo restaurant={restaurant} setInfoVisible={setInfoVisible} infoVisible={infoVisible} alert={alert}/>
                            </div>
                        </div>

                        <div className="border-b-2 pb-2">
                            <div className="pt-4 flex justify-center">
                                <button className="w-full cursor-pointer" onClick={additionalInfoVisibility}>
                                    <div className="flex justify-evenly">
                                        <p className="text-3xl">Edit Additional Info</p>
                                        {!additionalInfoVisible ? <SlArrowLeft className="text-2xl"/> : <SlArrowDown className="text-2xl"/>}
                                    </div>
                                </button>
                            </div>
                            <div className={`${additionalInfoVisible ? "flex justify-center" : "hidden"}`}>
                                <AdditionalInfo restaurant={restaurant} setAdditionalInfoVisible={setAdditionalInfoVisible} additionalInfoVisible={additionalInfoVisible} alert={alert}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="justify-center flex">
                <p className="text-4xl">Not authorized</p>
            </div>
        )
    }
    
}

export default EditInfo;