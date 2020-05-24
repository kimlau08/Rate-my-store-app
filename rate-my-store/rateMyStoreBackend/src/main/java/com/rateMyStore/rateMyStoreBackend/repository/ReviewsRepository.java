package com.rateMyStore.rateMyStoreBackend.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.rateMyStore.rateMyStoreBackend.model.Reviews;

public interface ReviewsRepository extends JpaRepository<Reviews, Long>{
	List<Reviews> findAllByStore(long store);
}
