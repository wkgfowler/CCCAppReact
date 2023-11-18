import { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { FaChevronDown, FaChevronLeft } from "react-icons/fa";

const AdminUsersTable = ({allUsers, userRoles, setUserRoles}) => {

    const [visible, setVisible] = useState(false);

    const changeVisibility = () => {
        setVisible(!visible)
    }

    const filterUserRoles = (roleType) => {
        let role = document.getElementById(roleType)
        if (role.checked) {
            setUserRoles(userRoles => [...userRoles, role.value])
        } else if (!role.checked && userRoles.includes(role.value)) {
            setUserRoles(userRoles.filter(x => x !== role.value))
        }
    }

    return (
        <div className="flex flex-col justify-center">
            <div className="flex flex-row justify-center pb-3">
                <p className="text-2xl text-center font-bold">Users Table</p>
                <button onClick={changeVisibility}>{visible ? <FaChevronDown className="mt-2 ml-4"/> : <FaChevronLeft className="mt-2 ml-4"/>}</button>
            </div>
            <div className={`${visible ? "flex flex-col" : "hidden"}`}>
                <div className="flex flex-row justify-between py-2">
                    <div>
                        <p className="text-xl">Total Users: {allUsers.length}</p>
                    </div>
                    
                    <div className="flex flex-row">
                        <p className="pr-3">Filter by:</p>
                        <input type="checkbox" name="admin" id="admin" className="mr-1" value="admin" onClick={() => filterUserRoles("admin")}/>
                        <label htmlFor="" className="pr-3">Admin</label>
                        <input type="checkbox" name="restaurant" id="restaurant" className="mr-1" value="restaurant" onClick={() => filterUserRoles("restaurant")}/>
                        <label htmlFor="" className="pr-3">Restaurant</label>
                        <input type="checkbox" name="basic" id="basic" className="mr-1" value="basic" onClick={() => filterUserRoles("basic")}/>
                        <label htmlFor="" className="pr-3">Basic</label>
                    </div>
                    
                </div>
                
                <div>
                    <table className="w-full">
                    <thead>
                        <th className="text-xl">User Email</th>
                        <th className="pl-8 text-xl">Role Level</th>
                    </thead>

                    <tbody>
                    {allUsers.map(user => (
                       user.Roles.length > 1 ?  
                                <tr className="border-y border-slate-500" key={user.id}>
                                    <td className="pt-2 py-2 font-medium">{user.email}</td>
                                    <td className="pt-2 py-2 font-medium pl-8">{user.Roles[1].role}</td>
                                </tr>
                            :
                                <tr className="border-y border-slate-500" key={user.id}>
                                    <td className="pt-2 py-2 font-medium">{user.email}</td>
                                    <td className="pt-2 py-2 font-medium pl-8">{user.Roles[0].role}</td>
                                </tr>
                    ))}
                    </tbody>
                </table>
                </div>
                
            </div>
        </div>
    );
}
 
export default AdminUsersTable;