import axios from "axios";
import React, { Fragment, useState, useEffect, useContext } from "react";
import {Link, useNavigate} from "react-router-dom";
import { PermissionContext } from "../context/PermissionContext";
import { UserContext } from "../context/UserContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
import { GiFoodChain } from "react-icons/gi"

const Nav = () => {
  // date
  let thisDate = new Date().getDate();
  let thisMonth = new Date().getMonth();
  let thisYear = new Date().getFullYear();

  //toggle menu
  const [menu, setMenu] = useState(true);
  const toggleMenu = () => {
    setMenu(!menu);
  };

  const {user, setUser} = useContext(UserContext);
  const {permission, setPermission} = useContext(PermissionContext);

  const navigate = useNavigate();

  // LOG OUT FUNCTION
  const logout = async(e) => {
    e.preventDefault();

    const refreshToken = localStorage.getItem('token')

    axios.delete('http://localhost:3000/auth/logout', {
      headers: {
        token: refreshToken
      }
    })
    .then(() => {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('permission')
      setUser("")
      setPermission(0)
      navigate('/')
    }, (error) => {
      console.log(error)
    })
  };
    
    return ( 
        <div>
          <nav className="flex flex-row justify-between">
            <div className="flex justify-start w-1/6 bg-[#56707E]" onClick={() => navigate("/")}>
              <img src={require("../images/TCCE_Logo.jpg")} alt="" className="w-40 h-32 cursor-pointer rounded-r-full border-y-2 border-[#56707E]"/>
            </div>
            
            <div className="flex justify-end justify-around items-center w-5/6 bg-[#56707E] text-white">
              {permission === 0 ? (<Link to="/" className="text-xl hover:text-3xl hover:text-slate-50">HOME</Link>) : (<Link to="/" className="text-xl hover:text-3xl hover:text-slate-50">PROFILE</Link>)}
              <Link to={'/restaurants+bars'} className="text-xl hover:text-3xl hover:text-slate-50">DINING & NIGHTLIFE</Link>
              <Link to={`/specials_and_events`} className="text-xl hover:text-3xl hover:text-slate-50">SPECIALS & EVENTS</Link>
              <Link to={'/contact'} className="text-xl hover:text-3xl hover:text-slate-50">CONTACT US</Link>
              {permission === 0 ? (<Link to="/about" className="text-xl hover:text-3xl hover:text-slate-50">ABOUT US</Link>) : (<button type="button" className="text-xl hover:text-3xl hover:text-slate-50" onClick={logout}>Log Out</button>)}
            </div>
              
          </nav>

          {/* <nav className="hidden mx-auto w-5/6 border-2 border-slate-50 rounded-full md:flex items-center justify-around py-3 text-slate-50 font-semibold">
                  
                      {permission === 0 ? (<Link to="/" className="hover:text-2xl hover:text-slate-50">Home</Link>) : (<Link to={`/profile/${user.id}`}>Profile</Link>)}
                      <Link to={'/restaurants+bars'} className="hover:text-2xl hover:text-slate-50">Restaurants/Bars</Link>
                      <Link to={`/specials_and_events`} className="hover:text-2xl hover:text-slate-50">Specials/Events</Link>
                      <Link className="hover:text-2xl hover:text-slate-50">Contact</Link>
                      {permission === 0 ? (<Link to="/about" className="hover:text-2xl hover:text-slate-50">About Us</Link>) : (<button type="button" onClick={logout}>Log Out</button>)}
                  
          </nav> */}

          <nav className="flex md:hidden items-start">
            <div className="flex justify-between">
              <button className="pl-4" onClick={toggleMenu}>{menu ? (<GiHamburgerMenu className="text-3xl cursor-pointer"/>) : 
                (<GrClose className="text-3xl cursor-pointer"/>)}
              </button>
            </div>
            
            <div className={`bg-[#56707E] text-slate-50 p-4 absolute ml-12 w-1/2 ${menu ? "hidden" : "grid"}`}>
              {permission === 0 ? (<Link to="/" className="hover:text-2xl hover:text-slate-50">Home</Link>) : (<Link to={`/profile/${user.id}`}>Profile</Link>)}
              <Link to={'/restaurants+bars'} className="hover:text-2xl hover:text-slate-50">Restaurants/Bars</Link>
              <Link to={`/specials_and_events`} className="hover:text-2xl hover:text-slate-50">Specials/Events</Link>
              <Link to={'/contact'} className="hover:text-2xl hover:text-slate-50">Contact Us</Link>
              {permission === 0 ? (<Link className="hover:text-2xl hover:text-slate-50">About Us</Link>) : (<button type="button" onClick={logout}>Log Out</button>)}
            </div>
          </nav>

          

          {/* <nav className="bg-cyan-400 md:flex md:items-center md:justify-between">
            
            <div className="flex justify-between items-center">
              <span className="text-2xl inline">Crystal Coast Experience</span> */}
            {/* hamburger menu button */}
              {/* <span>
                <button onClick={toggleMenu}>{menu ? (<GiHamburgerMenu className="text-3xl cursor-pointer 
                  md:hidden block"/>) : (<GrClose className="text-3xl cursor-pointer md:hidden block"/>)}
                </button>
              </span>
            </div>

            <ul className={`md:flex md:items-center md:static md:opacity-100 absolute bg-cyan-400 left-0 md:z-auto py-5 
            md:w-auto md:py-0 py-4 md:pl-0 pl-5 transition-all ease-in duration-500 
            ${menu ? 'opacity-0' : 'opacity-100'}`}>
              <li className="mx-4 my-y md:my-0">
                <Link to="/">Home</Link>
              </li>
              <li className="mx-4 my-y md:my-0">
                <Link to="/">Where to eat?</Link>
              </li>
              <li className="mx-4 my-y md:my-0">
                <Link to="/">About Us</Link>
              </li>
              <li className="mx-4 my-y md:my-0">
                <Link to="/">Contact Us</Link>
              </li>
            </ul>

          </nav> */}
        </div>
    );
}
 
export default Nav;