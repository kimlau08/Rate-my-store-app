import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import {Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom';
import RouterCarousel from 'react-router-carousel';

import Home from './components/Home';
import Login from './components/Login';
import Reviews from './components/Reviews';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {

      containerOnDisplay: "home-container",

      customer: {},
      authResult: "in_progress"

    }

    
    this.getCustomer=this.getCustomer.bind(this);
    this.setCustomer=this.setCustomer.bind(this);

    this.navBar=this.navBar.bind(this);
    this.swapContainerOnDisplay=this.swapContainerOnDisplay.bind(this);
  }

  getCustomer() {
    return this.state.customer;
  }
  setCustomer(customerObj) {
    this.state.customer = customerObj;
  }


  swapContainerOnDisplay(toContainerId, inputProps) {   

    //turn off display of "from container" in props. display "to container" instead

    if (inputProps.location === undefined) { 
      //Came in from direct React component call instead of Router. No need to swap display

      this.setContainerOnDisplay(toContainerId); //just save the to container and return
      return;
    }

    //Look for the container element to be swapped from
    let fromContainerId=this.state.containerOnDisplay;
    let fromContainerElem=null;
    if (fromContainerId !== ""  &&  fromContainerId !== toContainerId) {
        fromContainerElem = document.getElementById(fromContainerId);
        if (fromContainerElem !== null) {

            document.getElementById(fromContainerId).style.display="none";
        }
    }
  }


  navBar() {
    return (
      <Router>
        <nav className="menu">
          <ul className="menu-bar">
              <li>
              <Link to={{
                      pathname: "/Home",
                      swapDisplayCallback: this.swapContainerOnDisplay,
                    }}>Home</Link>
              </li>
              <li>
              <Link to={{
                      pathname: "/Login",
                      swapDisplayCallback: this.swapContainerOnDisplay,
                      setCustomerCallback: this.setCustomer
                    }}>Login</Link>
              </li>
              <li>
                  <Link to={{
                      pathname: "/Reviews",
                      swapDisplayCallback: this.swapContainerOnDisplay,
                      getCustomerCallback: this.getCustomer
                    }}>Reviews</Link>
              </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/Home" component={Home} />

          <Route exact path="/Login" component={Login} />

          <Route exact path="/Reviews" component={Reviews} />
        </Switch>

      </Router>
    )
  }

  render() {
    return (
      <div className="App">

        {this.navBar()}


      
      </div>
    );
  }
}
