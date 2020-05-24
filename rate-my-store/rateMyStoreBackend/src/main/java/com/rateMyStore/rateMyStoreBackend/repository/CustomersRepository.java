package com.rateMyStore.rateMyStoreBackend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rateMyStore.rateMyStoreBackend.model.Customers;

@Repository
public interface CustomersRepository extends JpaRepository<Customers, Long>{
	
	Optional<Customers> findByEmail(String email);

}
