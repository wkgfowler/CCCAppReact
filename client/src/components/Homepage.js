import React, { Fragment } from "react";
import LogInRegisterBox from "./subcomponents/LogInRegisterBox";

const Homepage = () => {

    return (
        <div className="flex-wrap md:flex-row h-5/6 justify-content-center pt-4">
            <div className="justify-center">
                <p className="text-6xl text-center">The Crystal Coast Experience</p>
            </div>
            
            
            <div className="flex-wrap md:grid md:grid-cols-2 gap-6 justify-items-center items-center pt-6 h-4/6">
                <div className="w-2/3">
                    <p className="text-3xl font-bold">What is the Crystal Coast Experience?</p>
                    <p className="text-lg">The Crystal Coast Experience is about providing local hospitality businesses with a platform to keep customers up-to-date on all their offerings. In turn, both locals and visitors are able to see 
                    what all is available to them on the Crystal Coast. Thanks for dropping by!</p>
                    <br />
                    <p className="text-3xl font-bold">Do you need an account?</p>
                    <p className="text-lg">As a customer, no! But you can create an account in order to follow your favorite restaurants/bars if you would like to know when they announce any specials or events.</p>
                </div>
                <div className="flex justify-content-center items-center border-2 border-slate-50 rounded-lg">
                    <LogInRegisterBox />
                </div>

            </div>
        </div>
    );
}
 
export default Homepage;