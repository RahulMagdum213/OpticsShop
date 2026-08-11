package com.opticsshop.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.opticsshop.entity.OrderItem;
import com.opticsshop.entity.Orders;
import com.opticsshop.repository.OrderItemRepository;
import com.opticsshop.repository.OrdersRepository;

@Service
public class OrderItemService {
	
	@Autowired
	private OrderItemRepository orderItemRepository;
	
	@Autowired
	private OrdersRepository ordersRepository;
	
	public List<OrderItem> getOrderItems(int orderId){

	    Optional<Orders> optionalOrder = ordersRepository.findById(orderId);

	    Orders existingOrder;

	    if(optionalOrder.isPresent()){

	        existingOrder = optionalOrder.get();

	    }else{

	        throw new RuntimeException("Order not found");

	    }

	    return orderItemRepository.findByOrder(existingOrder);

	}
	
}
