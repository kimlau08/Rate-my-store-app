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
import com.rateMyStore.rateMyStoreBackend.model.Customers;
import com.rateMyStore.rateMyStoreBackend.model.Reviews;
import com.rateMyStore.rateMyStoreBackend.repository.CustomersRepository;


@RestController
@RequestMapping("/rms_api/v1")


public class CustomersController {

	@Autowired
	private CustomersRepository customersRepository;

	//  get all customers
		  
	
	  @GetMapping("/customers")
	  public List<Customers> getAllCustomers(Model model) {
	  	
	  return this.customersRepository.findAll();
	  
	  }
	  
	  
  //get a customer by email

	@GetMapping("/customers/{email}")
	public ResponseEntity<Customers> getCustomersByEmail(@PathVariable(value = "email") String email)
	    throws ResourceNotFoundException {
	    Customers customers = customersRepository.findByEmail(email)
	      .orElseThrow(() -> new ResourceNotFoundException("Customer not found. Email :: " + email));
	    return ResponseEntity.ok().body(customers);
	}
}
