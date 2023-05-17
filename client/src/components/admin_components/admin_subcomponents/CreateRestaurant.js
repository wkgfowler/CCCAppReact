import { useContext, useRef } from "react";
import axios from "axios";
import { UserContext } from "../../../context/UserContext";

const CreateRestaurant = () => {
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
        }, (error) => {
            console.log(error)
        })
    }

    return (
        <div className="flex justify-center">
            <p className="text-4xl text-center">Create Restaurant</p>
            <div className="grid grid-cols-1">
                <form onSubmit={onSubmitForm}>
                    <label>Restaurant Name:</label>
                    <br/>
                    <input type="text" ref={restaurantNameRef}></input>
                    <button className="pt-2">Submit</button>
                </form>
            </div>
            
        </div>
    );
}
 
export default CreateRestaurant;