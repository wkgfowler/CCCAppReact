import { useContext, useRef } from "react";
import axios from "axios";
import { UserContext } from "../../../context/UserContext";

const CreateRestaurant = ({getRestaurants, toggleAdminTable}) => {
    const {user, setUser} = useContext(UserContext)
    const restaurantNameRef = useRef();
    
    const onSubmitForm = async (e) => {
        e.preventDefault()
        axios.post("http://localhost:3000/auth/admin/create_restaurant", {
            restaurantName: restaurantNameRef.current.value,
            id: user.id
        })
        .then((response) => {
            console.log(response)
            restaurantNameRef.current.value = "";
            getRestaurants();
            toggleAdminTable();
        }, (error) => {
            console.log(error)
        })
    }

    return (
        <div className="flex flex-col justify-center">
            <div className="flex justify-start">
                <p className="text-2xl font-medium">Create Restaurant</p>
            </div>
            <div className="flex justify-center pt-2">
                <form onSubmit={onSubmitForm}>
                    <label>Restaurant Name:</label>
                    <input type="text" className="form-control my-3" ref={restaurantNameRef}></input>
                    <button className="text-white bg-[#56707E] rounded px-2 py-1">Submit</button>
                </form>
            </div>
            
        </div>
    );
}
 
export default CreateRestaurant;