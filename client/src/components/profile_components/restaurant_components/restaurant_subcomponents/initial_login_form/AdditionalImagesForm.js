import axios from 'axios';
import React, { useRef, useState } from 'react'
import { useParams } from 'react-router-dom';

function AdditionalImagesForm({prev, restaurantImages, setRestaurantImages, submit, navigate}) {
    const [addImages, setAddImages] = useState(false);

    const addImagesNow = (e) => {
        e.preventDefault();
        setAddImages(true)
    }

    const addImagesLater = (e) => {
        e.preventDefault();
        navigate("/")
    }

    const inputRef = useRef(null);
    
    const handleImageClick = () => {
        inputRef.current.click();
    }

    const handleImageChange = (event) => {
        setRestaurantImages(Array.from(event.target.files));
    }


  return (
    <div>
        <div className={`${addImages ? "hidden" : "pt-4"}`}>
            <div className="grid grid-col justify-center pl-4 gap-4" onClick={handleImageClick}>
                
                <p className="text-xl">If you would like to at this time, you can add up to nine additional images to your business's page.</p>
                <p className="text-xl">You are also able to do so later.</p>
            </div>
                <div className="flex flex-row justify-evenly py-2 pt-4">
                    <button className="outline outline-2 bg-[#56707E] rounded px-2 py-1" onClick={(e) => addImagesLater(e)}>Later</button>
                    <button className="outline outline-2 bg-[#56707E] rounded px-2 py-1" onClick={(e) => addImagesNow(e)}>Now</button>
                    
                </div> 
        </div>

        <div className={`${addImages ? "pt-4" : "hidden"}`}>
            <div className="grid grid-col justify-center pl-4 gap-4" onClick={handleImageClick}>
                {restaurantImages.length >= 1 ? restaurantImages.map(x => {
                    return (
                        <img src={URL.createObjectURL(x)} alt="" className="w-1/2 h-1/2"/>
                    )
                })
                :
                <img src={require('../../../../../images/add-image-80.png')} alt="" className="h-[110px] w-[110px]"/>}
                <input type="file" size="lg" id="restaurantImages" name="restaurantImages" multiple ref={inputRef} style={{display: "none"}} onChange={handleImageChange}/>
                <p>Add up to nine additional images for your business.</p>
            </div>
                <div className="flex flex-row justify-evenly py-2 pt-4">
                    <button className="outline outline-2 bg-[#56707E] rounded px-2 py-1" onClick={(e) => addImagesLater(e)}>Add later</button>
                    <button className="outline outline-2 bg-[#56707E] rounded px-2 py-1" onClick={(e) => submit(e)}>Submit</button>
                </div> 
        </div>
    </div>
  )
}

export default AdditionalImagesForm