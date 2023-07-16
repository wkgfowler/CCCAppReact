import axios from "axios";
import { Fragment, useRef } from "react";
import { useAlert } from "react-alert";

const RestaurantRegistrationEmailForm = ({toggleAdminTable}) => {
    const emailRef = useRef();
    const alert = useAlert();
    
    const onSubmitForm = async (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_API_ENDPOINT}/auth/register/restaurant_registration_email`, {
            email: emailRef.current.value
        })
        .then((response) => {
            emailRef.current.value = "";
            toggleAdminTable();
            alert.success("Registration email sent")
        }, (error) => {
            alert.error("Error sending email")
            console.log(error)
        })
    }
    
    return (
        <div className="flex flex-col justify-center">
            <div className="flex justify-center">
                <p className="text-2xl font-medium">Restaurant Registration Email</p>
            </div>
            <div className="flex justify-start">
                <form onSubmit={onSubmitForm}>
                    <input type="email" name="email" placeholder="email" className="form-control my-3" ref={emailRef} />
                    <button className="text-white bg-[#56707E] rounded px-2 py-1">Submit</button>
                </form>
            </div>
        </div>
    );
}
 
export default RestaurantRegistrationEmailForm;