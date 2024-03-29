import React, {Fragment, useEffect, useMemo, useState} from "react";
import './App.css';

// routes
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// components
import Nav from "./components/Nav";
import Homepage from "./components/Homepage";
import About from "./components/About";
import Login from "./components/auth_components/Login";
import Register from "./components/auth_components/Register";
import RegisterRestaurant from "./components/auth_components/RegisterRestaurant";
import { UserContext } from "./context/UserContext";
import { PermissionContext } from "./context/PermissionContext";
import Restaurant from "./components/Restaurant";
import AllRestaurants from "./components/AllRestaurants";
import Profile from "./components/Profile";
import RegisterUserToRestaurant from "./components/auth_components/RegisterUserToRestaurant";
import ResetPasswordRequest from "./components/auth_components/ResetPasswordRequest";
import ResetPasswordLink from "./components/auth_components/ResetPasswordLink";
import EditInfo from "./components/profile_components/restaurant_components/EditInfo";
import Specials from "./components/profile_components/restaurant_components/Specials";
import SpecialsForm from "./components/profile_components/restaurant_components/restaurant_subcomponents/SpecialsForm";
import SpecialsEvents from "./components/SpecialsEvents";
import { LoadScript } from "@react-google-maps/api";
import Menu from "./components/profile_components/restaurant_components/Menu";
import AddMenu from "./components/profile_components/restaurant_components/restaurant_subcomponents/AddMenu";
import Contact from "./components/Contact";
import InformationForm from "./components/profile_components/restaurant_components/restaurant_subcomponents/initial_login_form/InformationForm"

function App() {
  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem('user');
    return JSON.parse(userData) || null
  });
  const [permission, setPermission] = useState(() => {
    const permissionData = localStorage.getItem('permission');
    return Number(permissionData) || 0
  })
  // const userProvider = useMemo(() => ({user, setUser}), [user, setUser]);

  // useEffect(() => {
  //   localStorage.removeItem('user')
  //   localStorage.removeItem('permission')
  // }, [])

  return (
    <div className={permission === 0 ? "bg-white bg-bottom bg-no-repeat min-h-screen" : "bg-white min-h-screen"}>
      <Router>
        <LoadScript 
          googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
          async
        >
        <UserContext.Provider value={{user, setUser}}>
        <PermissionContext.Provider value={{permission, setPermission}}>
        <Nav/>
        
          <Routes>
            <Route path='/' element={<Homepage/> } />
            <Route path='/about' element={<About/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/contact' element={<Contact/>} />
            <Route path='/reset_password_request' element={<ResetPasswordRequest/>} />
            <Route path='/reset_password/:token' element={<ResetPasswordLink/>} />
            <Route path='/register_restaurant/:token' element={<RegisterRestaurant/>} />
            <Route path='/register/:restaurant/:token' element={<RegisterUserToRestaurant />} />
            <Route path='/information_form/:RestaurantId' element={<InformationForm />} />
            {/* <Route path='/profile/:id' element={<Profile/>} /> */}
            <Route path='/edit_information/:RestaurantId' element={<EditInfo />}/>
            <Route path='/edit_specials/:RestaurantId' element={<Specials />} />
            <Route path='/add_specials/:RestaurantId' element={<SpecialsForm />} />
            <Route path='/edit_menus/:RestaurantId' element={<Menu />} />
            <Route path='/add_menus/:RestaurantId' element={<AddMenu />} />
            <Route path='/information_form/:RestaurantId' element={<InformationForm />} />
            
            <Route path='/restaurants+bars' element={<AllRestaurants/>} />
            <Route path='/restaurants/:id' element={<Restaurant/>} />
            <Route path='/specials_and_events' element={<SpecialsEvents />} />
          </Routes>
        </PermissionContext.Provider>
        </UserContext.Provider>
        </LoadScript>
      </Router>
    </div>
  );
}

export default App;
