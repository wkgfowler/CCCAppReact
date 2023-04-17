import axios from "axios";
import React, { Fragment, useState, useEffect, useContext } from "react";
import {Link, useNavigate} from "react-router-dom";
import { PermissionContext } from "../context/PermissionContext";
import { UserContext } from "../context/UserContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
import { GiFoodChain } from "react-icons/gi"

const Nav = () => {
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
      setUser("")
      setPermission(0)
      navigate('/')
    }, (error) => {
      console.log(error)
    })
  };
    
    return ( 
        <div>
          <div><h5>{user.email}</h5><h4>{permission}</h4></div>

          <nav className="hidden mx-auto w-5/6 border-2 border-slate-50 rounded-full md:flex items-center justify-around py-3 text-slate-50 font-semibold">
                  
                      {permission === 0 ? (<Link to="/" className="hover:text-2xl hover:text-slate-50">Home</Link>) : (<Link to={`/profile/${user.id}`}>Profile</Link>)}
                      <Link className="hover:text-2xl hover:text-slate-50">Restaurants/Bars</Link>
                      <Link className="hover:text-2xl hover:text-slate-50">Food Specials</Link>
                      <Link className="hover:text-2xl hover:text-slate-50">Events</Link>
                      <Link className="hover:text-2xl hover:text-slate-50">Contact</Link>
                      {permission === 0 ? (<Link to="/about" className="hover:text-2xl hover:text-slate-50">About Us</Link>) : (<button type="button" onClick={logout}>Log Out</button>)}
                  
          </nav>

          <nav className="flex md:hidden items-start">
            <div className="flex justify-between">
              <button className="pl-4" onClick={toggleMenu}>{menu ? (<GiHamburgerMenu className="text-3xl cursor-pointer"/>) : 
                (<GrClose className="text-3xl cursor-pointer"/>)}
              </button>
            </div>
            
            <div className={`bg-slate-900 text-slate-50 p-4 absolute ml-12 w-1/2 ${menu ? "hidden" : "grid"}`}>
              {permission === 0 ? (<Link to="/" className="hover:text-2xl hover:text-slate-50">Home</Link>) : (<Link to={`/profile/${user.id}`}>Profile</Link>)}
              <Link className="hover:text-2xl hover:text-slate-50">Restaurants/Bars</Link>
              <Link className="hover:text-2xl hover:text-slate-50">Food Specials</Link>
              <Link className="hover:text-2xl hover:text-slate-50">Events</Link>
              <Link className="hover:text-2xl hover:text-slate-50">Contact Us</Link>
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