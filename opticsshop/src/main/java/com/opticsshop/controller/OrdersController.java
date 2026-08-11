package com.opticsshop.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.opticsshop.entity.Orders;
import com.opticsshop.service.OrdersService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/orders")
public class OrdersController {

    @Autowired
    private OrdersService ordersService;

    @PostMapping("/placeOrder/{customerId}")
    public Orders placeOrder(@PathVariable int customerId) {

        return ordersService.placeOrder(customerId);

    }
    
    @GetMapping("/getOrdersByCustomer/{customerId}")
    public List<Orders> getOrdersByCustomer(@PathVariable int customerId){

        return ordersService.getOrdersByCustomer(customerId);

    }
    
    @GetMapping("/getAll")
    public List<Orders> getAllOrders(){

        return ordersService.getAllOrders();

    }

}
