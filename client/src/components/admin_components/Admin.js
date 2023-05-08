import axios from "axios";
import { Fragment, useRef } from "react";
import AdminRestaurantsTable from "./admin_subcomponents/AdminRestaurantsTable";
import RestaurantRegistrationEmailForm from "./admin_subcomponents/RestaurantRegistrationEmailForm";
import CreateRestaurant from "./admin_subcomponents/CreateRestaurant";

const Admin = () => {


    return (
        <Fragment>
            <RestaurantRegistrationEmailForm />
            <AdminRestaurantsTable />
            <CreateRestaurant />
        </Fragment>
    );
}
 
export default Admin;