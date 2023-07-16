import axios from "axios";
import { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BiLockAlt } from "react-icons/bi";

const ResetPasswordLink = () => {
    const [valid, setValid] = useState(false)
    const passwordRef = useRef();
    const navigate = useNavigate();
    const {token} = useParams();

    useEffect(() => {
        validToken()
    }, [])

    const validToken = () => {
        axios.post(`${process.env.REACT_APP_API_ENDPOINT}/auth/reset_password/valid_token`, {
            token
        })
        .then((response) => {
            setValid(response.data.valid)
            localStorage.setItem("email", response.data.user.email)
        }, (error) => {
            console.log(error)
        })
    }

    const onSubmitForm = async (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_API_ENDPOINT}/auth/reset_password/set_password`, {
            password: passwordRef.current.value
        }, {
            headers: {
                "email": localStorage.getItem("email")
            }
        })
        .then(() => {
            localStorage.removeItem("email")
            navigate("/login")
        }, (error) => {
            console.log(error)
        })
    }
    
    if (valid) {
        return (
            <div className="flex justify-center">
                <form onSubmit={onSubmitForm} className="w-2/3">
                    <p className="text-4xl text-center pb-3 pt-3">Enter your new password</p>
                    <div className="flex relative my-7 border-b-2 group border-slate-900">
                        <BiLockAlt className="absolute right-2 top-5 text-xl"/>
                        <input type="password" name="password" ref={passwordRef} className="w-full h-12 bg-transparent border-none outline-none pr-9 pl-1.5 peer placeholder-transparent" placeholder="hi" required/>
                        <label htmlFor="" className="transform transition-all absolute left-0 -top-3.5 peer-focus:left-0 peer-focus:-top-3.5 peer-placeholder-shown:left-1 peer-placeholder-shown:top-3">Email</label>
                    </div>
                    <button className="border w-full py-1 my-1 bg-[#56707E] text-white rounded">Submit</button>
                </form>
            </div>
        );
    } else {
        return (
            <div className="flex justify-center">
                <p className="text-4xl text-center pb-3 pt-3">Link Expired</p>
            </div>
        )
    }
}

export default ResetPasswordLink;