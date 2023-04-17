import { useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiLockAlt } from "react-icons/bi"
import { AiOutlineMail } from "react-icons/ai"
import { UserContext } from "../../context/UserContext";
import { PermissionContext } from "../../context/PermissionContext";
import axios from "axios";

const LogInRegisterBox = () => {
    const {user, setUser} = useContext(UserContext);
    const {permission, setPermission} = useContext(PermissionContext)

    const navigate = useNavigate();
    
    const emailRef = useRef();
    const passwordRef = useRef();

    const onSubmitForm = async (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/auth/login', {
            email: emailRef.current.value,
            password: passwordRef.current.value
        })
        .then((response) => {
            console.log(response.data)
            // console.log(response.data.user.Roles[0])
            localStorage.setItem('token', response.data.token)
            setUser(response.data.user)
            setPermission(response.data.user.Roles[0].id)
            navigate(`/profile/${response.data.user.id}`)
        }, (error) => {
            console.log(error)
        })
    };

    return (
        <div className="my-24 mx-28">
            <form onSubmit={onSubmitForm}>
                <p className="text-4xl text-center pb-3">Login</p>
                <div className="flex relative my-7 border-b-2 group">
                    <AiOutlineMail className="absolute right-2 top-5 text-xl"/>
                    <input type="email" name="email" ref={emailRef} className="w-full h-12 bg-transparent border-none outline-none pr-9 pl-1.5 peer placeholder-transparent" placeholder="hi" required/>
                    <label htmlFor="" className="transform transition-all absolute left-0 -top-3.5 peer-focus:left-0 peer-focus:-top-3.5 peer-placeholder-shown:left-1 peer-placeholder-shown:top-3">Email</label>
                </div>
                <div className="flex relative my-7 border-b-2 group">
                    <BiLockAlt className="absolute right-2 top-5 text-xl"/>
                    <input type="password" name="password" ref={passwordRef} className="w-full h-12 bg-transparent border-none outline-none pr-9 pl-1.5 peer placeholder-transparent" placeholder="hi" required/>
                    <label htmlFor="" className="transform transition-all absolute left-0 -top-3.5 peer-focus:left-0 peer-focus:-top-3.5 peer-placeholder-shown:left-1 peer-placeholder-shown:top-3">Password</label>
                </div>
                <div className="text-center">
                    <Link to="/reset_password_request" className="underline">Forgot Password</Link>
                </div>
                <button className="border w-full py-1 my-1 bg-slate-50">Log in</button>
                <div className="text-center">
                    <p>Don't have an account? <Link to="/register" className="underline">Register</Link></p>
                </div>             
            </form>
        </div>
    );
}
 
export default LogInRegisterBox;