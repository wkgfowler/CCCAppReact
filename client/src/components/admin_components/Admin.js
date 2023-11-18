import axios from "axios";
import { Fragment, useEffect, useRef, useState } from "react";
import AdminRestaurantsTable from "./admin_subcomponents/AdminRestaurantsTable";
import RestaurantRegistrationEmailForm from "./admin_subcomponents/RestaurantRegistrationEmailForm";
import CreateRestaurant from "./admin_subcomponents/CreateRestaurant";
import AdminUsersTable from "./admin_subcomponents/AdminUsersTablej";

const Admin = () => {
    const [userRoles, setUserRoles] = useState([])
    const [restaurants, setRestaurants] = useState([]);
    const [allUsers, setAllUsers] = useState([])
    const [adminTableVisible, setAdminTableVisible] = useState(true);
    const [restaurantRegistrationVisible, setRestaurantRegistrationVisible] = useState(false);
    const [createRestaurantVisible, setCreateRestaurantVisible] = useState(false);

    useEffect(() => {
        getRestaurants();
    }, [userRoles])

    const config = {
        params: {
            role: userRoles
        }
    }

    const getRestaurants = () => {
        axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/admin/all_restaurants`, config)
        .then((response) => {
            console.log(response.data)

            setRestaurants(response.data.restaurants)
            setAllUsers(response.data.users)
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
                    <div className={`${adminTableVisible ? "flex flex-col" : "hidden"}`}>
                        <AdminRestaurantsTable restaurants={restaurants} getRestaurants={getRestaurants}/>
                        <AdminUsersTable allUsers={allUsers} userRoles={userRoles} setUserRoles={setUserRoles}/>
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