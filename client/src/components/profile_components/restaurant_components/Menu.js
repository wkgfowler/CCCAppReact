import axios from "axios";
import AddMenu from "./restaurant_subcomponents/AddMenu";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import { MENUTYPES, WEEKDAYS, formatMenuDayAvailability } from "../../../lib/utils";
import DeleteRestaurantMenuModal from "./restaurant_subcomponents/DeleteRestaurantMenuModal";

const Menu = () => {
    const [menus, setMenus] = useState([]);
    const [valid, setValid] = useState(false);
    const {RestaurantId} = useParams();
    const {user, setUser} = useContext(UserContext);
    const userId = user.id;
    const [menuTypes, setMenuTypes] = useState([]);
    const [typeOfMenu, setTypeOfMenu] = useState("all");
    const [menuFormVisible, setMenuFormVisible] = useState(true);
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenuFormVisible = () => {
        setMenuFormVisible(!menuFormVisible);
        setMenuVisible(false);
    }

    const toggleMenuVisible = () => {
        setMenuVisible(true);
        setMenuFormVisible(false);
    }

    const config = {
        headers: {"token": localStorage.getItem("token")},
        params: {
            RestaurantId: RestaurantId,
            userId: userId
        }
    }

    const getMenus = () => {
        axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/get_menus/${RestaurantId}/${userId}`, config)
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
        axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/get_menus/${RestaurantId}/${userId}/${typeOfMenu}`, config)
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
            <div className="container bg-[#dfebf2] pb-3">
                <div className="flex flex-row pt-4">
                    <div className="flex flex-col w-2/12 pr-24">
                        <p className={`test-lg cursor-pointer ${menuFormVisible ? "font-bold border-y border-l pl-2 border-slate-900" : ""}`} onClick={toggleMenuFormVisible}>Add Menu</p>
                        {menuTypes.map((x) => {
                                return (
                                    <p className={`text-lg cursor-pointer ${menuVisible && typeOfMenu === x ? "font-bold border-y border-l pl-2 border-slate-900" : ""}`} onClick={() => {setTypeOfMenu(x); toggleMenuVisible()}}>{x}</p>
                                )
                            })}
                    </div>
                    <div className="flex flex-col w-10/12 justify-start">
                        <div className={`${menuFormVisible ? "flex" : "hidden"}`}>
                            <AddMenu />
                        </div>
                        <div className={`${menuVisible ? "flex flex-col" : "hidden"}`}>
                            {menus ? menus.map((x, i) => {
                                return (
                                    <div>
                                        <p className="text-3xl font-semibold">{i === 0 ? x.menuType : ""}</p>
                                        <br />
                                        <p className="text-lg">{i === 0 ? `Available ${x.everyday ? "everyday" : formatMenuDayAvailability(WEEKDAYS.map(day => x[day.toLowerCase()] ? day : null))} from ${x.startTime} - ${x.endTime}` : ""}</p>
                                        <br />
                                        <DeleteRestaurantMenuModal menu={x} getSpecificMenu={getSpecificMenu}/>
                                        <img src={`${process.env.REACT_APP_API_ENDPOINT}/${x.menuImage}`} alt="error" />
                                    </div>
                                )
                            }) : ""}
                        </div>
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