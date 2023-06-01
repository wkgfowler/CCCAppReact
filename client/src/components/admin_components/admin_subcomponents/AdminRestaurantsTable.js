import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import UserRestaurantModal from "./UserRestaurantModal";
import { Link } from "react-router-dom";

const AdminRestaurantsTable = ({restaurants, getRestaurants}) => {
    // const [restaurants, setRestaurants] = useState([]); 
    
    // useEffect(() => {
    //     getRestaurants();
    // }, [])

    const removeUser = async (restaurant_id, user_email) => {
        axios.post(`http://localhost:3000/auth/remove_user/${restaurant_id}/${user_email}`, {
            id: restaurant_id,
            email: user_email
        }, {
            headers: {
                "token" : localStorage.getItem('token')
            }
        })
        .then(() => {
            console.log("success")
            getRestaurants();
        }, (error) => {
            console.log(error)
        })
    }

    // const getRestaurants = () => {
    //     axios.get("http://localhost:3000/api/admin/all_restaurants")
    //     .then((response) => {
    //         console.log(response.data)
    //         setRestaurants(response.data)
    //     }, (error) => {
    //         console.log(error)
    //     })
    // }


    return (
        <div className="flex justify-center">
            <table>
                <thead>
                    <th>Restaurant Name</th>
                    <th className="pl-3">Users</th>
                    <th className="pl-3">Add User</th>
                    <th className="pl-3">Options</th>
                </thead>
                <tbody>
                {restaurants.map(restaurant => (
                    restaurant.Users.length ? restaurant.Users.map((x, i) => (
                        <tr className="border-y-" key={restaurant.id + i}>
                            <td className="pt-2 py-2 font-medium">{i === 0 ? <Link to={`/restaurants/${restaurant.restaurantName}`}>{restaurant.restaurantName}</Link> : ""}</td>
                            <td className="pl-3 py-2">{x.email} &nbsp; <button className="outline outline-2 outline-red-600 bg-red-500 rounded px-2 py-1 text-white" onClick={() => removeUser(restaurant.id, x.email)}>Remove User</button></td>
                            <td className="pl-3 py-2">{i === 0 ? <UserRestaurantModal restaurant={restaurant} getRestaurants={getRestaurants}/> : ""}</td>
                            <td className="pl-3 py-2">
                                <button className="outline outline-2 outline-cyan-600 bg-cyan-500 rounded px-2 py-1 text-white"><Link to={`/edit_information/${restaurant.id}`}>Edit Information</Link></button>
                                <button className="ml-3 outline outline-2 outline-cyan-600 bg-cyan-500 rounded px-2 py-1 text-white"><Link to={`/edit_specials/${restaurant.id}`}>Edit Specials</Link></button>
                                <button className="ml-3 outline outline-2 outline-cyan-600 bg-cyan-500 rounded px-2 py-1 text-white"><Link to={`/edit_menus/${restaurant.id}`}>Edit Menus</Link></button>
                            </td>
                        </tr>
                    )) : <tr className="border-y border-slate-500" key={restaurant.id}>
                            <td className="pt-2 py-2 font-medium"><Link to={`/restaurants/${restaurant.restaurantName}`}>{restaurant.restaurantName}</Link></td>
                            <td className="pl-3 py-2"></td>
                            <td className="pl-3 py-2"><UserRestaurantModal restaurant={restaurant} getRestaurants={getRestaurants}/></td>
                            <td className="pl-3 py-2">
                                <button className="outline outline-2 outline-cyan-600 bg-cyan-500 rounded px-2 py-1 text-white"><Link to={`/edit_information/${restaurant.id}`}>Edit Information</Link></button>
                                <button className="ml-3 outline outline-2 outline-cyan-600 bg-cyan-500 rounded px-2 py-1 text-white"><Link to={`/edit_specials/${restaurant.id}`}>Edit Specials</Link></button>
                                <button className="ml-3 outline outline-2 outline-cyan-600 bg-cyan-500 rounded px-2 py-1 text-white"><Link to={`/edit_menus/${restaurant.id}`}>Edit Menus</Link></button>
                            </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
 
export default AdminRestaurantsTable;