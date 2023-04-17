import axios from "axios";
import { Fragment, useRef } from "react";

const RestaurantRegistrationEmailForm = () => {
    const emailRef = useRef();
    
    const onSubmitForm = async (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/auth/register/restaurant_registration_email", {
            email: emailRef.current.value
        })
        .then((response) => {
            console.log(response.data)
        }, (error) => {
            console.log(error)
        })
    }
    
    return (
        <Fragment>
            <h3>Restaurant Registration Email</h3>
            <form onSubmit={onSubmitForm}>
                <input type="email" name="email" placeholder="email" className="form-control my-3" ref={emailRef} />
                <button>Submit</button>
            </form>
        </Fragment>
    );
}
 
export default RestaurantRegistrationEmailForm;