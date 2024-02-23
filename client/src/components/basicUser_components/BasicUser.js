import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FollowedMenu from "./basicUser_subcomponents/FollowedMenu";
import TodaysSpecials from "./basicUser_subcomponents/TodaysSpecials";
import { formatDateDate, formatDateDay, formatDateMonth } from "../../lib/utils";

const BasicUser = ({user}) => {

    const [followedRestaurants, setFollowedRestaurants] = useState([]);

    

    let date = new Date();
    let currDate = date.getDate();
    let currYear = date.getFullYear();
    let currMonth = date.getMonth();

    
    let [today, setToday] = useState(currDate)
    let [currentMonth, setCurrentMonth] = useState(currMonth + 1);
    let [currentYear, setCurrentYear] = useState(currYear);

    const config = {
        headers: {"token": localStorage.getItem("token")},
        params: {
            id: user.id,
            currentYear: currentYear,
            currentMonth: formatDateMonth(currentMonth),
            today: formatDateDate(today),
            day: formatDateDay(currentYear, formatDateMonth(currentMonth), formatDateDate(today))
        }
    };

    const loadProfile = () => {
        axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/user/followed_restaurants/${user.id}`, config)
        .then((response) => {
            console.log(response.data)
            setFollowedRestaurants(response.data.allRestaurants)
        }, (error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        loadProfile();
    }, [])

    return (
        <div className="flex justify-center">
            <div className="w-[90%]">
                <div className="flex flex-col border-2 border-black w-full h-1/5">
                    <div className="flex flex-row w-full justify-center">
                        <TodaysSpecials restaurants={followedRestaurants}/>
                        
                    </div>
                    <div className="flex flex-row w-full">
                        <div className="flex flex-col border-2 border-black w-1/2 h-[50px]">

                        </div>
                        <div className="flex flex-col border-2 border-black w-1/2 h-[50px]">

                        </div>
                    </div>
                    
                    
                </div>
                <div className="flex flex-row">
                    <div className="flex flex-col w-3/4">
                        <p className="text-2xl font-bold">Followed Businesses</p>
                        {followedRestaurants.length >= 1 ? followedRestaurants.map(restaurant => (
                            <div className="" key={restaurant.id}>
                                <Link to={`/restaurants/${restaurant.id}`}>{restaurant.restaurantName}</Link>
                                <FollowedMenu restaurant={restaurant}/>
                            </div>)) 
                        : 
                            <div>
                                <p className="text-xl text-center">Any restaurants you follow will be displayed here for quicker access.</p>
                            </div>}   
                    </div>
                    <div className="flex flex-col w-1/4 h-screen border-2 border-black">
                        <div className="flex w-full border-2 border-blue-200 h-1/2"></div>
                        <div className="flex w-full border-2 border-blue-200 h-1/2"></div>

                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default BasicUser;