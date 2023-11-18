import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import UserRestaurantModal from "./UserRestaurantModal";
import { Link } from "react-router-dom";
import Switch from "react-switch";
import { FcCheckmark } from "react-icons/fc";
import { FaXmark } from "react-icons/fa6";
import { FaChevronDown, FaChevronLeft } from "react-icons/fa";

const AdminRestaurantsTable = ({restaurants, getRestaurants}) => {

    const [visible, setVisible] = useState(false);

    const changeVisibility = () => {
        setVisible(!visible)
    }
    
    const changeRestaurantVisibility = async (id, status) => {
        console.log(1)
        axios.post(`${process.env.REACT_APP_API_ENDPOINT}/auth/toggle_visibility`, {
            id: id,
            isVisible: status
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
    
    const removeUser = async (restaurant_id, user_email) => {
        axios.post(`${process.env.REACT_APP_API_ENDPOINT}/auth/remove_user/${restaurant_id}/${user_email}`, {
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

    return (
        <div className="flex flex-col justify-center">
            <div className="flex flex-row justify-center pb-3">
                <p className="text-2xl text-center font-bold">Restaurants Table</p>
                <button onClick={changeVisibility}>{visible ? <FaChevronDown className="mt-2 ml-4"/> : <FaChevronLeft className="mt-2 ml-4"/>}</button>
            </div>

            <div className={`${visible ? "flex flex-col" : "hidden"}`}>
                <div className="flex flex-row justify-between py-2">
                    <div>
                        <p className="text-xl">Total Restaurants: {restaurants.length}</p>
                    </div>
                </div>

                <table>
                    <thead>
                        <th className="text-xl">Restaurant Name</th>
                        <th className="pl-8 text-xl">Users</th>
                        <th className="pl-8 text-xl">Add User</th>
                        <th className="pl-8 text-xl">Options</th>
                        <th className="pl-8 text-xl">Is visible?</th>
                        <th className="pl-8 text-xl">Is active?</th>
                    </thead>
                    <tbody>
                    {restaurants.map(restaurant => (
                        // display for if restaurant has users
                        restaurant.Users.length ? restaurant.Users.map((x, i) => (
                            <tr className="border-y border-slate-500" key={restaurant.id + i}>
                                <td className="pt-2 py-2 font-medium">{i === 0 ? <Link to={`/restaurants/${restaurant.restaurantName}`}>{restaurant.restaurantName}</Link> : ""}</td>
                                <td className="pl-8 py-2 flex flex-row">
                                    <p>{x.email}</p>
                                    <p><button className="bg-red-900 rounded px-2 py-1 text-white ml-5" onClick={() => removeUser(restaurant.id, x.email)}>Remove User</button></p>
                                </td>
                                <td className="pl-8 py-2">{i === 0 ? <UserRestaurantModal restaurant={restaurant} getRestaurants={getRestaurants}/> : ""}</td>
                                <td className="pl-8 py-2 flex flex-row">
                                    <button className="bg-[#56707E] rounded px-2 py-1 text-white"><Link to={`/edit_information/${restaurant.id}`}>Edit Information</Link></button>
                                    <button className="ml-5  bg-[#56707E] rounded px-2 py-1 text-white"><Link to={`/edit_specials/${restaurant.id}`}>Edit Specials</Link></button>
                                    <button className="ml-5  bg-[#56707E] rounded px-2 py-1 text-white"><Link to={`/edit_menus/${restaurant.id}`}>Edit Menus</Link></button>
                                </td>
                                <td className="pl-8 py-2"><Switch checked={restaurant.isVisible} onChange={() => changeRestaurantVisibility(restaurant.id, restaurant.isVisible)}/></td>
                                <td className="pl-8 py-2">{restaurant.isActive ? <FcCheckmark/> : 
                                    <div className="flex">
                                        <FaXmark className="text-2xl text-red-500 pt-1"/> &nbsp;
                                        <button className="bg-[#56707E] rounded px-2 py-1 text-white"><Link to={`/information_form/${restaurant.id}`}>Complete form</Link></button>
                                    </div>}
                                </td>
                            </tr>
                        )) : 
                        // display for if restaurant has no users
                            <tr className="border-y border-slate-500" key={restaurant.id}>
                                <td className="pt-2 py-2 font-medium"><Link to={`/restaurants/${restaurant.restaurantName}`}>{restaurant.restaurantName}</Link></td>
                                <td className="pl-8 py-2"></td>
                                <td className="pl-8 py-2"><UserRestaurantModal restaurant={restaurant} getRestaurants={getRestaurants}/></td>
                                <td className="pl-8 py-2 flex flex-row">
                                    <button className=" bg-[#56707E] rounded px-2 py-1 text-white"><Link to={`/edit_information/${restaurant.id}`}>Edit Information</Link></button>
                                    <button className="ml-5  bg-[#56707E] rounded px-2 py-1 text-white"><Link to={`/edit_specials/${restaurant.id}`}>Edit Specials</Link></button>
                                    <button className="ml-5  bg-[#56707E] rounded px-2 py-1 text-white"><Link to={`/edit_menus/${restaurant.id}`}>Edit Menus</Link></button>
                                </td>
                                <td className="pl-8 py-2"><Switch checked={restaurant.isVisible} onChange={() => changeRestaurantVisibility(restaurant.id, restaurant.isVisible)}/></td>
                                <td className="pl-8 py-2">{restaurant.isActive ? <FcCheckmark/> : 
                                    <div className="flex">
                                        <FaXmark className="text-2xl text-red-500 pt-1"/> &nbsp;
                                        <button className="bg-[#56707E] rounded px-2 py-1 text-white"><Link to={`/information_form/${restaurant.id}`}>Complete form</Link></button>
                                    </div>}
                                </td>
                            </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
 
export default AdminRestaurantsTable;