import React, { Component } from 'react';
import './App.css';
import {Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
 

import Home from './components/Home';
import Login from './components/Login';
import Reviews from './components/Reviews';

import page1Img from './assets/shopping_experience.jpg';
import page2Img from './assets/dining_experience..jpg';
import page3Img from './assets/customer_experience.jpg';

 
const slideImages = [
  page1Img,
  page2Img,
  page3Img
];
 
const properties = {
  duration: 3000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true,
  pauseOnHover: true,

}
 
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
    this.setContainerOnDisplay=this.setContainerOnDisplay.bind(this);
  }

  getCustomer() {
    return this.state.customer;
  }
  setCustomer(customerObj) {
    this.state.customer = customerObj;
    document.getElementById("user-name").innerHTML = customerObj.name;
  }

  setContainerOnDisplay(container) {   //Do not cause render
    this.state.containerOnDisplay = container;   
  }
  
  swapContainerOnDisplay(toContainerId, inputProps) {   

    //turn off display of "from container" in props. display "to container" instead

    if (inputProps.location === undefined) { 
      //Came in from direct React component call instead of Router. No need to swap display

      this.setContainerOnDisplay(toContainerId); //just save the to container and return
      return;
    }

    if (document.getElementById(toContainerId) !== null) {
      document.getElementById(toContainerId).style.display="";
    }
      
    //slider display needs explicity management
    if (toContainerId === "home-container") {
      document.getElementById("slide-box").style.display=""
    }


    //Look for the container element to be swapped from
    let fromContainerId=this.state.containerOnDisplay;
    let fromContainerElem=null;
    if (fromContainerId !== ""  &&  fromContainerId !== toContainerId) {
        fromContainerElem = document.getElementById(fromContainerId);
        if (fromContainerElem !== null) {

            document.getElementById(fromContainerId).style.display="none";
        }

        //slider display needs explicity management
        if (fromContainerId === "home-container") {
          document.getElementById("slide-box").style.display="none"
        }
    }
  }

  Slideshow = () => {
    return (
      <div className="slide-container" id="slide-box">
        <Slide {...properties}>
          <div className="each-slide">
            <div style={{'backgroundImage': `url(${slideImages[0]})`}}>
              <span>Help Us to Build an Awesome Customer Experience that You would Enjoy</span>
            </div>
          </div>
          <div className="each-slide">
            <div style={{'backgroundImage': `url(${slideImages[1]})`}}>
              <span>Tell Us About Your Last Visit At Our Store</span>
            </div>
          </div>
          <div className="each-slide">
            <div style={{'backgroundImage': `url(${slideImages[2]})`}}>
              <span>Win A Gift Voucher For Your Next Visit</span>
            </div>
          </div>
        </Slide>
      </div>
    )
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
          <p id="user-name"></p>
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

        {this.Slideshow()}

      </div>
    );
  }
}
