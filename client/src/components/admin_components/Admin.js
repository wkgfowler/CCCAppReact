import axios from "axios";
import { Fragment, useRef } from "react";
import AdminRestaurantsTable from "./admin_subcomponents/AdminRestaurantsTable";
import RestaurantRegistrationEmailForm from "./admin_subcomponents/RestaurantRegistrationEmailForm";

const Admin = () => {


    return (
        <Fragment>
            <RestaurantRegistrationEmailForm />
            <AdminRestaurantsTable />
        </Fragment>
    );
}
 
export default Admin;