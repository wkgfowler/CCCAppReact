import React, { useRef, useState } from 'react';
import { RxDot, RxDotFilled } from 'react-icons/rx';
import BasicInformationForm from './BasicInformationForm';
import InitialHoursForm from './InitialHoursForm';
import ProfileImageForm from './ProfileImageForm';
import AdditionalImagesForm from './AdditionalImagesForm';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAlert } from "react-alert";

const InformationForm = () => {
    const {RestaurantId} = useParams();
    const alert = useAlert();
    const navigate = useNavigate();

    // Basic Information Form data
    const streetAddressRef = useRef();
    const townRef = useRef();
    const [number, setNumber] = useState("");
    const websiteRef = useRef();
    const facebookRef = useRef();
    const instagramRef = useRef();
    const descriptionRef = useRef();

    // Initial Hours Form data
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

    // Profile Image Form data
    const [profileImage, setProfileImage] = useState("");

    // Additional Images Form data
    const [restaurantImages, setRestaurantImages] = useState([]);

    // declaring form data
    
    // submitting initial data
    const onSubmitInitialForm = async (e) => {
        e.preventDefault();
        let filteredMeals = [...new Set(mealsOffered)]

        const formData = new FormData();
        formData.append("id", RestaurantId)

        formData.append('streetAddress', streetAddressRef.current.value)
        formData.append('town', townRef.current.value)
        formData.append('phoneNumber', number)
        formData.append('websiteURL', websiteRef.current.value)
        formData.append('facebookURL', facebookRef.current.value)
        formData.append('instagramURL', instagramRef.current.value)
        formData.append('description', descriptionRef.current.value)
        // formData.append('mealTimes', filteredMeals)
        formData.append('sundayOpen', sundayOpenRef.current.value)
        formData.append('sundayClose', sundayCloseRef.current.value)
        formData.append('mondayOpen', mondayOpenRef.current.value)
        formData.append('mondayClose', mondayCloseRef.current.value)
        formData.append('tuesdayOpen', tuesdayOpenRef.current.value)
        formData.append('tuesdayClose', tuesdayCloseRef.current.value)
        formData.append('wednesdayOpen', wednesdayOpenRef.current.value)
        formData.append('wednesdayClose', wednesdayCloseRef.current.value)
        formData.append('thursdayOpen', thursdayOpenRef.current.value)
        formData.append('thursdayClose', thursdayCloseRef.current.value)
        formData.append('fridayOpen', fridayOpenRef.current.value)
        formData.append('fridayClose', fridayCloseRef.current.value)
        formData.append('saturdayOpen', saturdayOpenRef.current.value)
        formData.append('saturdayClose', saturdayCloseRef.current.value)
        formData.append('profileImage', profileImage)

        filteredMeals.forEach((meal) => {
            formData.append('mealTimes', meal)
        })

        for(var pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
          }
        axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/initial_info`, formData, {
            headers: {
                "token" : localStorage.getItem("token")
            }
        })
        .then((response) => {
            console.log(response.data)
            alert.success('Information submitted successfully.')
            setCurrentForm("AdditionalImagesForm")
        }, (error) => {
            console.log(error)
        })
    }

    // submitting additional photos
    const onSubmitImagesForm = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("RestaurantId", RestaurantId);
        restaurantImages.forEach((file) => {
            formData.append("restaurantImages", file)
        });
        axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/add_restaurant_image`, formData, {
            headers: {
                "token" : localStorage.getItem("token")
            }
        })
        .then(() => {
            alert.success("Images uploaded successfully.")
            navigate("/")
        }, (error) => {
            console.log(error)
            alert.error("Error uploading image.")
        })
    }

    const [currentForm, setCurrentForm] = useState("BasicInformationForm");

    const basicInformationFormNext = (e) => {
        e.preventDefault();
        setCurrentForm("InitialHoursForm")
    }

    const initialHoursFormPrevious = (e) => {
        e.preventDefault();
        setCurrentForm("BasicInformationForm")
    }

    const initialHoursFormNext = (e) => {
        e.preventDefault();
        setCurrentForm("ProfileImageForm")
    }

    const initialProfileFormNext = (e) => {
        e.preventDefault();
        setCurrentForm("AdditionalImagesForm")
    }

    const initialProfileFormPrevious = (e) => {
        e.preventDefault();
        setCurrentForm("InitialHoursForm")
    }

    const additionalImagesFormPrevious = (e) => {
        e.preventDefault();
        setCurrentForm("ProfileImageForm")
    }

  return (
    <div>
        <p className="text-2xl text-center font-bold">Information Form</p>
        <p className="text-center">Please fill out the following information in order to activate your restaurant's account.</p>
            <div className="flex justify-center">
                <form className="bg-[#56707E] text-white p-4">
                    <div className="flex flex-row justify-center">
                        <p className={`cursor-pointer ${currentForm==="BasicInformationForm" ? "font-bold text-xl" : ""}`} onClick={() => setCurrentForm("BasicInformationForm")}>Basic Information</p>
                        {currentForm==="InitialHoursForm" ? <p className="pt-1 text-xl"><RxDotFilled /></p> : <p className="pt-1 text-lg"><RxDot /></p>}
                        {currentForm==="InitialHoursForm" ? <p className="pt-1 text-xl"><RxDotFilled /></p> : <p className="pt-1 text-lg"><RxDot /></p>}
                        {currentForm==="InitialHoursForm" ? <p className="pt-1 text-xl"><RxDotFilled /></p> : <p className="pt-1 text-lg"><RxDot /></p>}
                        <p className={`cursor-pointer ${currentForm==="InitialHoursForm" ? "font-bold text-xl" : ""}`} onClick={() => setCurrentForm("InitialHoursForm")}>Hours</p>
                        {currentForm==="ProfileImageForm" ? <p className="pt-1 text-xl"><RxDotFilled /></p> : <p className="pt-1 text-lg"><RxDot /></p>}
                        {currentForm==="ProfileImageForm" ? <p className="pt-1 text-xl"><RxDotFilled /></p> : <p className="pt-1 text-lg"><RxDot /></p>}
                        {currentForm==="ProfileImageForm" ? <p className="pt-1 text-xl"><RxDotFilled /></p> : <p className="pt-1 text-lg"><RxDot /></p>}
                        <p className={`cursor-pointer ${currentForm==="ProfileImageForm" ? "font-bold text-xl" : ""}`} onClick={() => setCurrentForm("ProfileImageForm")}>Profile Image</p>
                        {currentForm==="AdditionalImagesForm" ? <p className="pt-1 text-xl"><RxDotFilled /></p> : <p className="pt-1 text-lg"><RxDot /></p>}
                        {currentForm==="AdditionalImagesForm" ? <p className="pt-1 text-xl"><RxDotFilled /></p> : <p className="pt-1 text-lg"><RxDot /></p>}
                        {currentForm==="AdditionalImagesForm" ? <p className="pt-1 text-xl"><RxDotFilled /></p> : <p className="pt-1 text-lg"><RxDot /></p>}
                        <p className={`cursor-pointer ${currentForm==="AdditionalImagesForm" ? "font-bold text-xl" : ""}`} onClick={() => setCurrentForm("AdditionalImagesForm")}>Additional Images</p>
                    </div>
                    
                    <div className={`${currentForm==="BasicInformationForm" ? "" : "hidden"}`}>
                        <BasicInformationForm
                        next={basicInformationFormNext}
                        number={number}
                        setNumber={setNumber}
                        streetAddressRef={streetAddressRef}
                        townRef={townRef}
                        websiteRef={websiteRef}
                        facebookRef={facebookRef}
                        instagramRef={instagramRef}
                        descriptionRef={descriptionRef}
                        />
                    </div>
                    
                    <div className={`${currentForm==="InitialHoursForm" ? "" : "hidden"}`}>
                        <InitialHoursForm 
                        prev={initialHoursFormPrevious}
                        next={initialHoursFormNext}
                        mealsOffered={mealsOffered}
                        setMealsOffered={setMealsOffered}
                        mondayOpenRef={mondayOpenRef}
                        mondayCloseRef={mondayCloseRef}
                        tuesdayOpenRef={tuesdayOpenRef}
                        tuesdayCloseRef={tuesdayCloseRef}
                        wednesdayOpenRef={wednesdayOpenRef}
                        wednesdayCloseRef={wednesdayCloseRef}
                        thursdayOpenRef={thursdayOpenRef}
                        thursdayCloseRef={thursdayCloseRef}
                        fridayOpenRef={fridayOpenRef}
                        fridayCloseRef={fridayCloseRef}
                        saturdayOpenRef={saturdayOpenRef}
                        saturdayCloseRef={saturdayCloseRef}
                        sundayOpenRef={sundayOpenRef}
                        sundayCloseRef={sundayCloseRef}
                        />
                    </div>

                    <div className={`${currentForm==="ProfileImageForm" ? "" : "hidden"}`}>
                        <ProfileImageForm
                        prev={initialProfileFormPrevious}
                        next={initialProfileFormNext}
                        profileImage={profileImage}
                        setProfileImage={setProfileImage}
                        submit={onSubmitInitialForm}
                        />
                    </div>

                    <div className={`${currentForm==="AdditionalImagesForm" ? "" : "hidden"}`}>
                        <AdditionalImagesForm
                        prev={additionalImagesFormPrevious}
                        restaurantImages={restaurantImages}
                        setRestaurantImages={setRestaurantImages}
                        submit={onSubmitImagesForm}
                        navigate={navigate}
                        />
                    </div>
                    

                    {/* {currentForm==="BasicInformationForm" && <BasicInformationForm
                    next={basicInformationFormNext}
                    number={number}
                    setNumber={setNumber}
                    streetAddressRef={streetAddressRef}
                    townRef={townRef}
                    websiteRef={websiteRef}
                    facebookRef={facebookRef}
                    instagramRef={instagramRef}
                    descriptionRef={descriptionRef}
                    formData={formData}
                    />}

                    {currentForm==="InitialHoursForm" && <InitialHoursForm 
                    prev={initialHoursFormPrevious}
                    next={initialHoursFormNext}
                    mealsOffered={mealsOffered}
                    setMealsOffered={setMealsOffered}
                    mondayOpenRef={mondayOpenRef}
                    mondayCloseRef={mondayCloseRef}
                    tuesdayOpenRef={tuesdayOpenRef}
                    tuesdayCloseRef={tuesdayCloseRef}
                    wednesdayOpenRef={wednesdayOpenRef}
                    wednesdayCloseRef={wednesdayCloseRef}
                    thursdayOpenRef={thursdayOpenRef}
                    thursdayCloseRef={thursdayCloseRef}
                    fridayOpenRef={fridayOpenRef}
                    fridayCloseRef={fridayCloseRef}
                    saturdayOpenRef={saturdayOpenRef}
                    saturdayCloseRef={saturdayCloseRef}
                    sundayOpenRef={sundayOpenRef}
                    sundayCloseRef={sundayCloseRef}
                    formData={formData}
                    />}

                    {currentForm==="ProfileImageForm" && <ProfileImageForm
                    prev={initialProfileFormPrevious}
                    next={initialProfileFormNext}
                    profileImage={profileImage}
                    setProfileImage={setProfileImage}
                    formData={formData}
                    />}

                    {currentForm==="AdditionalImagesForm" && <AdditionalImagesForm
                    prev={additionalImagesFormPrevious}
                    restaurantImages={restaurantImages}
                    setRestaurantImages={setRestaurantImages}
                    formData={formData}
                    submit={onSubmitForm}
                    />} */}
                </form>
            </div>
    </div>
  )
}

export default InformationForm