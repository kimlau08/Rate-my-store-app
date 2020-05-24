import React, { Component } from 'react';
import {Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import '../App.css';
import Rewards from './Rewards';
import SelectList from './SelectList';

import updateIcon from '../assets/update_icon.png';
import deleteIcon from '../assets/delete_icon.png';

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

            customer: {},

            stores: [],
            customers: [],
            storeReviews: [],
            storeCustomers: [],
            selectedStoreId: 1,

            productScore: 5,
            serviceScore: 5,
            cleanScore: 5,
            overallScore: 5,
            comment: ""
        }

        this.getStores = this.getStores.bind(this);
        this.getCustomers = this.getCustomers.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.getStoreObj = this.getStoreObj.bind(this);
        this.getStoreReviews = this.getStoreReviews.bind(this);
        this.getReviewsByStore = this.getReviewsByStore.bind(this);
        this.checkCustomerWriteAccess = this.checkCustomerWriteAccess.bind(this);
        this.displayReviewForm = this.displayReviewForm.bind(this);
        this.displayStoreReviews = this.displayStoreReviews.bind(this);

        this.handleProductScoreChange = this.handleProductScoreChange.bind(this);
        this.handleServiceScoreChange = this.handleServiceScoreChange.bind(this);
        this.handleCleanScoreChange = this.handleCleanScoreChange.bind(this);
        this.handleOverallScoreChange = this.handleOverallScoreChange.bind(this);
        this.handleCommentChange = this.handleCommentChange.bind(this);

        this.handleUpdateReview = this.handleUpdateReview.bind(this);
        this.handleDeleteReview = this.handleDeleteReview.bind(this);
    }
    
    async getStores() {

        try {
        const response=await axios.get(`http://localhost:8888/rms_api/v1/stores`);
        console.log("get stores response:", response.data);
        
        this.setState( {stores : response.data} );

        } catch (e) {
        console.error(e);
        }
    }

    async getCustomers() {

        try {
        const response=await axios.get(`http://localhost:8888/rms_api/v1/customers`);
        console.log("get stores response:", response.data);
        
        this.setState( {customers : response.data} );

        } catch (e) {
        console.error(e);
        }
    }

    async getReviewsByStore(store) {

        try {
        const response=await axios.get(`http://localhost:8888/rms_api/v1/reviewsbystore/${store}`);
        console.log("get reviews by store response:", response.data);
        
        this.setState( {storeReviews : response.data} );

        } catch (e) {
        console.error(e);
        }
    }

    componentDidMount() {
        this.getStores();
        this.getCustomers();
    }

    handleSelect = (selectedValue) =>{
        this.setState({ selectedStoreId: selectedValue  });

        console.log(`selected store Id: ${selectedValue}`);

        //retrieve the reviews for the selected store
        this.getStoreReviews(selectedValue);
    }

    getStoreObj(id) {
        let idx = this.state.stores.findIndex( store => store.id.toString() === id.toString() );

        return this.state.stores[idx];
    }

    displayStoreInfo(selectedValue) {

        let storeObj = this.getStoreObj(selectedValue);

        console.log(storeObj);
        if (storeObj === undefined) {
            return <div></div>
        }
        return ( <div className="store-desc-box">
                    <img className="store-img" src={storeObj.img_lnk} />
                    <div className="store-address">
                        <p className="address-txt">{storeObj.name}</p>
                        <p className="address-txt">{storeObj.street}</p>
                        <p className="address-txt">{storeObj.city}</p>
                        <p className="address-txt">{storeObj.st_zip}</p>
                    </div>
                </div>  
            )           
    }

    getStoreReviews() {

        if (this.state.selectedStoreId === undefined) {
            return;
        }

        this.getReviewsByStore(this.state.selectedStoreId);
    }

    checkCustomerLogin(reviewId) {

        let customer = this.state.customer;

        if (Object.keys(customer).length === 0 && customer.constructor === Object) {
            //customer is not set. tell customer to login first
            document.getElementById("update-result-area-"+reviewId).innerHTML = "Please login first." ;

            return false;
        }

        return true;
    }

    checkCustomerWriteAccess(reviewObj) {

        //write/delete access is given to reviews created by customer
        if ( this.state.customer.id !== reviewObj.customer ) {

            //tell customer that the review can only be updated by the person created it.
            document.getElementById("update-result-area-"+reviewObj.id).innerHTML = "Reviews can only be updated by who created it." ;
    
            return false;
    
        } 
        
        return true;
    }


    handleUpdateReview(event) {

    }
    handleDeleteReview(event) {
        
        let reviewId = event.target.id;
        let reviewList = this.state.storeReviews;

        if (! this.checkCustomerLogin(reviewId) ) {
            return  //customer is not logged in
        }

        let idx = this.state.storeReviews.findIndex( review => 
                                review.id.toString() === reviewId.toString() );

        if (idx >= 0) {
            let reviewObj = this.state.storeReviews[idx];
    
            if  ( !this.checkCustomerWriteAccess(reviewObj) ) {

                return;  //customer does cannot update the review item
            }

            reviewList.splice(idx, 1)
            this.setState( { storeReviews : reviewList } );
        } 
    }

    getCustomerName(customerId) {
        
        let idx = this.state.customers.findIndex( c => c.id.toString() === customerId.toString() )
        return idx >= 0 ? this.state.customers[idx].name : "" ;

    }

    displayReview(review) {

        let reviewId=review.id;
        let customerId = review.customer;

        return (
                <div className="review-container" key={reviewId}>
                    
                    <div className="review-box" >
                        
                        <div className="button-row">
                            <img className="buttomImg" id={reviewId} src={updateIcon} onClick={this.handleUpdateReview} />
                            <img className="buttomImg" id={reviewId} src={deleteIcon} onClick={this.handleDeleteReview} />

                            <p className="result-area" id={"update-result-area-"+reviewId}></p>
                        </div>

                        <div className="review-info-row">
                            <p>Name: {this.getCustomerName(customerId)}    Date: ______  </p>
                        </div>

                        <div className="score-row">
                            <p className="score" id={"prod-score-"+reviewId}>Product score: {review.product}</p>
                            <p className="score" id={"serv-score-"+reviewId}>Service score: {review.service}</p>
                            <p className="score" id={"clean-score-"+reviewId}>Cleanliness score: {review.cleanliness}</p>
                            <p className="score" id={"overall-score-"+reviewId}>Overall score: {review.overall}</p>
                        </div>

                        <p className="comment-txt" id={"comment-"+reviewId}>{review.comment}</p>

                    </div>
                </div>
        )
    }

    displayStoreReviews() {

        return (
            <div className="review-list">
                {this.state.storeReviews.map(review => this.displayReview(review))}
            </div>
        )

    }

    handleProductScoreChange(event) {
        this.setState({productScore: event.target.value}); 
    }
    handleServiceScoreChange(event) {
        this.setState({serviceScore: event.target.value}); 
    }
    handleCleanScoreChange(event) {
        this.setState({cleanScore: event.target.value}); 
    }
    handleOverallScoreChange(event) {
        this.setState({overallScore: event.target.value}); 
    }
    handleCommentChange(event) {
        this.setState({comment: event.target.value}); 
    }

    handleReview(event) {

        if (event.target.elements === undefined) {
            return;
        }

        // let reviewObj={};
        // for (let i=0; i<event.target.elements.length; i++) {
        //     let elem=event.target.elements[i];
        //     if (elem.type !== "text" && elem.type !== "textarea") {
        //         continue;
        //     }

        //     let keyValue={ [elem.name]: elem.value  }
        //     //merge key:value pair to wineObj
        //     Object.assign(wineObj, keyValue);

        // }

        // event.preventDefault();

        // let wineStr=JSON.stringify(wineObj)
        // if (window.confirm("Creating new wine in product catalog")) {
        //     this.props.location.createWineCallBack(wineStr);
        // } 

        // //Redirect back to root (App component)
        // this.setState( { redirectToWineLst: true } ); 

    }

    displayReviewForm() {
        return (
            <form className="review-form" onSubmit={this.handleReview}>
                <div className="select-input-box">
                    <label className="product-score" name="product_rating" >
                        Product score<br />
                        <select className="score-selections" onChange={this.handleProductScoreChange}>
                            <option value="5">5-Superb</option>
                            <option value="4">4-Exceed expectation</option>
                            <option value="3">3-Met Expetation</option>
                            <option value="2">2-Below Average</option>
                            <option value="1">1-Poor</option>
                        </select>
                    </label>
                    <label className="service-score" name="service_rating" onChange={this.handleServiceScoreChange}>
                        Service score<br />
                        <select className="score-selections">
                            <option value="5">5-Superb</option>
                            <option value="4">4-Exceed expectation</option>
                            <option value="3">3-Met Expetation</option>
                            <option value="2">2-Below Average</option>
                            <option value="1">1-Poor</option>
                        </select>
                    </label>
                    <label className="cleanliness-score" name="cleanliness_rating" onChange={this.handleCleanScoreChange}>
                        Cleanliness score<br />
                        <select className="score-selections">
                            <option value="5">5-Superb</option>
                            <option value="4">4-Exceed expectation</option>
                            <option value="3">3-Met Expetation</option>
                            <option value="2">2-Below Average</option>
                            <option value="1">1-Poor</option>
                        </select>
                    </label>
                    <label className="overall-score" name="overall_rating" onChange={this.handleOverallScoreChange}>
                        Overall score<br />
                        <select className="score-selections">
                            <option value="5">5-Superb</option>
                            <option value="4">4-Exceed expectation</option>
                            <option value="3">3-Met Expetation</option>
                            <option value="2">2-Below Average</option>
                            <option value="1">1-Poor</option>
                        </select>
                    </label>
                </div><br />

                <label className="comment-box">
                    Comment<br />
                    <textarea className="textAreaInput" name="comment" rows="3" cols="80"  placeholder="add comment here" onChange={this.handleCommentChange} /><br />
                </label>
                
                <button type="submit" className="AddCommentButton">Add Comment</button>
            </form>
        )
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

        this.state.customer = this.props.location.getCustomerCallback();
        
        return (  
            <div id={toContainerId}>
    
                <br /><br />
                <h1>Tell us about your experience at our stores</h1><br /><br />

                <SelectList className="store-select-list" itemList={this.state.stores} handleSelectCallback={this.handleSelect} />

                {this.displayStoreInfo(this.state.selectedStoreId)}
                {this.displayReviewForm()}

                {routeToReward()}
                {this.displayStoreReviews()}
    
            </div>
        )
    }
}
