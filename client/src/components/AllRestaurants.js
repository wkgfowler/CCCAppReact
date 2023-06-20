import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card"
import { TOWNS } from "../lib/utils";

const AllRestaurants = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [towns, setTowns] = useState([]);
    const [town, setTown] = useState("all")

    const addTown = (townName) => {
        let town = document.getElementById(townName)
        if (town.checked) {
            setTowns(towns => [...towns, town.value])
        } else if (!town.checked && towns.includes(town.value)) {
            setTowns(towns.filter(x => x !== town.value))
        }
    }

    const navigate = useNavigate();

    const config = {
        params: {
            towns: towns
        }
    }

    const getRestaurants = () => {
        console.log(town)
        axios.get(`http://localhost:3000/api/getRestaurants/${town}`, config)
        .then((response) => {
            setRestaurants(response.data)
        }, (error) => {
            console.log(error)
        })
    }
    
    useEffect(() => {
        getRestaurants()
    }, [towns])

    return (
        <div className="container">
            <div className="flex flex-row w-full">
                <div className="flex flex-col w-1/4">
                    <div className="flex flex-col w-full pl-8">
                        <p className="text-2xl font-semibold">View by:</p>
                        
                        <p className="font-semibold border-y mt-2 mb-2 ">Town</p>
                        {TOWNS.map((town) => (
                            <div className="flex flex-row">
                                <input type="checkbox" name={town} id={town} className="mr-2" value={town} onClick={() => addTown(town)}/>
                                <label htmlFor="">{town}</label>
                            </div>
                        ))}
                    </div>
                </div>
                
                
                <div className="flex flex-col w-3/4">
                    <p className="text-center text-4xl py-4">Restaurants and Bars</p>
                    <div className="flex flex-col justify-center gap-2">
                        <div className="flex flex-row justify-center">
                            <label className="pr-2">Filter by town:</label>
                            <select name="town" id="town" onChange={() => setTown(document.getElementById("town").value)}>
                                <option value="all">All</option>
                                <option value="Atlantic Beach">Atlantic Beach</option>
                                <option value="Morehead City">Morehead City</option>
                            </select>
                        </div>
                        <div className="flex flex-wrap justify-center gap-2">
                            {restaurants.map(restaurant => (
                                <Card className="w-72 h-72 bg-slate-400 rounded-lg" key={restaurant.id}>
                                    <img className="w-full h-1/2 px-1 pt-1 rounded-lg" src={`http://localhost:3000/${restaurant.profileImage}`} alt="not working"/>
                                    <p className="text-center text-lg">{restaurant.restaurantName}</p>
                                    <p className="truncate">{restaurant.description}</p>
                                    <div className="flex justify-center">
                                        <button type="button" className="bg-cyan-400 px-1 rounded-lg"><Link to={`/restaurants/${restaurant.id}`}>Visit restaurant page</Link></button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                
                
                </div>
            </div>
            
        </div>
    );
}
 
export default AllRestaurants;