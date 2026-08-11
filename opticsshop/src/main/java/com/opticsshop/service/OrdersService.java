package com.opticsshop.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.opticsshop.entity.*;
import com.opticsshop.repository.CartRepository;
import com.opticsshop.repository.CustomerRepository;
import com.opticsshop.repository.OrderItemRepository;
import com.opticsshop.repository.OrdersRepository;
import com.opticsshop.repository.ProductRepository;

@Service
public class OrdersService {
	
	@Autowired
	private OrdersRepository ordersRepository;
	
	@Autowired
	private CustomerRepository customerRepository;
	
	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	private CartRepository cartRepository;
	
	@Autowired
	private OrderItemRepository orderItemRepository;
	
	////////////////
	public Orders placeOrder(int customerId) {

	    Optional<Customer> optionalCustomer = customerRepository.findById(customerId);

	    Customer existingCustomer;

	    if (optionalCustomer.isPresent()) {
	        existingCustomer = optionalCustomer.get();
	    } else {
	        throw new RuntimeException("Customer not found");
	    }

	    List<Cart> cartList = cartRepository.findByCustomer(existingCustomer);

	    if (cartList.isEmpty()) {
	        throw new RuntimeException("Cart is empty");
	    }

	    double totalAmount = 0;

	    for (Cart cart : cartList) {

	        totalAmount += cart.getProduct().getPrice() * cart.getQuantity();

	    }

	    Orders order = new Orders();

	    order.setCustomer(existingCustomer);
	    order.setOrderDate(LocalDate.now());
	    order.setStatus("Placed");
	    order.setTotalAmount(totalAmount);

	    Orders savedOrder = ordersRepository.save(order);

	    for (Cart cart : cartList) {

	        OrderItem orderItem = new OrderItem();

	        orderItem.setOrder(savedOrder);
	        orderItem.setProduct(cart.getProduct());
	        orderItem.setQuantity(cart.getQuantity());
	        orderItem.setPrice(cart.getProduct().getPrice());

	        orderItemRepository.save(orderItem);

	        Product product = cart.getProduct();

	        product.setStock(product.getStock() - cart.getQuantity());

	        productRepository.save(product);

	        cartRepository.delete(cart);

	    }

	    return savedOrder;
	    
	}
	
	public List<Orders> getOrdersByCustomer(int customerId){
		Optional<Customer> optionalCustomer = customerRepository.findById(customerId);

	    Customer existingCustomer;

	    if (optionalCustomer.isPresent()) {
	        existingCustomer = optionalCustomer.get();
	        
	    } else {
	        throw new RuntimeException("Customer not found");
	    }
	    
	    return ordersRepository.findByCustomer(existingCustomer);

	}
	///////////////////
	
	public List<Orders> getAllOrders(){

	    return ordersRepository.findAll();

	}
	
}
