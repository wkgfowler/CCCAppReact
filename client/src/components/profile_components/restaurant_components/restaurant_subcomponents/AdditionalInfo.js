import axios from "axios";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";

const AdditionalInfo = ({restaurant, setAdditionalInfoVisible, additionalInfoVisible, alert}) => {
    const [charCount, setCharCount] = useState(0);
    const {RestaurantId} = useParams();
    
    const websiteRef = useRef();
    const facebookRef = useRef();
    const instagramRef = useRef();
    const descriptionRef = useRef();
    const [profileImage, setProfileImage] = useState("");

    const onSubmitForm = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('id', RestaurantId);
        formData.append('websiteURL', websiteRef.current.value);
        formData.append('facebookURL', facebookRef.current.value);
        formData.append('instagramURL', instagramRef.current.value);
        formData.append('description', descriptionRef.current.value);
        if (profileImage !== "") {
            formData.append('noImage', true)
            formData.append('profileImage', profileImage)
        } else {
            formData.append('noImage', false)
        }
        

        axios.post('http://localhost:3000/api/additional_info',  formData, {
            headers: {
                "token" : localStorage.getItem('token')
            }
        })
        .then((response) => {
            console.log(response.data)
            localStorage.setItem("token", response.data.token)
            setAdditionalInfoVisible(!additionalInfoVisible);
            alert.success('Information updated successfully.')
        }, (error) => {
            console.log("SHIT")
            console.log(error)
        })
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        console.log(file)
        setProfileImage(file);
    }
    
    return (
        <div className="flex justify-center">
            <form onSubmit={onSubmitForm}>
                <p className="text-2xl pt-4 pb-2 text-center underline">Additional Information</p>
                <div className="flex flex-col">
                    <div>{restaurant.profileImage !== "null" && profileImage === "" ? <img src={`${process.env.REACT_APP_API_ENDPOINT}/${restaurant.profileImage}`} alt="" className="max-w-sm"/> : <div> {profileImage ? <img src={URL.createObjectURL(profileImage)} alt="" className="max-w-sm"/> : <img src={require('../../../../images/add-image-80.png')} alt=""/>} </div>}</div>
                    <div><label for="profileImage">Upload a profile image for your restaurant</label></div>
                    <div><input type="file" id="profileImage" name="profileImage" size="lg" onChange={handleImageChange}/></div>
                </div>
                
                <div className="flex flex-row justify-around gap-3 py-2">
                    
                    <div className="flex flex-col">
                        <label for="websiteURL">Restaurant's Website:</label>
                        <input type="text" ref={websiteRef} id="websiteURL" name="websiteURL" defaultValue={restaurant.websiteURL ? restaurant.websiteURL : ""} className="rounded"/>
                    </div>
                    <div className="flex flex-col">
                        <label for="facebookURL">Restaurant's Facebook page:</label>
                        <input type="text" ref={facebookRef} id="facebookURL" name="facebookURL" defaultValue={restaurant.facebookURL ? restaurant.facebookURL : ""} className="rounded"/>
                    </div>
                    <div className="flex flex-col">
                        <label for="instagramURL">Restaurant's Instagram page:</label>
                        <input type="text" ref={instagramRef} id="instagramURL" name="instagramURL" defaultValue={restaurant.instagramURL ? restaurant.instagramURL : ""} className="rounded"/>
                    </div>
                </div>
                <div className="flex flex-col py-2">
                    <label for="description">Enter a brief description of your restaurant:</label>
                    <textarea id="description" name="description" ref={descriptionRef} onChange={(e) => setCharCount(e.target.value.length)} rows="5" cols="75" className="rounded-lg bg-white text-black" maxLength="600" defaultValue={restaurant.description ? restaurant.description : ""}></textarea>
                    <p>{charCount} / 600 character limit</p>
                </div>
                <button className="outline outline-2 bg-[#56707E] rounded px-2 py-1 mb-4">Submit</button>
            </form>
        </div>
    );
}
 
export default AdditionalInfo;