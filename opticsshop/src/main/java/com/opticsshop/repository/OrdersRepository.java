package com.opticsshop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.opticsshop.entity.Customer;
import com.opticsshop.entity.Orders;

public interface OrdersRepository extends JpaRepository<Orders, Integer> {
	
	List<Orders> findByCustomer(Customer customer);
}
