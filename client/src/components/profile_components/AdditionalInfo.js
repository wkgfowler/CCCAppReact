import axios from "axios";
import { useContext, useRef, useState } from "react";
import { UserContext } from "../../context/UserContext";
import Checkbox from "../subcomponents/Checkbox";
import { useParams } from "react-router-dom";

const AdditionalInfo = () => {
    const {user, setUser} = useContext(UserContext);
    const [charCount, setCharCount] = useState(0);
    const {restaurantId} = useParams();
    const userId = user.id;
    
    const websiteRef = useRef();
    const facebookRef = useRef();
    const instagramRef = useRef();
    const descriptionRef = useRef();

    const config = {
        headers: {"token": localStorage.getItem("token")},
        params: {
            restaurantId: restaurantId,
            userId: userId
        }
    }

    const onSubmitForm = async (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/api/additional_info',  {
            id: restaurantId,
            website_url: websiteRef.current.value,
            facebook_url: facebookRef.current.value,
            instagram_url: instagramRef.current.value,
            description: descriptionRef.current.value
        }, {
            headers: {
                "token" : localStorage.getItem('token')
            }
        })
        .then((response) => {
            console.log(response.data)
            localStorage.setItem("token", response.data.token)
        }, (error) => {
            console.log("SHIT")
            console.log(error)
        })
    };
    
    return (
        <div className="flex justify-center">
            <form onSubmit={onSubmitForm}>
                <p className="text-2xl pt-4 pb-2 text-center underline">Additional Information</p>
                <div className="grid grid-cols-3 space-x-5">
                    <div className="grid grid-rows-2">
                        <label for="website_url">Restaurant's Website:</label>
                        <input type="text" ref={websiteRef} id="website_url" name="website_url"/>
                    </div>
                    <div className="grid grid-rows-2">
                        <label for="facebook_url">Restaurant's Facebook page:</label>
                        <input type="text" ref={facebookRef} id="facebook_url" name="facebook_url"/>
                    </div>
                    <div className="grid grid-rows-2">
                        <label for="instagram_url">Restaurant's Instagram page:</label>
                        <input type="text" ref={instagramRef} id="instagram_url" name="instagram_url"/>
                    </div>
                </div>
                <div className="grid grid-cols-1">
                    <label for="description">Enter a brief description of your restaurant:</label>
                    <textarea id="description" name="description" ref={descriptionRef} onChange={(e) => setCharCount(e.target.value.length)} rows="5" cols="75" className="rounded-lg bg-slate-200" maxLength="600"></textarea>
                    <p>{charCount} / 600 character limit</p>
                </div>
                <button>Submit</button>
            </form>
        </div>
    );
}
 
export default AdditionalInfo;