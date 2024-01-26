import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FollowedMenu from "./basicUser_subcomponents/FollowedMenu";

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
            setFollowedRestaurants(response.data)
        }, (error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        loadProfile();
    }, [])

    return (
        <div>
            <div className="flex flex-col container">
                <p className="text-2xl font-bold">Followed Businesses</p>
                {followedRestaurants.length >= 1 ? followedRestaurants.map(restaurant => (
                    <div className="" key={restaurant.id}>
                        <Link to={`/restaurants/${restaurant.id}`}>{restaurant.restaurantName}</Link>
                        <FollowedMenu restaurant={restaurant}/>
                    </div>)) 
                : 
                    <div>
                        <p className="text-xl text-center">Any restaurants you follow will be displayed here for quicker access.</p>
                    </div>}   
            </div>
            
            
        </div>
    );
}
 
export default BasicUser;