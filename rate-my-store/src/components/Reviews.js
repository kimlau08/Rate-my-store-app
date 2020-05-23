import React, { Component } from 'react';
import {Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

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


export default class Reviews extends Component { 
    constructor(props) {
        super(props);

        this.state = {
            stores: []
        }

        this.getStoreList=this.getStoreList.bind(this);
        this.createStoreNameList=this.createStoreNameList.bind(this);
    }
 

    createStoreNameList(storeList) {

    }
    
    async getStores() {

        try {
        const response=await axios.get(`http://localhost:8888/rms_api/v1/stores`);
        console.log("getHTTP response:", response.data);
        
        this.setState( {stores : response.data} );

        this.createStoreNameList(response.data);

        } catch (e) {
        console.error(e);
        }
    }

    componentDidMount() {
        this.getStores();
    }

    render() {

        let toContainerId="reviews-container";

        if (this.props.location.swapDisplayCallback !== undefined) { 
            this.props.location.swapDisplayCallback(toContainerId, this.props);
        } else {
            return (<div>
                
                 <Redirect to='/Home' />    //route back to root (App component) depending on state
        
                </div>)
        }
        
        return (  //display already rendered in App.js
            <div id={toContainerId}>
    
                <h1>Welcome to the Reviews page</h1>
    
                {routeToReward()}
    
            </div>
        )

    }
    

}
