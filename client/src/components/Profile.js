import axios from "axios";
import { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PermissionContext } from "../context/PermissionContext";
import { UserContext } from "../context/UserContext";
import Admin from "./admin_components/Admin";
import AdditionalInfo from "./profile_components/AdditionalInfo";

const Profile = () => {
    const [valid, isValid] = useState(true)
    const {user, setUser} = useContext(UserContext)
    const {permission, setPermission} = useContext(PermissionContext)

    const [userRestaurants, setUserRestaurants] = useState([]);

    const config = {
        headers: {"token": localStorage.getItem("token")},
        params: {
            id: user.id
        }
    };
    
    const loadUser = () => {
        axios.get(`http://localhost:3000/api/${user.id}`, config)
        .then((response) => {
            // console.log(response.data)
            console.log(user.Restaurants)
            setUserRestaurants(user.Restaurants)
            console.log(userRestaurants)
            localStorage.setItem("token", response.data.token.token)
            isValid(true)
        }, (error) => {
            console.log(error)
        })};

    useEffect(() => {
        loadUser();
    }, [])

    if (valid) {
        if (user && permission === 1) {
            return (
                <div>
                    <h1>Basic User Page</h1>
                    <h1>{user.email}</h1>
                </div>
            )
        } else if (user && permission === 2) {
            return (
                <div className="flex justify-center">
                    <table className="w-1/2">
                        <thead>
                            <th>{user.Restaurants.length > 1 ? <p className="text-3xl">Your Restaurants:</p> : <p className="text-3xl">Your restaurant</p>}</th>
                            <th></th>
                        </thead>
                        <tbody>
                            {user.Restaurants.map(x => (
                                <tr key={x.id}>
                                    <td><p className="text-2xl">{x.restaurant_name}</p></td>
                                    <td><button className="border border-white p-2 rounded-lg"><Link to={`/restaurants/${x.id}`}>View restaurant page</Link></button></td>
                                    <td><button className="border border-white p-2 rounded-lg"><Link to={`/edit/${x.id}`}>Edit Restaurant</Link></button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                </div>
            )
        } else if (user && permission === 3) {
            return (
                <div>
                    <h1>Admin Page</h1>
                    <Admin/>
                </div>
            )
        } else {
            return (
                <div>
                    <h1>Not Authorized</h1>
                </div>
            )
        }
    } else {
        return (
            <div>
                <h1>Not Authorized</h1>
            </div>
        )
    }
}
 
export default Profile;