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
        formData.append('profileImage', profileImage)

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
                    <div>{restaurant.profileImage !== "null" && profileImage === "" ? <img src={`http://localhost:3000/${restaurant.profileImage}`} alt="" /> : <div> {profileImage ? <img src={URL.createObjectURL(profileImage)} alt=""/> : <img src={require('../../../../images/add-image-80.png')} alt=""/>} </div>}</div>
                    <div><label for="profileImage">Upload a profile image for your restaurant</label></div>
                    <div><input type="file" id="profileImage" name="profileImage" size="lg" onChange={handleImageChange}/></div>
                </div>
                
                <div className="flex flex-row justify-around gap-3">
                    
                    <div className="flex flex-col">
                        <label for="websiteURL">Restaurant's Website:</label>
                        <input type="text" ref={websiteRef} id="websiteURL" name="websiteURL" defaultValue={restaurant.websiteURL ? restaurant.websiteURL : ""}/>
                    </div>
                    <div className="flex flex-col">
                        <label for="facebookURL">Restaurant's Facebook page:</label>
                        <input type="text" ref={facebookRef} id="facebookURL" name="facebookURL" defaultValue={restaurant.facebookURL ? restaurant.facebookURL : ""}/>
                    </div>
                    <div className="flex flex-col">
                        <label for="instagramURL">Restaurant's Instagram page:</label>
                        <input type="text" ref={instagramRef} id="instagramURL" name="instagramURL" defaultValue={restaurant.instagramURL ? restaurant.instagramURL : ""}/>
                    </div>
                </div>
                <div className="flex flex-col">
                    <label for="description">Enter a brief description of your restaurant:</label>
                    <textarea id="description" name="description" ref={descriptionRef} onChange={(e) => setCharCount(e.target.value.length)} rows="5" cols="75" className="rounded-lg bg-slate-200" maxLength="600" defaultValue={restaurant.description ? restaurant.description : ""}></textarea>
                    <p>{charCount} / 600 character limit</p>
                </div>
                <button className="outline outline-2 outline-blue-600 bg-blue-500 rounded px-2 py-1">Submit</button>
            </form>
        </div>
    );
}
 
export default AdditionalInfo;