import React, { useState } from 'react'
import { TOWNS } from '../../../../../lib/utils';

function BasicInformationForm({next, number, setNumber, streetAddressRef, townRef, websiteRef, facebookRef, instagramRef, descriptionRef}) {

    const [text, setText] = useState('');

    const handleChange = (event) => {
        setText(event.target.value)
    }

    const handleInput = e => {
            const formattedNumber = formatPhoneNumber(e.target.value);
            setNumber(formattedNumber)
        }

    const formatPhoneNumber = (value) => {
        if (!value) return value;
        const phoneNumber = value.replace(/[^\d]/g, "");
        const phoneNumberLength = phoneNumber.length;
        if (phoneNumberLength < 4) return phoneNumber;
        if (phoneNumberLength < 7) {
            return `(${phoneNumber.slice(0,3)}) ${phoneNumber.slice(3)}`;
        }
        return `(${phoneNumber.slice(0,3)}) ${phoneNumber.slice(
            3,
            6,
            )}-${phoneNumber.slice(6,10)}`;
    }

    
  return (
    <div>
        <div className="flex flex-row pt-4 gap-x-16">
            <div className="flex relative border-b-2 group border-white w-1/2">
                <input type="streetAddress" name="Street Address" ref={streetAddressRef} className="w-full h-12 bg-transparent border-none outline-none pr-9 pl-1.5 peer placeholder-transparent" placeholder="hi" required/>
                <label htmlFor="" className="transform transition-all absolute left-0 -top-3.5 peer-focus:text-xs peer-focus:left-0 peer-focus:-top-1.5 peer-placeholder-shown:left-1 peer-placeholder-shown:top-5">Street Address</label>
            </div>
            <div className="mt-1 w-1/3">
                <select name="town" ref={townRef} className="text-center my-2 bg-[#56707E] border-2 p-1 rounded w-full" required>
                <option value="default">--Select Your Town--</option>
                {TOWNS.map(town => (
                    <option value={town}>{town}</option>
                ))}
            </select>
            </div>
        </div>
                    
            <div className="flex relative border-b-2 group border-white mt-3 w-1/2">
                <input type="phoneNumber" name="Phone Number" value={number} onChange={e => handleInput(e)} className="w-full h-12 bg-transparent border-none outline-none pr-9 pl-1.5 peer placeholder-transparent" placeholder="hi" required/>
                <label htmlFor="" className="transform transition-all absolute left-0 -top-3.5 peer-focus:text-xs peer-focus:left-0 peer-focus:-top-1.5 peer-placeholder-shown:left-1 peer-placeholder-shown:top-5">Phone Number</label>
            </div>
            <div className="flex flex-row pt-4 gap-x-16">
                <div className="flex relative border-b-2 group border-white">
                    <input type="websiteURL" name="Your Website" ref={websiteRef} className="w-full h-12 bg-transparent border-none outline-none pr-9 pl-1.5 peer placeholder-transparent" placeholder="hi"/>
                    <label htmlFor="" className="transform transition-all absolute left-0 -top-3.5 peer-focus:text-xs peer-focus:left-0 peer-focus:-top-1.5 peer-placeholder-shown:left-1 peer-placeholder-shown:top-5">Your Website</label>
                </div>
                <div className="flex relative border-b-2 group border-white">
                    <input type="facebookURL" name="Facebook Page" ref={facebookRef} className="w-full h-12 bg-transparent border-none outline-none pr-9 pl-1.5 peer placeholder-transparent" placeholder="hi"/>
                    <label htmlFor="" className="transform transition-all absolute left-0 -top-3.5 peer-focus:text-xs peer-focus:left-0 peer-focus:-top-1.5 peer-placeholder-shown:left-1 peer-placeholder-shown:top-5">Facebook Page</label>
                </div>
                <div className="flex relative border-b-2 group border-white">
                    <input type="instagramURL" name="Instagram Page" ref={instagramRef} className="w-full h-12 bg-transparent border-none outline-none pr-9 pl-1.5 peer placeholder-transparent" placeholder="hi"/>
                    <label htmlFor="" className="transform transition-all absolute left-0 -top-3.5 peer-focus:text-xs peer-focus:left-0 peer-focus:-top-1.5 peer-placeholder-shown:left-1 peer-placeholder-shown:top-5">Instagram Page</label>
                </div>
            </div>
            <div className="flex flex-col py-5">
                <label for="description">Enter a brief description of your restaurant:</label>
                <textarea id="description" name="description" ref={descriptionRef} rows="5" cols="75" className="rounded-lg bg-white text-black" maxLength="600" onChange={handleChange}></textarea>
                <p> {text.length} / 600 character limit</p>
            </div>
            <div className="flex justify-center pt-2 mt-2">
                <button className="outline outline-2 bg-[#56707E] rounded px-2 py-1" onClick={(e) => next(e)}>Next</button>
            </div>
    </div>
  )
}

export default BasicInformationForm