import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AllRestaurants = () => {
    const [restaurants, setRestaurants] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getRestaurants()
    }, [])

    const getRestaurants = () => {
        axios.get('http://localhost:3000/allrestaurants')
        .then((response) => {
            setRestaurants(response.data)
        }, (error) => {
            console.log(error)
        })
    }
    return (
        <Fragment>
            <h1>All Restaurants</h1>
            <div>
                {restaurants.map(restaurant => (
                    <div key={restaurant.id}>
                        <Link to={`/restaurants/${restaurant.id}`}>{restaurant.restaurant_name}</Link>
                    </div>
                ))}
            </div>
        </Fragment>
    );
}
 
export default AllRestaurants;