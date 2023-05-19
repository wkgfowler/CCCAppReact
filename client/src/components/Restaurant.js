import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Map from "./profile_components/restaurant_components/restaurant_subcomponents/Map";

const Restaurant = () => {
    const [valid, setValid] = useState(true);
    const [restaurant, setRestaurant] = useState("")

    const {id} = useParams()

    useEffect(() => {
        validRestaurant()
    }, [])

    const validRestaurant = () => {
        axios.get(`http://localhost:3000/restaurants/${id}`, { params: {
            id
        }
        })
        .then((response) => {
            setValid(response.data)
            setRestaurant(response.data.restaurant)
        }, (error) => {
            console.log(error)
        })
    };

    return (
        <Fragment>
            {valid ? (
                <div>
                    <h1>{restaurant.restaurantName}</h1>
                    <div>
                        <p>Map area</p>
                        <Map restaurant={restaurant}/>
                    </div>
                    
                </div>
                
            ) : (
                <h1>Try again</h1>
            )}
        </Fragment>
    );
}
 
export default Restaurant;