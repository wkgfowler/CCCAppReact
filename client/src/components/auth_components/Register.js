import {Fragment, useRef, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineMail, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { BiLockAlt } from 'react-icons/bi';
import { useAlert } from 'react-alert'

const Register = () => {

    const navigate = useNavigate();

    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const alert = useAlert();

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const togglePassword = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPassword = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const onSubmitForm = async(e) => {
        e.preventDefault();
        if (passwordRef === confirmPasswordRef) {
            axios.post('http://localhost:3000/auth/register', {
                email: emailRef.current.value,
                password: passwordRef.current.value
            })
            .then(() => {
                navigate('/login')
            }, (error) => {
                console.log(error)
            });
        } else {
            alert.error("Passwords do not match")
        }
    }

    return ( 
        <div className="flex justify-center">
            <form className="w-2/3">
                <p className="text-4xl text-center pb-3 pt-3">Register An Account</p>
                <div className="flex relative my-7 border-b-2 group">
                    <AiOutlineMail className="absolute right-2 top-5 text-xl"/>
                    <input type="email" name="email" ref={emailRef} className="w-full h-12 bg-transparent border-none outline-none pr-9 pl-1.5 peer placeholder-transparent" placeholder="hi" required/>
                    <label htmlFor="" className="transform transition-all absolute left-0 -top-3.5 peer-focus:left-0 peer-focus:-top-3.5 peer-placeholder-shown:left-1 peer-placeholder-shown:top-3">Email</label>
                </div>
                <div className="flex relative my-7 border-b-2 group">
                    {!passwordVisible ? <AiOutlineEyeInvisible onClick={togglePassword} className="absolute right-8 top-5 text-xl"/> : <AiOutlineEye onClick={togglePassword} className="absolute right-8 top-5 text-xl"/>}
                    <BiLockAlt className="absolute right-2 top-5 text-xl"/>
                    <input type={!passwordVisible ? "password" : "text"} name="password" ref={passwordRef} className="w-full h-12 bg-transparent border-none outline-none pr-9 pl-1.5 peer placeholder-transparent" placeholder="hi" required/>
                    <label htmlFor="" className="transform transition-all absolute left-0 -top-3.5 peer-focus:left-0 peer-focus:-top-3.5 peer-placeholder-shown:left-1 peer-placeholder-shown:top-3">Password</label>
                </div>
                <div className="flex relative my-7 border-b-2 group">
                    {!confirmPasswordVisible ? <AiOutlineEyeInvisible onClick={toggleConfirmPassword} className="absolute right-8 top-5 text-xl"/> : <AiOutlineEye onClick={toggleConfirmPassword} className="absolute right-8 top-5 text-xl"/>}
                    <BiLockAlt className="absolute right-2 top-5 text-xl"/>
                    <input type={!confirmPasswordVisible ? "password" : "text"} name="password" ref={confirmPasswordRef} className="w-full h-12 bg-transparent border-none outline-none pr-9 pl-1.5 peer placeholder-transparent" placeholder="hi" required/>
                    <label htmlFor="" className="transform transition-all absolute left-0 -top-3.5 peer-focus:left-0 peer-focus:-top-3.5 peer-placeholder-shown:left-1 peer-placeholder-shown:top-3"> Confirm Password</label>
                </div>
                <button onClick={onSubmitForm} className="border w-full py-1 my-1 bg-slate-50">Register</button>
                <div className="text-center">
                    <p>Already have an account? <Link to="/login" className="underline">Log in</Link></p>
                </div>             
            </form>

        </div>
    );
}
 
export default Register;