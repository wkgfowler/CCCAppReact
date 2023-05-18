import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card"

const AllRestaurants = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [town, setTown] = useState("all")

    const navigate = useNavigate();
    const getRestaurants = () => {
        console.log(town)
        axios.get(`http://localhost:3000/getRestaurants/${town}`)
        .then((response) => {
            setRestaurants(response.data)
        }, (error) => {
            console.log(error)
        })
    }
    
    useEffect(() => {
        getRestaurants()
    }, [town])

    return (
        <Fragment>
            <p className="text-center text-4xl py-4">Restaurants and Bars</p>
            <div className="flex flex-col justify-center gap-2">
                <div className="flex flex-row justify-center">
                    <label className="pr-2">Filter by town:</label>
                    <select name="town" id="town" onChange={() => setTown(document.getElementById("town").value)}>
                        <option value="all">--Select a town--</option>
                        <option value="Atlantic Beach">Atlantic Beach</option>
                        <option value="Morehead City">Morehead City</option>
                    </select>
                </div>
                <div className="flex justify-center gap-2">
                    {restaurants.map(restaurant => (
                        <Card className="w-72 h-72 bg-slate-400 rounded-lg" key={restaurant.id}>
                            <img className="w-full h-1/2 px-1 pt-1" src={`http://localhost:3000/${restaurant.profileImage}`} alt="not working"/>
                            <p className="text-center text-lg">{restaurant.restaurantName}</p>
                            <p>{restaurant.description}</p>
                            <div className="flex justify-center">
                                <button type="button" className="bg-cyan-400 px-1 rounded-lg"><Link to={`/restaurants/${restaurant.id}`}>Visit restaurant page</Link></button>
                            </div>
                        </Card>
                    ))}
                </div>
                
            </div>
        </Fragment>
    );
}
 
export default AllRestaurants;