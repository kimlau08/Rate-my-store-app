import React, { Component } from 'react';
import {Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import '../App.css';
import Rewards from './Rewards';
import SelectList from './SelectList';

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
            stores: [],
            selectedStoreId: 1
        }

        this.getStores = this.getStores.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }
    
    async getStores() {

        try {
        const response=await axios.get(`http://localhost:8888/rms_api/v1/stores`);
        console.log("getHTTP response:", response.data);
        
        this.setState( {stores : response.data} );

        } catch (e) {
        console.error(e);
        }
    }

    componentDidMount() {
        this.getStores();
    }

    handleSelect = (selectedValue) =>{
        this.setState({ selectedStoreId: selectedValue  });

        console.log(`selected store Id: ${selectedValue}`);
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
    
                <h1>Tell us about your experience at our stores</h1>

                <SelectList className="store-select-list" itemList={this.state.stores} handleSelectCallback={this.handleSelect} />

                {routeToReward()}
    
            </div>
        )
    }
}
