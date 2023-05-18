import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { formatAddressGeocode } from "../../../../lib/utils";

const Map = ({restaurant}) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyCNqn6sUDtJ_ch2lbAf4JyD8rGrByP51Eo"
    });

    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)

    const getCoordinates = () => {
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${restaurant.streetAddress},+${restaurant.town},+NC&key=AIzaSyCNqn6sUDtJ_ch2lbAf4JyD8rGrByP51Eo`)
        .then((response) => {
            console.log(response.data.results[0].geometry.location)
            setLatitude(response.data.results[0].geometry.location.lat)
            setLongitude(response.data.results[0].geometry.location.lng)
        }, (error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        console.log(restaurant)
        getCoordinates()
    })

    return (
        <div>
            {!isLoaded ? (
                <div>Loading...</div>
            ) : (
                <GoogleMap zoom={10} center={{lat: latitude, lng: longitude}} mapContainerClassName="w-1/2 h-1/2"></GoogleMap>
            )
            }
        </div>
    );
}
 
export default Map;