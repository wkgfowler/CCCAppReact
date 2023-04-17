import React, {Fragment, useMemo, useState} from "react";
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
import EditInfo from "./components/profile_components/EditInfo";

function App() {
  const [user, setUser] = useState("");
  const [permission, setPermission] = useState(0)
  const userProvider = useMemo(() => ({user, setUser}), [user, setUser]);

  return (
    <div className={permission === 0 ? "bg-hero bg-bottom bg-no-repeat h-screen" : "bg-gradient-to-b from-sky-500 to-blue-400 h-screen"}>
      <Router>
        <UserContext.Provider value={userProvider}>
        <PermissionContext.Provider value={{permission, setPermission}}>
        <Nav/>
        
          <Routes>
            <Route path='/' element={<Homepage/> } />
            <Route path='/about' element={<About/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/reset_password_request' element={<ResetPasswordRequest/>} />
            <Route path='/reset_password/:token' element={<ResetPasswordLink/>} />
            <Route path='/register_restaurant/:token' element={<RegisterRestaurant/>} />
            <Route path='/register/:restaurant/:token' element={<RegisterUserToRestaurant />} />
            <Route path='/profile/:id' element={<Profile/>} />
            <Route path='/edit/:restaurantId' element={<EditInfo />}/>
            
            <Route path='/all_restaurants' element={<AllRestaurants/>} />
            <Route path='/restaurants/:id' element={<Restaurant/>} />
          </Routes>
        </PermissionContext.Provider>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
