package com.rateMyStore.rateMyStoreBackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rateMyStore.rateMyStoreBackend.exception.ResourceNotFoundException;
import com.rateMyStore.rateMyStoreBackend.model.Stores;
import com.rateMyStore.rateMyStoreBackend.repository.StoresRepository;

@RestController
@RequestMapping("/rms_api/v1")

public class StoresController {

	@Autowired
	private StoresRepository storesRepository;

	//  get all stores
	  
	
	  @GetMapping("/stores")
	  public List<Stores> getAllStores(Model model) {
	  	
	  return this.storesRepository.findAll();
	  
	  }
	  
	  
	  //get all stores by id

		@GetMapping("/stores/{id}")
		public ResponseEntity<Stores> getStoresById(@PathVariable(value = "id") Long id)
		    throws ResourceNotFoundException {
		    Stores stores = storesRepository.findById(id)
		      .orElseThrow(() -> new ResourceNotFoundException("Store not found. id :: " + id));
		    return ResponseEntity.ok().body(stores);
		}
}
