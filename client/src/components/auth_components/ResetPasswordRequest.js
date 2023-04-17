import axios from "axios";
import { Fragment, useRef, useState } from "react";
import { AiOutlineMail } from "react-icons/ai";

const ResetPasswordRequest = () => {
    const [valid, setValid] = useState(false)
    const emailRef = useRef();

    const onSubmitForm = async (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/auth/reset_password", {
            email: emailRef.current.value
        })
        .then((response) => {
            setValid(response.data);
        }, (error) => {
            console.log(error)
        })
    }

    if (valid) {
        return (
            <div>
                <h4>If the email address entered is registered to our site, you should be receiving an email with a link to reset your password.</h4>
            </div>
        );
    } else {
        return (
            <div className="flex justify-center">
                <form onSubmit={onSubmitForm} className="w-2/3">
                    <p className="text-4xl text-center pb-3 pt-3">Reset Password</p>
                    <div className="flex relative my-7 border-b-2 group">
                        <AiOutlineMail className="absolute right-2 top-5 text-xl"/>
                        <input type="email" name="email" ref={emailRef} className="w-full h-12 bg-transparent border-none outline-none pr-9 pl-1.5 peer placeholder-transparent" placeholder="hi" required/>
                        <label htmlFor="" className="transform transition-all absolute left-0 -top-3.5 peer-focus:left-0 peer-focus:-top-3.5 peer-placeholder-shown:left-1 peer-placeholder-shown:top-3">Email</label>
                    </div>
                    <button className="border w-full py-1 my-1 bg-slate-50">Submit</button>
                </form>
            </div>
        )
    }
}
 
export default ResetPasswordRequest;