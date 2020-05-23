import React from 'react';
import {Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom';

import Rewards from './Rewards';

function routeToReward() {
    return (
        <Router>
            <nav className="menu">
            <ul className="menu-bar">
                <li>
                <Link to={{
                        pathname: "/Rewards",
                        }}>Click here to get a $5 voucher barcode</Link>
                </li>
            </ul>
            </nav>
            <Switch>
                <Route exact path="/Rewards" component={Rewards} />
            </Switch>

        </Router>
    )
}


export default function Reviews(props) {
    
    let toContainerId="reviews-container";

    if (props.location.swapDisplayCallback !== undefined) {
        props.location.swapDisplayCallback(toContainerId, props);
    }

    return (  //display already rendered in App.js
        <div id={toContainerId}>

            <h1>Welcome to the Reviews page</h1>

            {routeToReward()}

        </div>
    )
}
