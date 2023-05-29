import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import UserRestaurantModal from "./UserRestaurantModal";
import { Link } from "react-router-dom";

const AdminRestaurantsTable = () => {
    const [restaurants, setRestaurants] = useState([]); 
    
    useEffect(() => {
        getRestaurants();
    }, [])

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

    const getRestaurants = () => {
        axios.get("http://localhost:3000/api/admin/all_restaurants")
        .then((response) => {
            console.log(response.data)
            setRestaurants(response.data)
        }, (error) => {
            console.log(error)
        })
    }


    return (
        <Fragment>
            <div>

                <table>
                    <thead>
                        <th>Restaurant Name</th>
                        <th>Users</th>
                        <th>Add User</th>
                        <th>Options</th>
                    </thead>
                    <tbody>
                    {restaurants.map(restaurant => (
                        restaurant.Users.length ? restaurant.Users.map((x, i) => (
                            <tr key={restaurant.id + i}>
                                <td>{i === 0 ? restaurant.restaurantName : ""}</td>
                                <td>{x.email} &nbsp; <button className="btn btn-danger" onClick={() => removeUser(restaurant.id, x.email)}>Remove User</button></td>
                                <td>{i === 0 ? <UserRestaurantModal restaurant={restaurant} getRestaurants={getRestaurants}/> : ""}</td>
                                <td>
                                    <button><Link to={`/edit_information/${restaurant.id}`}>Edit Information</Link></button>
                                    <button><Link to={`/edit_specials/${restaurant.id}`}>Edit Specials</Link></button>
                                    <button><Link to={`/edit_menus/${restaurant.id}`}>Edit Menus</Link></button>
                                </td>
                            </tr>
                        )) : <tr key={restaurant.id}>
                                <td>{restaurant.restaurantName}</td>
                                <td><UserRestaurantModal restaurant={restaurant} getRestaurants={getRestaurants}/></td>
                                <td>
                                    <button><Link to={`/edit_information/${restaurant.id}`}>Edit Information</Link></button>
                                    <button><Link to={`/edit_specials/${restaurant.id}`}>Edit Specials</Link></button>
                                    <button><Link to={`/edit_menus/${restaurant.id}`}>Edit Menus</Link></button>
                                </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>


        </Fragment>
    );
}
 
export default AdminRestaurantsTable;