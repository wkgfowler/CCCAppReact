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
                <div className="flex flex-col w-1/2 bg-[#56707E] mt-4 pt-2 px-8 text-white">
                    <p className="text-center text-4xl font-semibold pt-4 pb-4">Get in touch!</p>
                    <p className="text-center text-md px-24 pb-10">Do you have any questions or comments regarding The Crystal Coast Experience? If so, just fill out the form below.</p>
                        <form onSubmit={onSubmitForm}>
                            <div className="flex flex-col">
                                <label className="text-sm" htmlFor="typeOfUser">I am a</label>
                                <select name="typeOfUser" id="typeOfUser" className="border-b-2 border-white bg-[#56707E]" ref={typeOfCustomerRef}>
                                    <option value=""></option>
                                    <option value="Consumer">Consumer</option>
                                    <option value="Business Owner">Business Owner</option>
                                </select>
                            </div>

                            <div className="flex flex-row w-full gap-8 pt-4">
                                <div className="flex flex-col w-1/2">
                                    <label className="text-sm" htmlFor="name">Name</label>
                                    <input type="text" className="border-b-2 border-white bg-[#56707E]" ref={nameRef}/>
                                </div>
                                <div className="flex flex-col w-1/2">
                                    <label className="text-sm" htmlFor="email">Email Address</label>
                                    <input type="text" className="border-b-2 border-white bg-[#56707E]" ref={emailRef}/>
                                </div>
                            </div>

                            <div className="flex flex-col w-full pt-4">
                                <textarea name="message" id="message" cols="30" rows="5" maxLength="600" className="bg-[#dfebf2] text-black" placeholder="Type your message here..." ref={messageRef}></textarea>
                                <button className="bg-[#dfebf2] px-6 py-2 text-slate-900 text-sm font-semibold outline outline-1 -outline-offset-4 mb-4 w-1/5 place-self-end mt-4">Submit</button>
                            </div>
                        </form>

                </div>
                <div className="flex flex-col w-1/4"></div>
            </div>
        </div>
    );
}
 
export default Contact;