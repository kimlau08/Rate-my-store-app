import React, { Component } from 'react';
import {Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import '../App.css';
import Rewards from './Rewards';
import SelectList from './SelectList';

import updateIcon from '../assets/update_icon.png';
import deleteIcon from '../assets/delete_icon.png';

const AddResultAreaId = "add-result-area";
const UpdateResultAreaIdPrefix = "update-result-area-";    
const defaultStoreId = 1;    //default to first store on list
const defaultReviewId = -1;       
const defaultReviewBoxStyle = {
    border: '1px solid',
    borderColor: 'orange'
}
let uniqueReviewId = 100;

export default class Reviews extends Component { 
    constructor(props) {
        super(props);

        this.state = {

            customer: {},

            stores: [],
            customers: [],
            storeReviews: [],
            storeCustomers: [],
            selectedStoreId: defaultStoreId,
            selectedReviewId: defaultReviewId,

            rewardEnabled: false,

            productScore: 5,
            serviceScore: 5,
            cleanScore: 5,
            overallScore: 5,
            comment: ""
        }

        this.getStores = this.getStores.bind(this);
        this.getCustomers = this.getCustomers.bind(this);
        this.getReviewsByStore = this.getReviewsByStore.bind(this);
        this.deleteReviewById = this.deleteReviewById.bind(this);
        this.updateReviewById = this.updateReviewById.bind(this);

        this.handleSelect = this.handleSelect.bind(this);
        this.clearSelectedReview = this.clearSelectedReview.bind(this);
        this.resetAddReviewArea = this.resetAddReviewArea.bind(this);
        this.getStoreObj = this.getStoreObj.bind(this);
        this.getStoreReviews = this.getStoreReviews.bind(this);
        this.checkCustomerWriteAccess = this.checkCustomerWriteAccess.bind(this);
        this.displayReviewForm = this.displayReviewForm.bind(this);
        this.displayStoreReviews = this.displayStoreReviews.bind(this);
        this.displayReview = this.displayReview.bind(this);
        this.fillReviewForm = this.fillReviewForm.bind(this);  //pre-load input form area with contents to be updated
        this.clearReviewForm = this.clearReviewForm.bind(this);
        this.fillReviewListItem = this.fillReviewListItem.bind(this); //update the selected item in review list after backend is successfully updated.

        this.handleProductScoreChange = this.handleProductScoreChange.bind(this);
        this.handleServiceScoreChange = this.handleServiceScoreChange.bind(this);
        this.handleCleanScoreChange = this.handleCleanScoreChange.bind(this);
        this.handleOverallScoreChange = this.handleOverallScoreChange.bind(this);
        this.handleCommentChange = this.handleCommentChange.bind(this);

        this.handleUpdateReview = this.handleUpdateReview.bind(this);
        this.handleDeleteReview = this.handleDeleteReview.bind(this);
        this.handleReview = this.handleReview.bind(this);

        this.addNewReview = this.addNewReview.bind(this);
        this.routeToReward = this.routeToReward.bind(this);
        this.checkRewardStatus = this.checkRewardStatus.bind(this);
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
        console.log("get customers response:", response.data);
        
        this.setState( {customers : response.data} );

        } catch (e) {
        console.error(e);
        }
    }

    async getReviewsByStore(store) {

        try {
        const response=await axios.get(`http://localhost:8888/rms_api/v1/reviews/${store}`);
        console.log("get reviews by store response:", response.data);
        
        this.setState( {storeReviews : response.data} );

        } catch (e) {
        console.error(e);
        }
    }

    async deleteReviewById (reviewId) {
        
        try {
        const response=await axios.delete(`http://localhost:8888/rms_api/v1/reviews/${reviewId}`);
        console.log("delete review by id response:", response.data);

        } catch (e) {
        console.error(e);
        }
    }

    async updateReviewById (reviewObj) {

        if (this.state.selectedReviewId < 0) {
            console.log('ERROR::No selected review to update');
            return;
        }
        
        try {
            const response=await axios.put(`http://localhost:8888/rms_api/v1/reviews/${this.state.selectedReviewId}`,   reviewObj);
            console.log("update review by id response:", response.data);

            //Successful update. update local review list item to indicate ack
            this.fillReviewListItem(reviewObj);

            //clear review form area
            this.resetAddReviewArea();

            //de-select review item
            this.clearSelectedReview();
    
            } catch (e) {
            console.error(e);
            }
    }


    async createReview (reviewObj) {
        
        try {
            const response=await axios.post(`http://localhost:8888/rms_api/v1/reviews`,   reviewObj);
            console.log("update review by id response:", response.data);

            //Successful update. 

            //clear review form area
            this.resetAddReviewArea();

            //de-select review item
            this.clearSelectedReview();

            this.showMsgInAddArea("Successfully added new review. You've won a gift voucher!")
    
            } catch (e) {
            console.error(e);
            }
    }

    componentDidMount() {
        this.getStores();
        this.getCustomers();
    }

    routeToReward() {

        if (!this.state.rewardEnabled) {
            return <div></div>; 
        }

        return (
            <Router>
                <nav className="menu">
                <ul className="menu-bar">
                    <li>
                    <Link to={{
                            pathname: "/Rewards",
                            checkRewardStatusCallback: this.checkRewardStatus
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

    checkRewardStatus() {
        return this.state.rewardEnabled;
    }

    showMsgInAddArea(Message) {
        document.getElementById(AddResultAreaId).innerHTML = Message;
    }

    clearSelectedReview() {
        //de-select review item by resetting to default
        this.setState(  {selectedReviewId: defaultReviewId} );

        //clear any review item update message in review form area.
        this.showMsgInAddArea("");
    }
    
    resetAddReviewArea() {
        
        //clear any review item update message in review form area.
        this.showMsgInAddArea("");

        //clear add review area
        this.clearReviewForm();
    }
     

    handleSelect(selectedValue) {

        if (selectedValue !== this.state.selectedStoreId) {            
            //disable the reward when changing the store selected
            this.setState( { rewardEnabled : false});
        }

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

    getStoreReviews(selectedValue) {

        if (selectedValue === undefined) {
            return;
        }

        this.getReviewsByStore(selectedValue);
    }

    checkCustomerLogin(checkResultAreaId) {

        let customer = this.state.customer;

        if (Object.keys(customer).length === 0 && customer.constructor === Object) {
            //customer is not set. tell customer to login first
            document.getElementById(checkResultAreaId).innerHTML = "Please login first." ;

            return false;
        }

        return true;
    }

    checkCustomerWriteAccess(reviewObj, checkResultAreaId) {

        //write/delete access is given to reviews created by customer
        if ( this.state.customer.id !== reviewObj.customer ) {

            //tell customer that the review can only be updated by the person created it.
            document.getElementById(checkResultAreaId).innerHTML = "Reviews can only be updated by who created it." ;
    
            return false;
        } 
        
        return true;
    }

    fillReviewForm(reviewObj) {

        document.getElementById("prod-score").value   = reviewObj.product;
        document.getElementById("serv-score").value   = reviewObj.service;
        document.getElementById("clean-score").value  = reviewObj.cleanliness;
        document.getElementById("general-score").value= reviewObj.overall;
        document.getElementById("comment-area").value = reviewObj.comment;

        this.setState ( {
            productScore: reviewObj.product,
            serviceScore: reviewObj.service,
            cleanScore:   reviewObj.cleanliness,
            overallScore: reviewObj.overall,
            comment:      reviewObj.comment
        } );
    }
    clearReviewForm() {
        
        document.getElementById("prod-score").value   = 5;
        document.getElementById("serv-score").value   = 5;
        document.getElementById("clean-score").value  = 5;
        document.getElementById("general-score").value= 5;
        document.getElementById("comment-area").value = "";

        this.setState ( {
            productScore: 5,
            serviceScore: 5,
            cleanScore:   5,
            overallScore: 5,
            comment:      ""
        } );
    }

    fillReviewListItem(reviewObj) {
        
        if (this.state.selectedReviewId < 0) {
            console.log('ERROR::No selected review');
            return;
        }

        let reviewId = this.state.selectedReviewId;

        document.getElementById("prod-score-"+reviewId).innerHTML = `Product score: ${reviewObj.product}`;
        document.getElementById("serv-score-"+reviewId).innerHTML = `Service score: ${reviewObj.service}`;
        document.getElementById("clean-score-"+reviewId).innerHTML = `Cleanliness score: ${reviewObj.cleanliness}`;
        document.getElementById("overall-score-"+reviewId).innerHTML = `Overall score: ${reviewObj.overall}`;
        document.getElementById("comment-"+reviewId).innerHTML = reviewObj.comment;

    }

    handleUpdateReview(event) {
        
        let reviewId = event.target.id;
        let updateResultAreaId = UpdateResultAreaIdPrefix+reviewId;

        if (! this.checkCustomerLogin(updateResultAreaId) ) {
            return  //customer is not logged in
        }

        let idx = this.state.storeReviews.findIndex( review => 
                                review.id.toString() === reviewId.toString() );

        if (idx >= 0) {
            let reviewObj = this.state.storeReviews[idx];
            let updateResultAreaId = UpdateResultAreaIdPrefix+reviewObj.id;
    
            if  ( !this.checkCustomerWriteAccess(reviewObj, updateResultAreaId) ) {

                return;  //customer cannot update the review item
            }

            //customer selected an valid review. 
            this.state.selectedReviewId = reviewId;

            //prep the review form for customer to update. the review handler does actual update
            this.showMsgInAddArea("Updating review with the following content");
            this.fillReviewForm(reviewObj);
        }
    }
    handleDeleteReview(event) {
        
        let reviewId = event.target.id;
        let reviewList = this.state.storeReviews;
        let updateResultAreaId = UpdateResultAreaIdPrefix+reviewId

        if (! this.checkCustomerLogin(updateResultAreaId) ) {
            return  //customer is not logged in
        }

        let idx = this.state.storeReviews.findIndex( review => 
                                review.id.toString() === reviewId.toString() );

        if (idx >= 0) {
            let reviewObj = this.state.storeReviews[idx];
            let updateResultAreaId = UpdateResultAreaIdPrefix+reviewObj.id;
    
            if  ( !this.checkCustomerWriteAccess(reviewObj, updateResultAreaId) ) {

                return;  //customer cannot update the review item
            }

            //delete review from database
            this.deleteReviewById(reviewId);

            //delete review locally for refreshing display
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

        const highlightedReviewBoxStyle = {
            border: '4px solid',
            borderColor: 'blue'
        }
        let reviewBoxStyle = reviewId === this.state.selectedReviewId ?
                                highlightedReviewBoxStyle : defaultReviewBoxStyle;

        return (
                <div className="review-container" key={reviewId}>
                    
                    <div className="review-box" style={reviewBoxStyle} >
                        
                        <div className="button-row">
                            <img className="buttomImg" id={reviewId} src={updateIcon} onClick={this.handleUpdateReview} />
                            <img className="buttomImg" id={reviewId} src={deleteIcon} onClick={this.handleDeleteReview} />

                            <p className="result-area" id={UpdateResultAreaIdPrefix+reviewId}></p>
                        </div>

                        <div className="review-info-row">
                            <p>Name: {this.getCustomerName(customerId)}  </p>
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

    getNewId(reviewObj) {
        let keyValue = { id: ++uniqueReviewId } ;
        Object.assign(reviewObj, keyValue);
        return reviewObj;
    }
    addNewReview(reviewObj) {

        let reviewList = this.state.storeReviews;
        reviewObj = this.getNewId(reviewObj);

        //create new review in backend database
        this.createReview(reviewObj);

        //add new review to local list
        reviewList.push(reviewObj);
        this.setState(  {storeReviews: reviewList } );

        //enable reward after adding new review
        this.setState( { rewardEnabled : true});

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

        event.preventDefault();

        if (! this.checkCustomerLogin(AddResultAreaId) ) {
            return  //customer is not logged in
        }

        //collect form field value in reviewObj
        let reviewObj={};
        for (let i=0; i<event.target.elements.length; i++) {
            let elem=event.target.elements[i];
            if (elem.type !== "select-one" && elem.type !== "textarea") {
                continue;
            }

            let keyValue= elem.type === "select-one" ? { [elem.name]: parseInt(elem.value) } : 
                                                        { [elem.name]: elem.value } ;
            //merge key:value pair to wineObj
            Object.assign(reviewObj, keyValue);
        }

        //add customer id and store id to reviewObj
        let reviewInfo={ customer: parseInt(this.state.customer.id),
                            store: parseInt(this.state.selectedStoreId)};

        Object.assign(reviewObj, reviewInfo);

        if (this.state.selectedReviewId === defaultReviewId) {

            //no review has been selected. Proceed to add review
            this.addNewReview(reviewObj);
            return;
        }
        
        //a review list item has been selected. Proceed to update
        let reviewId = this.state.selectedReviewId;
        let idx = this.state.storeReviews.findIndex( review => 
                                review.id.toString() === reviewId.toString() );

        if ( idx >= 0) {

            //update review in backend database
            this.updateReviewById(reviewObj);

        }
    }

    displayReviewForm() {
        return (
            <form className="review-form" onSubmit={this.handleReview}>
                <p id={AddResultAreaId}></p>
                <div className="select-input-box">
                    <label className="product-score" >
                        Product score<br />
                        <select className="score-selections" id="prod-score" name="product" onChange={this.handleProductScoreChange}>
                            <option value='5'>5-Superb</option>
                            <option value="4">4-Exceed expectation</option>
                            <option value="3">3-Met Expetation</option>
                            <option value="2">2-Below Average</option>
                            <option value="1">1-Poor</option>
                        </select>
                    </label>
                    <label className="service-score" name="service_rating" >
                        Service score<br />
                        <select className="score-selections" id="serv-score" name="service" onChange={this.handleServiceScoreChange}>
                            <option value="5">5-Superb</option>
                            <option value="4">4-Exceed expectation</option>
                            <option value="3">3-Met Expetation</option>
                            <option value="2">2-Below Average</option>
                            <option value="1">1-Poor</option>
                        </select>
                    </label>
                    <label className="cleanliness-score" name="cleanliness_rating" >
                        Cleanliness score<br />
                        <select className="score-selections" id="clean-score" name="cleanliness" onChange={this.handleCleanScoreChange}>
                            <option value="5">5-Superb</option>
                            <option value="4">4-Exceed expectation</option>
                            <option value="3">3-Met Expetation</option>
                            <option value="2">2-Below Average</option>
                            <option value="1">1-Poor</option>
                        </select>
                    </label>
                    <label className="overall-score" name="overall_rating" >
                        Overall score<br />
                        <select className="score-selections" id="general-score" name="overall" onChange={this.handleOverallScoreChange}>
                            <option value="5">5-Superb</option>
                            <option value="4">4-Exceed expectation</option>
                            <option value="3">3-Met Expetation</option>
                            <option value="2">2-Below Average</option>
                            <option value="1">1-Poor</option>
                        </select>
                    </label>
                </div><br />

                <label className="comment-box" name="comment">
                    Comment<br />
                    <textarea className="textAreaInput" id="comment-area" name="comment" rows="3" cols="80"  placeholder="add comment here" onChange={this.handleCommentChange} /><br />
                </label>
                
                <div className="form-button-row">
                    <button type="submit" id="add-review-button" className="review-button">Add Review</button>
                </div>
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

                {this.routeToReward()}

                {this.displayStoreReviews()}
    
            </div>
        )
    }
}
