import { useContext, useRef } from "react";
import axios from "axios";
import { UserContext } from "../../../context/UserContext";

const CreateRestaurant = ({getRestaurants}) => {
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
        }, (error) => {
            console.log(error)
        })
    }

    return (
        <div className="flex flex-col justify-center">
            <div className="flex justify-center">
                <p className="text-2xl font-medium">Create Restaurant</p>
            </div>
            <div className="flex justify-center">
                <form onSubmit={onSubmitForm} className="basis-1/5">
                    <label>Restaurant Name:</label>
                    <input type="text" className="form-control my-3" ref={restaurantNameRef}></input>
                    <button className="outline outline-2 outline-blue-600 bg-blue-500 rounded px-2 py-1">Submit</button>
                </form>
            </div>
            
        </div>
    );
}
 
export default CreateRestaurant;