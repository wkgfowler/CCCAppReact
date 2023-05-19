import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api"
import axios from "axios";
import { Fragment, useEffect, useState } from "react";

const Map = ({restaurant}) => {

    const containerStyle = {
        width: '400px',
        height: '400px'
      };

    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)

    const getCoordinates = () => {
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${restaurant.streetAddress},+${restaurant.town},+NC&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`)
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
            <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                <GoogleMap zoom={13} center={{lat: latitude, lng: longitude}} mapContainerStyle={containerStyle}>
                    <MarkerF position={{lat: latitude, lng: longitude}}/>
                </GoogleMap>
            </LoadScript>
        </div>
    );
}
 
export default Map;