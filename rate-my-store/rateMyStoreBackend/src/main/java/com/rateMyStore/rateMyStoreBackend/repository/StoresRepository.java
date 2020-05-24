package com.rateMyStore.rateMyStoreBackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rateMyStore.rateMyStoreBackend.model.Stores;

@Repository
public interface StoresRepository extends JpaRepository<Stores, Long> {

}
