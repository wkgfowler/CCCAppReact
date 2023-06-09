import axios from "axios";
import { Fragment, useRef } from "react";


const UserRestaurantModal = ({ restaurant, getRestaurants }) => {
    //console.log(restaurant)

    const emailRef = useRef();

    const addUser = () => {
      axios.post("http://localhost:3000/auth/restaurant/add_user", {
          restaurant: restaurant.id,
          email: emailRef.current.value
      })
      .then((response) => {
          console.log(response)
          emailRef.current.value = ""
          getRestaurants();
      }, (error) => {
          console.log(error)
      })
  };

    return (
        <div>
            <button type="button" className="text-white bg-green-900 rounded px-2 py-1" data-toggle="modal" data-target={`#id${restaurant.id}`}>
              Add User
            </button>

            <div className="modal" id={`id${restaurant.id}`}>
              <div className="modal-dialog">
                <div className="modal-content bg-slate-900 text-white rounded-lg">


                  <div className="modal-header">
                    <h4 className="modal-title">Enter email address for {restaurant.restaurantName}</h4>
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                  </div>


                  <div className="modal-body">
                    <input type="email" name="email" ref={emailRef} placeholder="Enter email address" className="rounded pl-2 py-1"/>
                  </div>


                  <div className="modal-footer">
                    <button type="button" className="bg-slate-200 text-black rounded px-2 py-1" data-dismiss="modal" onClick={addUser}>Add User</button>
                  </div>

                </div>
              </div>
            </div>
        </div>
    );
}
 
export default UserRestaurantModal;