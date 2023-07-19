import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const AddProfileImage = ({restaurant, setProfileImageVisible, profileImageVisible, alert}) => {
    const [profileImage, setProfileImage] = useState("");
    const {RestaurantId} = useParams();
    
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        console.log(file)
        setProfileImage(file);
    }

    const onSubmitForm = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('id', RestaurantId);
        if (profileImage !== "") {
            formData.append('noImage', true)
            formData.append('profileImage', profileImage)
        } else {
            formData.append('noImage', false)
        }

        axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/add_profile_image`, formData, {
            headers: {
                "token" : localStorage.getItem('token')
            }
        })
        .then((response) => {
            console.log(response.data)
            localStorage.setItem("token", response.data.token)
            setProfileImageVisible(!profileImageVisible)
            alert.success('Profile image uploaded')
        }, (error) => {
            console.log(error)
        })
    }

    return (
        <div className="flex justify-center pt-4">
            <form onSubmit={onSubmitForm}>
                <div className="flex flex-col">
                    <div>{restaurant.profileImage !== "null" && profileImage === "" ? <img src={`${process.env.REACT_APP_API_ENDPOINT}/${restaurant.profileImage}`} alt="" className="max-w-sm"/> : <div> {profileImage ? <img src={URL.createObjectURL(profileImage)} alt="" className="max-w-sm"/> : <img src={require('../../../../images/add-image-80.png')} alt=""/>} </div>}</div>
                    <div><label for="profileImage">Upload a profile image for your restaurant</label></div>
                    <div className="pt-2">
                        <input type="file" id="profileImage" name="profileImage" size="lg" onChange={handleImageChange}/>
                    </div>
                </div>
                <button className="outline outline-2 bg-[#56707E] rounded px-2 py-1 mb-4 mt-3">Submit</button>
            </form>
        </div>
    );
}
 
export default AddProfileImage;