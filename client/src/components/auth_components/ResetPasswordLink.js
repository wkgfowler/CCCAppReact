import axios from "axios";
import { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ResetPasswordLink = () => {
    const [valid, setValid] = useState(false)
    const passwordRef = useRef();
    const navigate = useNavigate();
    const {token} = useParams();

    useEffect(() => {
        validToken()
    }, [])

    const validToken = () => {
        axios.post("http://localhost:3000/auth/reset_password/valid_token", {
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
        axios.post("http://localhost:3000/auth/reset_password/set_password", {
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
            <Fragment>
                <h1>Enter your new password</h1>
                <form onSubmit={onSubmitForm}>
                    <input type="password" name="password" placeholder="Enter new password" className="form-control my-3" ref={passwordRef}/>
                    <button className="btn btn-success btn-block">Submit</button>
                </form>
            </Fragment>
        );
    } else {
        return (
            <Fragment>
                <h1>Link Expired</h1>
            </Fragment>
        )
    }
}

export default ResetPasswordLink;