import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import '../App.css';

const authResultMsgId = "auth-result-msg-id";
let authResult = "";
export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state= {

            name: "",
            email: "",
            password: "",

            customers: {},
            redirectToHome: false
        }

        this.handleLogin=this.handleLogin.bind(this);
// this.handleCancel=this.handleCancel.bind(this);
        this.closeForm=this.closeForm.bind(this);
        this.handleNameChange=this.handleNameChange.bind(this);
        this.handleEmailChange=this.handleEmailChange.bind(this);
        this.handlePasswordChange=this.handlePasswordChange.bind(this);
        this.authenticateUser=this.authenticateUser.bind(this);
        this.authResultReady=this.authResultReady.bind(this);
    }

    authResultReady(authResult) {

        switch (authResult) {

            case "pass":

                console.log(`Successful authentication for email: ${this.state.email}`);
                this.props.location.setCustomerCallback(this.state.customers);  //elevate customer object to App.js
                this.closeForm();  //redirect to home
    
                break;

            case "fail":

                console.log(`Fail to authenticate email: ${this.state.email}`);
                document.getElementById(authResultMsgId).innerHTML = "Incorrect email or password";

                break;

            default: 
                console.log(`Error authenticating customer with email: ${this.state.email}`);
                document.getElementById(authResultMsgId).innerHTML = "Incorrect email or password";
        }

    }


    async authenticateUser(email, password, authResultReady) {

        this.state.authResult = "in_progress"; 
    
        try {
          const response=await axios.get(`http://localhost:8888/rms_api/v1/customers/${email}`);
          console.log("getHTTP response:", response.data);
          
          let authResult = ( password === response.data.password ? "pass" : "fail" )
          this.setState( {customers : response.data} );
    
          authResultReady(authResult);
    
        } catch (e) {
          console.error(e);
          authResultReady(authResult);
        }
      }
    

    handleLogin(event) {

        if (this.state.email === "" || this.state.password === "") {
            
            document.getElementById(authResultMsgId).innerHTML = "Please email and password";
            return;
        }

        event.preventDefault();

        this.authenticateUser(this.state.email, this.state.password, this.authResultReady );
    }
// handleCancel(event) {
//     this.closeForm();  //redirect to home
// }

    handleNameChange(event) {
        this.setState({name: event.target.value}); //update the value state when the field is changed
    }
    handleEmailChange(event) {
        this.setState({email: event.target.value}); //update the value state when the field is changed
    }
    handlePasswordChange(event) {
        this.setState({password: event.target.value});  //store the entered password
    }

    closeForm() {

        if (this.props.location.swapDisplayCallback === undefined) {
            return;
        }
        //Redirect back to root (App component)
        this.setState( { redirectToHome: true } ); 
        //swap back to the Home component display before redirect
        this.props.location.swapDisplayCallback("home-container", this.props);
    }

    render () {
        let toContainerId="login-container";
    
        if (this.props.location.swapDisplayCallback !== undefined) { 
            this.props.location.swapDisplayCallback(toContainerId, this.props);
        } else {
            return (<div>
                
                 <Redirect to='/Home' />    //route back to root (App component) depending on state

                </div>)
        }
    
        return (  
            <div id={toContainerId}>

                
                {this.state.redirectToHome &&
                    <Redirect to='/Home' />    //route back to root (App component) depending on state
                }

                <br /><br />
                <h1>Login. Give a review. and get a voucher</h1><br /><br /><br />

                <div className="input-container">
                    <label className="email-input-box">
                        Email<br />
                        <input className="text-input" type="text" value={this.state.email} placeholder="email" onChange={this.handleEmailChange} onBlur={this.validateEmail} />
            
                    </label>
                    <label className="password-input-box">
                        Pasword<br />
                        <input className="text-input" type="text" value={this.state.password} placeholder="******" onChange={this.handlePasswordChange} />
                    </label>
                    <p id="auth-result-msg-id"></p>
                    
                    <div className="login-button-row">
                        <button className="form-button" onClick={this.handleLogin} >Login</button>  
    {/* <button className="form-button" onClick={this.handleCancel} >Cancel</button>   */}
                    </div>
                </div>
            </div>
        )

    }
    
}
