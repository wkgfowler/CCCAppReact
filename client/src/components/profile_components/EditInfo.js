import ContactInfo from "./ContactInfo";
import HoursForm from "./HoursForm";
import { SlArrowDown, SlArrowLeft } from "react-icons/sl"
import { useState } from "react";
import AdditionalInfo from "./AdditionalInfo";
import { useParams } from "react-router-dom";
import axios from "axios";


const EditInfo = () => {
    const [hoursVisible, setHoursVisible] = useState(false);
    const [infoVisible, setInfoVisible] = useState(false);
    const [additionalInfoVisible, setAdditionalInfoVisible] = useState(false);
    const {restaurantId} = useParams();

    const getRestaurant = () => {
        axios.get(`http://localhost:3000/api/get_restaurant/${restaurantId}`)
    }

    const hoursVisibility = () => {
        setHoursVisible(!hoursVisible)
    }

    const infoVisibility = () => {
        setInfoVisible(!infoVisible)
    }

    const additionalInfoVisibility = () => {
        setAdditionalInfoVisible(!additionalInfoVisible)
    }


    return (
        <div className="justify-center flex">
            
            <div className="justify-center w-1/2">
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
                        <HoursForm />
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
                        <ContactInfo />
                    </div>
                </div>
                
                <div className="border-b-2 pb-2">
                    <div className="pt-4 flex justify-center">
                        <button className="w-full cursor-pointer" onClick={additionalInfoVisibility}>
                            <div className="flex justify-evenly">
                                <p className="text-3xl">Edit Additional Info</p>
                                {!infoVisible ? <SlArrowLeft className="text-2xl"/> : <SlArrowDown className="text-2xl"/>}
                            </div>
                        </button>
                    </div>
                    <div className={`${additionalInfoVisible ? "flex justify-center" : "hidden"}`}>
                        <AdditionalInfo />
                    </div>
                </div>
            </div>

                
            
        </div>
    )
}

export default EditInfo;