import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
                <h1>{restaurant.restaurant_name}</h1>
            ) : (
                <h1>Try again</h1>
            )}
        </Fragment>
    );
}
 
export default Restaurant;