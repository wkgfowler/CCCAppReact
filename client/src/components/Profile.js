import axios from "axios";
import { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PermissionContext } from "../context/PermissionContext";
import { UserContext } from "../context/UserContext";
import Admin from "./admin_components/Admin";
import BasicUser from "./basicUser_components/BasicUser";

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
        // console.log(user)
        // console.log(permission)
        axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/${user.id}`, config)
        .then((response) => {
            console.log(response.data.user.Restaurants)
            setUserRestaurants(response.data.user.Restaurants)
            isValid(true)
        }, (error) => {
            console.log(error)
        })};

    useEffect(() => {
        loadUser();
    }, [user, permission])


    if (valid) {
        if (user && permission === 1) {
            return (
                <BasicUser user={user}/>
            )
        } else if (user && permission === 2) {
            return (
                <div className="flex justify-center">
                    <table className="w-1/2">
                        <thead>
                            <th>{user.Restaurants.length > 1 ? <p className="text-3xl">Your Restaurants:</p> : <p className="text-3xl">Your Restaurant</p>}</th>
                            <th></th>
                        </thead>
                        <tbody>
                            {userRestaurants.map(x => (
                                x.isActive ? 
                                <tr key={x.id}>
                                    <td><p className="text-2xl">{x.restaurantName}</p></td>
                                    <td><button className="bg-[#56707E] rounded px-2 py-1 text-white"><Link to={`/restaurants/${x.id}`}>View restaurant page</Link></button></td>
                                    <td><button className="bg-[#56707E] rounded px-2 py-1 text-white"><Link to={`/edit_information/${x.id}`}>Edit Restaurant</Link></button></td>
                                    <td><button className="bg-[#56707E] rounded px-2 py-1 text-white"><Link to={`/edit_specials/${x.id}`}>Edit Specials/Events</Link></button></td>
                                    <td><button className="bg-[#56707E] rounded px-2 py-1 text-white"><Link to={`/edit_menus/${x.id}`}>Edit Menus</Link></button></td>
                                </tr>
                                :
                                <tr key={x.id}>
                                    <td><p className="text-2xl">{x.restaurantName}</p></td>
                                    <td><button className="bg-red-900 rounded px-2 py-1 text-white"><Link to={`/information_form/${x.id}`}>Complete initial information form</Link></button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                </div>
            )
        } else if (user && permission === 3) {
            return (
                <div className="container bg-[#dfebf2] pb-3">
                    <p className="text-4xl font-semibold text-center pb-5">Admin</p>
                    <Admin/>
                </div>
            )
        } else {
            return (
                <div>
                    <h1>Not Authorized error</h1>
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