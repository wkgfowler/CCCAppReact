import axios from "axios";
import { Fragment, useEffect, useRef, useState } from "react";
import AdminRestaurantsTable from "./admin_subcomponents/AdminRestaurantsTable";
import RestaurantRegistrationEmailForm from "./admin_subcomponents/RestaurantRegistrationEmailForm";
import CreateRestaurant from "./admin_subcomponents/CreateRestaurant";

const Admin = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [adminTableVisible, setAdminTableVisible] = useState(true);
    const [restaurantRegistrationVisible, setRestaurantRegistrationVisible] = useState(false);
    const [createRestaurantVisible, setCreateRestaurantVisible] = useState(false);

    useEffect(() => {
        getRestaurants();
    }, [])

    const getRestaurants = () => {
        axios.get("http://localhost:3000/api/admin/all_restaurants")
        .then((response) => {
            console.log(response.data)

            setRestaurants(response.data)
            
        }, (error) => {
            console.log(error)
        })
    };

    const toggleAdminTable = () => {
        setAdminTableVisible(!adminTableVisible)
        setCreateRestaurantVisible(false)
        setRestaurantRegistrationVisible(false)
    };

    const toggleRestaurantRegistration = () => {
        setRestaurantRegistrationVisible(!restaurantRegistrationVisible)
        setCreateRestaurantVisible(false)
        setAdminTableVisible(false)
    }

    const toggleCreateRestaurant = () => {
        setCreateRestaurantVisible(!createRestaurantVisible)
        setAdminTableVisible(false)
        setRestaurantRegistrationVisible(false)
    }

    return (
        <div className="container">
            <div className="flex flex-row">
                <div className="flex flex-col w-2/12 pr-20">
                    <p className={`text-lg cursor-pointer ${adminTableVisible ? "font-bold border-y border-l pl-2 border-slate-900" : ""}`} onClick={toggleAdminTable}>Admin Table</p>
                    <p className={`text-lg cursor-pointer ${restaurantRegistrationVisible ? "font-bold border-y border-l pl-2 border-slate-900" : ""}`} onClick={toggleRestaurantRegistration}>Registration Email</p>
                    <p className={`text-lg cursor-pointer ${createRestaurantVisible ? "font-bold border-y border-l pl-2 border-slate-900" : ""}`} onClick={toggleCreateRestaurant}>Create Restaurant</p>
                </div>
                <div className="flex flex-col w-10/12 justify-start">
                    <div className={`${adminTableVisible ? "flex" : "hidden"}`}>
                        <AdminRestaurantsTable restaurants={restaurants} getRestaurants={getRestaurants}/>
                    </div>
                    <div className={`${restaurantRegistrationVisible ? "flex" : "hidden"}`}>
                        <RestaurantRegistrationEmailForm toggleAdminTable={toggleAdminTable}/>
                    </div>
                    <div className={`${createRestaurantVisible ? "flex" : "hidden"}`}>
                        <CreateRestaurant getRestaurants={getRestaurants} toggleAdminTable={toggleAdminTable}/>
                    </div>
                </div>
            </div>


            {/* <div className="flex flex-col divide-y-2 gap-1 justify-center">
                <div className="py-3"><RestaurantRegistrationEmailForm /></div>
                <div className="py-3"><CreateRestaurant getRestaurants={getRestaurants}/></div>
                <div className="py-3"><AdminRestaurantsTable restaurants={restaurants} getRestaurants={getRestaurants}/></div>
            </div> */}
        </div>
        
    );
}
 
export default Admin;