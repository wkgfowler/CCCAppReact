import axios from "axios";
import { useRef } from "react";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";

const Contact = () => {
    const typeOfCustomerRef = useRef();
    const nameRef = useRef();
    const emailRef = useRef();
    const messageRef = useRef();
    const alert = useAlert();
    const navigate = useNavigate();

    const onSubmitForm = async (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/api/contact_us_message', {
            typeOfCustomer: typeOfCustomerRef.current.value,
            name: nameRef.current.value,
            email: emailRef.current.value,
            message: messageRef.current.value
        })
        .then(() => {
            alert.success("Message sent successfully")
            navigate('/')
        }, (error) => {
            alert.error("Unable to send message")
            console.log(error)
        })
    }

    return (
        <div className="container">
            <div className="flex flex-row">
                <div className="flex flex-col w-1/4"></div>
                <div className="flex flex-col w-1/2">
                    <p className="text-center text-3xl">Get in touch!</p>
                    <p className="text-center text-lg">Do you have any questions or comments regarding The Crystal Coast Experience? If so, just fill out the form below.</p>
                        <form onSubmit={onSubmitForm}>
                            <div className="flex flex-col">
                                <label className="text-sm" htmlFor="typeOfUser">I am a</label>
                                <select name="typeOfUser" id="typeOfUser" className="border-b-2" ref={typeOfCustomerRef}>
                                    <option value=""></option>
                                    <option value="Consumer">Consumer</option>
                                    <option value="Business Owner">Business Owner</option>
                                </select>
                            </div>

                            <div className="flex flex-row w-full gap-8 pt-4">
                                <div className="flex flex-col w-1/2">
                                    <label className="text-sm" htmlFor="name">Name</label>
                                    <input type="text" className="border-b-2" ref={nameRef}/>
                                </div>
                                <div className="flex flex-col w-1/2">
                                    <label className="text-sm" htmlFor="email">Email Address</label>
                                    <input type="text" className="border-b-2" ref={emailRef}/>
                                </div>
                            </div>

                            <div className="flex flex-col w-full pt-4">
                                <textarea name="message" id="message" cols="30" rows="5" maxLength="600" className="rounded bg-slate-200" placeholder="Type your message here..." ref={messageRef}></textarea>
                                <button className="bg-[#56707E] rounded px-2 py-1 mb-4 w-1/5 place-self-end mt-4 text-white">Submit</button>
                            </div>
                        </form>

                </div>
                <div className="flex flex-col w-1/4"></div>
            </div>
        </div>
    );
}
 
export default Contact;