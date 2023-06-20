import axios from 'axios';
import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

const AddRestaurantImages = ({restaurant, setRestaurantImagesVisible, restaurantImagesVisible, alert}) => {
    const {RestaurantId} = useParams();
    const [restaurantImages, setRestaurantImages] = useState([]);
    const inputRef = useRef(null);
    
    const handleMenuClick = () => {
        inputRef.current.click();
    }

    const handleMenuChange = (event) => {
        setRestaurantImages(Array.from(event.target.files));
    }

    const onSubmitForm = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("RestaurantId", RestaurantId);
        restaurantImages.forEach((file) => {
            formData.append("restaurantImages", file)
        });
        axios.post("http://localhost:3000/api/add_restaurant_image", formData, {
            headers: {
                "token" : localStorage.getItem("token")
            }
        })
        .then(() => {
            setRestaurantImagesVisible(!restaurantImagesVisible);
            alert.success("Images uploaded successfully.")
        }, (error) => {
            console.log(error)
        })
    }
    
    return (
        <div className="flex justify-center">
            <form onSubmit={onSubmitForm}>
            <p className="text-2xl pt-4 pb-2 text-center underline">Add Images</p>
            <div className="flex flex-col justify-start pl-4 gap-4" onClick={handleMenuClick}>
                    {restaurantImages.length >= 1 ? restaurantImages.map(x => {
                        return (
                            <img src={URL.createObjectURL(x)} alt="" className="w-1/2 h-1/2"/>
                        )
                    }) : <img src={require('../../../../images/add-image-80.png')} alt=""/>}
                    <input type="file" size="lg" id="restaurantImages" name="restaurantImages" multiple ref={inputRef} style={{display: "none"}} onChange={handleMenuChange}/>
                </div>

                <div className="flex justify-start">
                    <button className="outline outline-2 bg-[#56707E] text-white rounded px-2 py-1 mt-2 mb-2">Submit</button>
                </div>
            </form>
        </div>
    );
}
 
export default AddRestaurantImages;