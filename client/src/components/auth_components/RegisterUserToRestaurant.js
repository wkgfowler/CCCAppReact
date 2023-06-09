import {Fragment, useRef, useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { BiLockAlt } from 'react-icons/bi';

const RegisterUserToRestaurant = () => {
    const [valid, setValid] = useState(true);

    const navigate = useNavigate();
    const {restaurant, token} = useParams();

    const passwordRef = useRef();
    

    useEffect(() => {
        console.log(restaurant)
        console.log(token)
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
    };

    const onSubmitForm = async(e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/auth/register/user_to_restaurant', {
            restaurant,
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
    }
    
    if (valid) {
        return (
            <div className="flex justify-center">
                <form onSubmit={onSubmitForm} className="w-2/3">
                    <p className="text-4xl text-center pb-3 pt-3">Set A Password</p>
                    <div className="flex relative my-7 border-b-2 group border-slate-900">
                        <BiLockAlt className="absolute right-2 top-5 text-xl"/>
                        <input type="password" name="password" ref={passwordRef} className="w-full h-12 bg-transparent border-none outline-none pr-9 pl-1.5 peer placeholder-transparent" placeholder="hi" required/>
                        <label htmlFor="" className="transform transition-all absolute left-0 -top-3.5 peer-focus:left-0 peer-focus:-top-3.5 peer-placeholder-shown:left-1 peer-placeholder-shown:top-3">Password</label>
                    </div>
                    <button className="border w-full py-1 my-1 bg-slate-900 text-white rounded">Submit</button>
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
 
export default RegisterUserToRestaurant;