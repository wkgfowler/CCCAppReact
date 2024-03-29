import ContactInfo from "./restaurant_subcomponents/ContactInfo";
import HoursForm from "./restaurant_subcomponents/HoursForm";
import { SlArrowDown, SlArrowLeft } from "react-icons/sl"
import { useContext, useEffect, useState } from "react";
import AdditionalInfo from "./restaurant_subcomponents/AdditionalInfo";
import { useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../../context/UserContext";
import { useAlert } from "react-alert";
import AddRestaurantImages from "./restaurant_subcomponents/AddRestaurantImages";
import AddProfileImage from "./restaurant_subcomponents/AddProfileImage";


const EditInfo = () => {
    const [restaurant, setRestaurant] = useState();
    const [valid, setValid] = useState(false);
    const [hoursVisible, setHoursVisible] = useState(false);
    const [infoVisible, setInfoVisible] = useState(false);
    const [profileImageVisible, setProfileImageVisible] = useState(false);
    const [additionalInfoVisible, setAdditionalInfoVisible] = useState(false);
    const [restaurantImagesVisible, setRestaurantImagesVisible] = useState(false);
    const {RestaurantId} = useParams();
    const {user, setUser} = useContext(UserContext);
    const userId = user.id
    const alert = useAlert();

    const config = {
        headers: {"token": localStorage.getItem("token")},
        params: {
            RestaurantId: RestaurantId,
            userId: userId
        }
    }

    const getRestaurant = () => {
        axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/get_restaurant/${RestaurantId}/${userId}`, config)
        .then((response) => {
            console.log(response.data)
            setValid(response.data.valid)
            setRestaurant(response.data.restaurant)
        })
    };
    
    useEffect(() => {
        getRestaurant();
    }, [])

    const hoursVisibility = () => {
        setHoursVisible(!hoursVisible);
        setInfoVisible(false);
        setProfileImageVisible(false);
        setAdditionalInfoVisible(false);
        setRestaurantImagesVisible(false);
    }

    const infoVisibility = () => {
        setInfoVisible(!infoVisible);
        setHoursVisible(false);
        setProfileImageVisible(false);
        setAdditionalInfoVisible(false);
        setRestaurantImagesVisible(false);
    }

    const profileImageVisibility = () => {
        setProfileImageVisible(!profileImageVisible);
        setInfoVisible(false);
        setHoursVisible(false);
        setAdditionalInfoVisible(false);
        setRestaurantImagesVisible(false)
    }

    const additionalInfoVisibility = () => {
        setAdditionalInfoVisible(!additionalInfoVisible);
        setHoursVisible(false);
        setProfileImageVisible(false);
        setInfoVisible(false);
        setRestaurantImagesVisible(false);
    }

    const restaurantImagesVisiblity = () => {
        setRestaurantImagesVisible(!restaurantImagesVisible);
        setHoursVisible(false);
        setProfileImageVisible(false);
        setInfoVisible(false);
        setAdditionalInfoVisible(false);
    }


    if (valid) {
        return (
            <div className="container">
                <div className="justify-center flex">

                <div className="flex justify-center pt-3">
                    <div className="w-1/12"></div>
                    <div className="w-5/6 border-2 group bg-[#56707E] rounded flex flex-row text-white">
                        <div className="w-1/4">
                            <img src={require("../../../images/_edit.jpg")} alt="" className="max-h-fit"/>
                        </div>
                        <div className="w-3/4">
                            <div className="flex justify-center">
                                <p className="text-3xl">Select a form below:</p>
                            </div>
                            <div className="flex flex-row justify-center gap-4">
                                <p className={`${hoursVisible ? "font-bold underline" : ""} cursor-pointer text-lg`} onClick={hoursVisibility}>Hours</p>
                                <p className={`${infoVisible ? "font-bold underline" : ""} cursor-pointer text-lg`} onClick={infoVisibility}>Contact Info</p>
                                <p className={`${profileImageVisible ? "font-bold underline" : ""} cursor-pointer text-lg`} onClick={profileImageVisibility}>Add Profile Image</p>
                                <p className={`${additionalInfoVisible ? "font-bold underline" : ""} cursor-pointer text-lg`} onClick={additionalInfoVisibility}>Additional Info</p>
                                <p className={`${restaurantImagesVisible ? "font-bold underline" : ""} cursor-pointer text-lg`} onClick={restaurantImagesVisiblity}>Add Additional Images</p>
                            </div>

                            <div className={`${hoursVisible ? "flex justify-center" : "hidden"}`}>
                                <HoursForm restaurant={restaurant} setHoursVisible={setHoursVisible} hoursVisible={hoursVisible} alert={alert}/>
                            </div>

                            <div className={`${infoVisible ? "flex justify-center" : "hidden"}`}>
                                <ContactInfo restaurant={restaurant} setInfoVisible={setInfoVisible} infoVisible={infoVisible} alert={alert}/>
                            </div>

                            <div className={`${profileImageVisible ? "flex justify-center" : "hidden"}`}>
                                <AddProfileImage restaurant={restaurant} setProfileImageVisible={setProfileImageVisible} profileImageVisible={profileImageVisible} alert={alert}/>
                            </div>

                            <div className={`${additionalInfoVisible ? "flex justify-center" : "hidden"}`}>
                                <AdditionalInfo restaurant={restaurant} setAdditionalInfoVisible={setAdditionalInfoVisible} additionalInfoVisible={additionalInfoVisible} alert={alert}/>
                            </div>

                            <div className={`${restaurantImagesVisible ? "flex justify-center" : "hidden"}`}>
                                <AddRestaurantImages restaurant={restaurant} setRestaurantImagesVisible={setRestaurantImagesVisible} restaurantImagesVisible={restaurantImagesVisible} alert={alert} getRestaurant={getRestaurant}/>
                            </div>

                        </div>
                    </div>
                    <div className="w-1/12"></div>
                </div>

                    {/* <div className="justify-center basis-2/3">
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
                    </div> */}
                
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