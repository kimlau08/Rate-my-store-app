import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import {Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import Home from './components/Home';
import Login from './components/Login';
import Reviews from './components/Reviews';

let authResult = false;
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {

      containerOnDisplay: "home-container",

      customer: {},
      authResult: "in_progress"

    }

// this.authenticateUser=this.authenticateUser.bind(this);
    this.navBar=this.navBar.bind(this);
    this.swapContainerOnDisplay=this.swapContainerOnDisplay.bind(this);
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

// async authenticateUser(email, password, authResultReady) {

//   this.state.authResult = "in_progress"; 

//   try {
//     const response=await axios.get(`http://localhost:8888/rms_api/v1/customers/${email}`);
//     console.log("getHTTP response:", response.data);
    
//     let authResult = ( password === response.data.password ? "pass" : "fail" )
//     this.setState( {authResult: authResult });
//     this.setState( {customer : response.data} );

//     authResultReady(authResult);

//   } catch (e) {
//     console.error(e);
//   }
// }

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
  {/* <li>
  <Link to={{
          pathname: "/Our stores",
          swapDisplayCallback: this.swapContainerOnDisplay,
        }}>Stores</Link>
  </li>  */}
              <li>
              <Link to={{
                      pathname: "/Login",
                      authenticateUserCallback: this.authenticateUser,
                      swapDisplayCallback: this.swapContainerOnDisplay,
                    }}>Login</Link>
              </li>
              <li>
                  <Link to={{
                      pathname: "/Reviews",
                      swapDisplayCallback: this.swapContainerOnDisplay,
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

        {Home}
        
      
      </div>
    );
  }
}
