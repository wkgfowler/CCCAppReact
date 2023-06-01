import axios from "axios";
import { Fragment, useEffect, useRef, useState } from "react";
import AdminRestaurantsTable from "./admin_subcomponents/AdminRestaurantsTable";
import RestaurantRegistrationEmailForm from "./admin_subcomponents/RestaurantRegistrationEmailForm";
import CreateRestaurant from "./admin_subcomponents/CreateRestaurant";

const Admin = () => {
    const [restaurants, setRestaurants] = useState([]); 
    
    useEffect(() => {
        getRestaurants();
    }, [restaurants])

    const getRestaurants = () => {
        axios.get("http://localhost:3000/api/admin/all_restaurants")
        .then((response) => {
            console.log(response.data)
            let numberOfRestaurants = response.data.length;
            if (numberOfRestaurants !== restaurants.length) {
                setRestaurants(response.data)
            }
        }, (error) => {
            console.log(error)
        })
    }


    return (
        <div className="container flex flex-col divide-y-2 gap-1 justify-center">
            <div className="py-3"><RestaurantRegistrationEmailForm /></div>
            <div className="py-3"><CreateRestaurant getRestaurants={getRestaurants}/></div>
            <div className="py-3"><AdminRestaurantsTable restaurants={restaurants} getRestaurants={getRestaurants}/></div>
        </div>
    );
}
 
export default Admin;