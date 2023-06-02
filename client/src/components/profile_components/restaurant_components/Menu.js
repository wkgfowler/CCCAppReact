import axios from "axios";
import AddMenu from "./restaurant_subcomponents/AddMenu";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import { MENUTYPES, WEEKDAYS, determineFridayAvailability, determineMondayAvailability, determineSaturdayAvailability, determineSundayAvailability, determineThursdayAvailability, determineTuesdayAvailability, determineWednesdayAvailability, formatMenuDayAvailability } from "../../../lib/utils";

const Menu = () => {
    const [menus, setMenus] = useState([]);
    const [valid, setValid] = useState(false);
    const {RestaurantId} = useParams();
    const {user, setUser} = useContext(UserContext);
    const userId = user.id
    const [menuTypes, setMenuTypes] = useState([])
    const [typeOfMenu, setTypeOfMenu] = useState("all")

    const config = {
        headers: {"token": localStorage.getItem("token")},
        params: {
            RestaurantId: RestaurantId,
            userId: userId
        }
    }

    const getMenus = () => {
        axios.get(`http://localhost:3000/api/get_menus/${RestaurantId}/${userId}`, config)
        .then((response) => {
            const eachMenu = response.data.menus
            const eachMenuType = []
            setValid(response.data.valid)
            for (let i = 0; i < eachMenu.length; i++) {
                eachMenuType.push(eachMenu[i].menuType)
            }
            const eachMenuTypeNoRepeats = [...new Set(eachMenuType)]
            setMenuTypes(eachMenuTypeNoRepeats)
        })
    };

    const getSpecificMenu = () => {
        axios.get(`http://localhost:3000/api/get_menus/${RestaurantId}/${userId}/${typeOfMenu}`, config)
        .then((response) => {
            console.log(response.data)
            setMenus(response.data)
        })
    }
    
    useEffect(() => {
        if (menuTypes.length >= 1) {
            getSpecificMenu();
        } else {
            getMenus();
        }
    }, [typeOfMenu])

    if (valid) {
        return (
            <div className="flex flex-col">

                <div className="flex justify-center">
                    <button><Link to={`/add_menus/${RestaurantId}`}>Add Menu</Link></button>
                </div>

                <div className="flex justify-center">
                    <div className="flex justify-evenly">
                        {menuTypes.map((x) => {
                            return (
                                <p onClick={() => setTypeOfMenu(x)}>{x}</p>
                            )
                        })}
                    </div>
                </div>
                    
                <div className="flex justify-center">
                    <div>
                        {menus ? menus.map((x, i) => {
                            return (
                                <div>
                                    <p>{i === 0 ? x.menuType : ""}</p>
                                    <br />
                                    <p>{i === 0 ? `Available ${x.everyday ? "everyday" : formatMenuDayAvailability(WEEKDAYS.map(day => x[day.toLowerCase()] ? day : null))} from ${x.startTime} - ${x.endTime}` : ""}</p>
                                    {/* <p>{i === 0 ? `Available ${x.everyday ? "everyday" : formatMenuDayAvailability([determineSundayAvailability(x.sunday), determineMondayAvailability(x.monday), determineTuesdayAvailability(x.tuesday), determineWednesdayAvailability(x.wednesday), determineThursdayAvailability(x.thursday), determineFridayAvailability(x.friday), determineSaturdayAvailability(x.saturday)])} from ${x.startTime} - ${x.endTime}` : ""}</p> */}
                                    <img src={`http://localhost:3000/${x.menuImage}`} alt="error" />
                                </div>
                            )
                        }) : ""}
                    </div>
                </div>
            </div>
            
        );
    } else {
        return (
            <div>
                <p>Not Authorized</p>
            </div>
        )
    }
    
}
 
export default Menu;