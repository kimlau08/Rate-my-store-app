package com.rateMyStore.rateMyStoreBackend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rateMyStore.rateMyStoreBackend.exception.ResourceNotFoundException;
import com.rateMyStore.rateMyStoreBackend.model.Reviews;
import com.rateMyStore.rateMyStoreBackend.repository.ReviewsRepository;

@RestController
@RequestMapping("/rms_api/v1")

public class ReviewsController {

	@Autowired
	private ReviewsRepository reviewsRepository;
	
	//  get all reviews
		  
	  @GetMapping("/reviews")
	  public List<Reviews> getAllReviews(Model model) {
	  	
		  return this.reviewsRepository.findAll();
	  
	  }


   //get all reviews by store

	@GetMapping("/reviews/{store}")
	public List<Reviews> getReviewsByStore(@PathVariable(value = "store") long store) {

	    return this.reviewsRepository.findAllByStore(store);
	}
		
	//  save new review 
		  
	  @PostMapping("/reviews")
	  public Reviews createReviews(@Valid @RequestBody Reviews reviews) {
		  return reviewsRepository.save(reviews);
	  }
		

	  //  Delete review 
	  
	  @DeleteMapping("/reviews/{id}")
	  public Map<String, Boolean> deletedReviews(@PathVariable(value = "id") Long reviewId)
				      throws ResourceNotFoundException {
				      Reviews reviews = reviewsRepository.findById(reviewId)
				    		  .orElseThrow(()-> new ResourceNotFoundException("Reivew not found. id :: " + reviewId));
	  
				      reviewsRepository.delete(reviews);
				      Map<String, Boolean> response = new HashMap<>();
				      
				      //ack msg 
				      response.put("deleted review", Boolean.TRUE);
				      
				      return response;
	  
	  }
	  

	//  Update review
	  
	  @PutMapping("/reviews/{id}")
	  public ResponseEntity<Reviews> updateReviews(@PathVariable(value = "id") Long reviewId,
			    @Valid @RequestBody Reviews reviewsDetails)
			    throws ResourceNotFoundException {
		  		Reviews reviews = reviewsRepository.findById(reviewId)
		    		  .orElseThrow(()-> new ResourceNotFoundException("Review not found for this id :: " + reviewId));
		      
		      
		  		reviews.setCustomer(reviewsDetails.getCustomer()); 
		  		reviews.setStore(reviewsDetails.getStore());
		  		reviews.setProduct(reviewsDetails.getProduct());
		  		reviews.setService(reviewsDetails.getService());
		  		reviews.setCleanliness(reviewsDetails.getCleanliness());
		  		reviews.setOverall(reviewsDetails.getOverall());
		  		reviews.setComment(reviewsDetails.getComment());
		     
		     
		     final Reviews updatedReviews = reviewsRepository.save(reviews);
		     
		     
		     return ResponseEntity.ok(updatedReviews);
		      
		      }
}
