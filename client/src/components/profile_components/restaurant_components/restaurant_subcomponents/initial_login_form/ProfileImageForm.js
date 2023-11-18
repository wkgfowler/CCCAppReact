import React, { useState } from 'react'

function ProfileImageForm({prev, next, profileImage, setProfileImage, submit}) {

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        console.log(file)
        setProfileImage(file);
    }


  return (
    <div className="pt-4 grid grid-col justify-center">
        <div>
            {profileImage ? <img src={URL.createObjectURL(profileImage)} alt="" className="max-w-sm"/> : ""}
        </div>
        <div>
            <label for="profileImage">Upload a profile image for your restaurant</label>
        </div>
        <div className="pt-2">
            <input type="file" id="profileImage" name="profileImage" size="lg" onChange={handleImageChange} required/>
        </div>
        <div className="flex justify-evenly pt-2">
            <button className="outline outline-2 bg-[#56707E] rounded px-2 py-1 mb-4 mt-3" onClick={(e) => prev(e)}>Previous</button>
            <button className="outline outline-2 bg-[#56707E] rounded px-2 py-1 mb-4 mt-3" onClick={(e) => submit(e)}>Submit</button>
        </div>
    </div>
  )
}

export default ProfileImageForm