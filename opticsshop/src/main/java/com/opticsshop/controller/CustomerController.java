					package com.opticsshop.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.opticsshop.dto.CustomerResponseDTO;
import com.opticsshop.dto.LoginRequestDTO;
import com.opticsshop.entity.Customer;
import com.opticsshop.service.CustomerService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/customer")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @PostMapping("/add")
    public CustomerResponseDTO saveCustomer(@RequestBody Customer customer) {

        return customerService.saveCustomer(customer);

    }
    
    @GetMapping("/getAll")
    public List<CustomerResponseDTO> getAllCustomers() {
        return customerService.getAllCustomers();
    }
    
    @PutMapping("/update")
    public CustomerResponseDTO updateCustomer(@RequestBody Customer customer) {

        return customerService.updateCustomer(customer);

    }
    
    @GetMapping("/getById/{customerId}")
    public CustomerResponseDTO getCustomerById(@PathVariable int customerId) {

        return customerService.getCustomerById(customerId);

    }
    
    @PostMapping("/login")
    public CustomerResponseDTO loginCustomer(@RequestBody LoginRequestDTO loginRequestDTO) {

        return customerService.loginCustomer(loginRequestDTO);

    }

}