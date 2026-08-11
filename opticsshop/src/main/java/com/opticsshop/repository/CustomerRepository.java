package com.opticsshop.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.opticsshop.entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Integer>{

	boolean existsByEmail(String email);
	
	boolean existsByMobile(long mobile);
	
	Optional<Customer> findByEmail(String email);
}
