package com.opticsshop.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.opticsshop.entity.OrderItem;
import com.opticsshop.service.OrderItemService;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/orderItem")
public class OrderItemController {
	
	@Autowired
	private OrderItemService orderItemService;
	
	@GetMapping("/getAll/{orderId}")
	public List<OrderItem> getOrderItems(@PathVariable int orderId){
	
		return orderItemService.getOrderItems(orderId);

	}
}
