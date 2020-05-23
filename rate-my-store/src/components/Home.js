import React from 'react';

export default function Home(props) {

    if (props.location.swapDisplayCallback !== undefined) {
        props.location.swapDisplayCallback("home-container", props);
    }

    return (  //display already rendered in App.js
        <div>

            <h1>Welcome to the Home page</h1>

        </div>
    )
}
