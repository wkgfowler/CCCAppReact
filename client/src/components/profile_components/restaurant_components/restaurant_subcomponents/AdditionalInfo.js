import axios from "axios";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";

const AdditionalInfo = ({restaurant, setAdditionalInfoVisible, additionalInfoVisible, alert}) => {
    const [charCount, setCharCount] = useState(restaurant.description.length);
    const {RestaurantId} = useParams();

    const websiteRef = useRef();
    const facebookRef = useRef();
    const instagramRef = useRef();
    const descriptionRef = useRef();

    const onSubmitForm = async (e) => {
        e.preventDefault();

        axios.post('http://localhost:3000/api/additional_info',  {
            id: RestaurantId,
            websiteURL: websiteRef.current.value,
            facebookURL: facebookRef.current.value,
            instagramURL: instagramRef.current.value,
            description: descriptionRef.current.value
        }, {
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
    
    return (
        <div className="flex justify-center pt-4">
            <form onSubmit={onSubmitForm}>
                
                <div className="flex flex-row justify-around gap-3 py-2">
                    
                    <div className="flex flex-col">
                        <label for="websiteURL">Restaurant's Website:</label>
                        <input type="text" ref={websiteRef} id="websiteURL" name="websiteURL" defaultValue={restaurant.websiteURL ? restaurant.websiteURL : ""} className="rounded text-black"/>
                    </div>
                    <div className="flex flex-col">
                        <label for="facebookURL">Restaurant's Facebook page:</label>
                        <input type="text" ref={facebookRef} id="facebookURL" name="facebookURL" defaultValue={restaurant.facebookURL ? restaurant.facebookURL : ""} className="rounded text-black"/>
                    </div>
                    <div className="flex flex-col">
                        <label for="instagramURL">Restaurant's Instagram page:</label>
                        <input type="text" ref={instagramRef} id="instagramURL" name="instagramURL" defaultValue={restaurant.instagramURL ? restaurant.instagramURL : ""} className="rounded text-black"/>
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