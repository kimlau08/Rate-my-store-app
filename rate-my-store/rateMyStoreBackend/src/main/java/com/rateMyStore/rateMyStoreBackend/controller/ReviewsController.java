package com.rateMyStore.rateMyStoreBackend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
	
	//  get all customers
		  
	  @GetMapping("/reviews")
	  public List<Reviews> getAllReviews(Model model) {
	  	
		  return this.reviewsRepository.findAll();
	  
	  }


	  //get all reviews by store
	
		@GetMapping("/reviewsbystore/{store}")
		public List<Reviews> getReviewsByStore(@PathVariable(value = "store") long store) {

		    return this.reviewsRepository.findAllByStore(store);
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
	  
	  
}
