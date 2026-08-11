package com.opticsshop.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.opticsshop.entity.Cart;
import com.opticsshop.entity.Customer;
import com.opticsshop.entity.Product;

public interface CartRepository extends JpaRepository<Cart, Integer> {
	
	Optional<Cart> findByCustomerAndProduct(Customer customer,Product product);
	
	List<Cart> findByCustomer(Customer customer);
}
