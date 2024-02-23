import axios from "axios"

export const restaurantCalls = { 
    getAllRestaurants: (town, towns, time, weekday) => {

        const config = {
                params: {
                    towns: towns,
                    time: time,
                    weekday: weekday
                }
            }

        return axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/getRestaurants/${town}`, config)
    },

    getRestaurant: (id, userId) => {
        const params = {
            id: id,
            user: userId
        }

        return axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/restaurants/${id}`, params)
    }
}