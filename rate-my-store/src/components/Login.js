import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';


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
            isLoading: false,
            redirectToHome: false
        }

        this.handleLogin=this.handleLogin.bind(this);
        this.handleCancel=this.handleCancel.bind(this);
        this.closeForm=this.closeForm.bind(this);
        this.handleNameChange=this.handleNameChange.bind(this);
        this.handleEmailChange=this.handleEmailChange.bind(this);
        this.handlePasswordChange=this.handlePasswordChange.bind(this);
        this.authResultReady=this.authResultReady.bind(this);
    }

// sleep(msec) {
//     const startTime = Date.now();
//     let newTime;
//     do {
//         newTime = Date.now();
//     } while (newTime - startTime < msec);
// }
// checkAuthResult() {

//     //poll auth result for 10 times in 10 seconds. 
//     for (let i=0; i<10; i++) {

//         this.sleep(1000);

//         authResult = this.props.location.getAuthResultCallback();
//         if (authResult === "pass" || authResult === "fail" ) {
//             return authResult;
//         }
//     }
// }
    authResultReady(authResult) {

let a=0;
        switch (authResult) {

            case "pass":

                console.log(`Successful authentication for email: ${this.state.email}`);
                this.closeForm();  //redirect to home
    
                break;

            case "fail":

                console.log(`Fail to authenticate email: ${this.state.email}`);
                document.getElementById(authResultMsgId).innerHTML = "Incorrect email or password";

                break;

            default: 
                console.log(`Error authenticating customer with email: ${this.state.email}`);
                document.getElementById(authResultMsgId).innerHTML = "Error during login";
        }

    }
    handleLogin(event) {

        if (this.state.email === "" || this.state.password === "") {
            
            document.getElementById(authResultMsgId).innerHTML = "Please email and password";
            return;
        }

        event.preventDefault();

        this.props.location.authenticateUserCallback(this.state.email, this.state.password, this.authResultReady );
    }
    handleCancel(event) {
        this.closeForm();  //redirect to home
    }

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
        }
    
        return (  //display already rendered in App.js
            <div id={toContainerId}>

                
                {this.state.redirectToHome &&
                    <Redirect to='/Home' />    //route back to root (App component) depending on state
                }

                <p className="login-title">Login. Give a review. and get a voucher</p>

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
                    
                    <div className="button-row">
                        <button className="form-button" onClick={this.handleLogin} >Login</button>  
                        <button className="form-button" onClick={this.handleCancel} >Cancel</button>  
                    </div>
                </div>
            </div>
        )

    }
    
}
