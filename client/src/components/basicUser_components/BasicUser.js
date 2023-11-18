import axios from "axios";
import { useEffect, useState } from "react";

const BasicUser = ({user}) => {

    const [followedRestaurants, setFollowedRestaurants] = useState([]);

    const config = {
        headers: {"token": localStorage.getItem("token")},
        params: {
            id: user.id
        }
    };

    const loadProfile = () => {
        axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/user/followed_restaurants/${user.id}`, config)
        .then((response) => {
            console.log(response.data)
            // setFollowedRestaurants(response.data)
        }, (error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        loadProfile();
    }, [])

    return (
        <div>
            <h1>Basic User Page</h1>
            <h1>{user.email}</h1>
            
            {/* {followedRestaurants.map(restaurant => (
                <div key={restaurant.id}>
                    <p>{restaurant.restaurantName}</p>
                </div>
            ))} */}
            
        </div>
    );
}
 
export default BasicUser;