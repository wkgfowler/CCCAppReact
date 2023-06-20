import {Fragment, useRef, useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAlert } from 'react-alert';
import { BiLockAlt } from 'react-icons/bi';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const RegisterRestaurant = () => {
    const [valid, setValid] = useState(true);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const navigate = useNavigate();
    const {token} = useParams();
    
    const alert = useAlert();

    const togglePassword = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPassword = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    useEffect(() => {
        validToken()
    }, [])

    const validToken = () => {
        axios.post('http://localhost:3000/auth/register/valid_token', {
                token
        })
        .then((response) => {
            console.log(response.data.user)
            setValid(response.data.valid)
            localStorage.setItem("email", response.data.user.email)
        }, (error) => {
            console.log(error)
        })
    }
    
    const restaurantNameRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const onSubmitForm = async(e) => {
        e.preventDefault();
        if (passwordRef.current.value === confirmPasswordRef.current.value) {
            axios.post('http://localhost:3000/auth/register/restaurant_registration', {
                restaurantName: restaurantNameRef.current.value,
                password: passwordRef.current.value
            }, {
                headers: {
                    "email" : localStorage.getItem("email")
                }
            })
            .then(() => {
                localStorage.removeItem("email")
                navigate('/login')
            }, (error) => {
                console.log(error)
                
            });
        } else {
            alert.error("Passwords do not match")
        }
    }

    if (valid) {
        return (
            <div className="flex justify-center">
                <form onSubmit={onSubmitForm} className="w-2/3">
                    <p className="text-4xl text-center pb-3 pt-3">Register Your Restaurant</p>
                    <div className="flex relative my-7 border-b-2 group border-slate-900">
                        <input type="text" name="restaurantName" className="w-full h-12 bg-transparent border-none outline-none pr-9 pl-1.5 peer placeholder-transparent" placeholder="hi" required ref={restaurantNameRef} />
                        <label htmlFor="" className="transform transition-all absolute left-0 -top-3.5 peer-focus:left-0 peer-focus:-top-3.5 peer-placeholder-shown:left-1 peer-placeholder-shown:top-3">Restaurant Name</label>
                    </div>
                    <div className="flex relative my-7 border-b-2 group border-slate-900">
                        {!passwordVisible ? <AiOutlineEyeInvisible onClick={togglePassword} className="absolute right-8 top-5 text-xl"/> : <AiOutlineEye onClick={togglePassword} className="absolute right-8 top-5 text-xl"/>}
                        <BiLockAlt className="absolute right-2 top-5 text-xl"/>
                        <input type={!passwordVisible ? "password" : "text"} name="password" ref={passwordRef} className="w-full h-12 bg-transparent border-none outline-none pr-9 pl-1.5 peer placeholder-transparent" placeholder="hi" required/>
                        <label htmlFor="" className="transform transition-all absolute left-0 -top-3.5 peer-focus:left-0 peer-focus:-top-3.5 peer-placeholder-shown:left-1 peer-placeholder-shown:top-3">Password</label>
                    </div>
                    <div className="flex relative my-7 border-b-2 group border-slate-900">
                        {!confirmPasswordVisible ? <AiOutlineEyeInvisible onClick={toggleConfirmPassword} className="absolute right-8 top-5 text-xl"/> : <AiOutlineEye onClick={toggleConfirmPassword} className="absolute right-8 top-5 text-xl"/>}
                        <BiLockAlt className="absolute right-2 top-5 text-xl"/>
                        <input type={!confirmPasswordVisible ? "password" : "text"} name="password" ref={confirmPasswordRef} className="w-full h-12 bg-transparent border-none outline-none pr-9 pl-1.5 peer placeholder-transparent" placeholder="hi" required/>
                        <label htmlFor="" className="transform transition-all absolute left-0 -top-3.5 peer-focus:left-0 peer-focus:-top-3.5 peer-placeholder-shown:left-1 peer-placeholder-shown:top-3"> Confirm Password</label>
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
 
export default RegisterRestaurant;