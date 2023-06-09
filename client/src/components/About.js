import React from "react";
import AdditionalInfo from "./profile_components/restaurant_components/restaurant_subcomponents/AdditionalInfo";

const About = () => {

    return (
        <div className="container">
            <div className="flex flex-row justify-center pt-5">
                <div className="w-1/5"></div>
                <div>
                    <p className="text-3xl font-bold">What is the Crystal Coast Experience?</p>
                    <p className="text-lg">The Crystal Coast Experience is about providing local hospitality businesses with a platform to keep customers up-to-date on all their offerings. In turn, both locals and visitors are able to see 
                    what all is available to them on the Crystal Coast. Thanks for dropping by!</p>
                    <br />
                    <p className="text-3xl font-bold">Do you need an account?</p>
                    <p className="text-lg">As a customer, no! But you can create an account in order to follow your favorite restaurants/bars if you would like to know when they announce any specials or events.</p>
                </div>
                <div className="w-1/5"></div>
                    
            </div>
            
            {/* <h1>About Us</h1>
                <h4>Crystal Coast Cuisine is geared towards providing both customers and restaurant managers with a <br/>centralized service for dining experiences on the Crystal Coast. The area is blessed with many <br/>privately owned establishments that customers may never hear of. Here, every <br/>restaurant is visible and separated by their respective town.</h4><br/>
                <h4>Another service provided is the ability for restaurants to post and update their daily specials <br/>which in turn, allows the customers to be more informed. Thanks for stopping by! Stay salty!</h4>
            */}
            
        </div>
        
    );
}
 
export default About;