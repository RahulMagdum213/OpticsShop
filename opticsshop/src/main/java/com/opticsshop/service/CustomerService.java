package com.opticsshop.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.opticsshop.dto.CustomerResponseDTO;
import com.opticsshop.dto.LoginRequestDTO;
import com.opticsshop.entity.Customer;
import com.opticsshop.repository.CustomerRepository;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    /////////////
    public CustomerResponseDTO saveCustomer(Customer customer) {

        // Customer Name Validation
        if (customer.getCustomerName() == null || customer.getCustomerName().isBlank()) {
            throw new RuntimeException("Customer name cannot be empty");
        }

        customer.setCustomerName(customer.getCustomerName().trim());

        // Email Validation
        if (customer.getEmail() == null || customer.getEmail().isBlank()) {
            throw new RuntimeException("Email cannot be empty");
        }

        customer.setEmail(customer.getEmail().trim());

        if (customerRepository.existsByEmail(customer.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        // Mobile Validation
        if (String.valueOf(customer.getMobile()).length() != 10) {
            throw new RuntimeException("Mobile number must contain exactly 10 digits");
        }

        if (customerRepository.existsByMobile(customer.getMobile())) {
            throw new RuntimeException("Mobile number already exists");
        }

        // Password Validation
        if (customer.getPassword() == null || customer.getPassword().isBlank()) {
            throw new RuntimeException("Password cannot be empty");
        }

        // City Validation
        if (customer.getCity() == null || customer.getCity().isBlank()) {
            throw new RuntimeException("City cannot be empty");
        }

        customer.setCity(customer.getCity().trim());

       
        // Save Customer
        Customer savedCustomer = customerRepository.save(customer);

        // Entity -> Response DTO
        CustomerResponseDTO response = new CustomerResponseDTO();

        response.setCustomerId(savedCustomer.getCustomerId());
        response.setCustomerName(savedCustomer.getCustomerName());
        response.setEmail(savedCustomer.getEmail());
        response.setMobile(savedCustomer.getMobile());
        response.setDateOfBirth(savedCustomer.getDateOfBirth());
        response.setCity(savedCustomer.getCity());

        return response;
    }
    
    /////////////////
    public List<CustomerResponseDTO> getAllCustomers() {

        List<Customer> customers = customerRepository.findAll();

        List<CustomerResponseDTO> responseList = new ArrayList<>();

        for (Customer customer : customers) {

            CustomerResponseDTO response = new CustomerResponseDTO();

            response.setCustomerId(customer.getCustomerId());
            response.setCustomerName(customer.getCustomerName());
            response.setEmail(customer.getEmail());
            response.setMobile(customer.getMobile());
            response.setDateOfBirth(customer.getDateOfBirth());
            response.setCity(customer.getCity());

            responseList.add(response);

        }

        return responseList;

    }
    
    ////////////////
    public CustomerResponseDTO updateCustomer(Customer customer) {

    	Optional<Customer> optionalCustomer =
    			customerRepository.findById(customer.getCustomerId());

    	if (optionalCustomer.isPresent()) {

    		Customer existingCustomer = optionalCustomer.get();

    		// Name Validation
    		if (customer.getCustomerName() == null || customer.getCustomerName().isBlank()) {
                throw new RuntimeException("Customer name cannot be empty");
            }

            customer.setCustomerName(customer.getCustomerName().trim());

            // Email Validation
            if (customer.getEmail() == null || customer.getEmail().isBlank()) {
                throw new RuntimeException("Email cannot be empty");
            }

            customer.setEmail(customer.getEmail().trim());

            // Duplicate Email Check
            if (!existingCustomer.getEmail().equalsIgnoreCase(customer.getEmail())) {

                if (customerRepository.existsByEmail(customer.getEmail())) {
                    throw new RuntimeException("Email already exists");
                }

            }

            // Mobile Validation
            if (String.valueOf(customer.getMobile()).length() != 10) {
                throw new RuntimeException("Mobile number must contain exactly 10 digits");
            }

            // Duplicate Mobile Check
            if (existingCustomer.getMobile() != customer.getMobile()) {

                if (customerRepository.existsByMobile(customer.getMobile())) {
                    throw new RuntimeException("Mobile number already exists");
                }

            }

            

            // City Validation
            if (customer.getCity() == null || customer.getCity().isBlank()) {
                throw new RuntimeException("City cannot be empty");
            }

            customer.setCity(customer.getCity().trim());

            // Update Fields
            existingCustomer.setCustomerName(customer.getCustomerName());
            existingCustomer.setEmail(customer.getEmail());
            existingCustomer.setMobile(customer.getMobile());
            
            existingCustomer.setDateOfBirth(customer.getDateOfBirth());
            existingCustomer.setCity(customer.getCity());
            
         // Update password only if a new password is provided
            if (customer.getPassword() != null &&
                !customer.getPassword().isBlank()) {

                existingCustomer.setPassword(
                        customer.getPassword().trim()
                );
            }
            
            Customer updatedCustomer = customerRepository.save(existingCustomer);

            CustomerResponseDTO response = new CustomerResponseDTO();

            response.setCustomerId(updatedCustomer.getCustomerId());
            response.setCustomerName(updatedCustomer.getCustomerName());
            response.setEmail(updatedCustomer.getEmail());
            response.setMobile(updatedCustomer.getMobile());
            response.setDateOfBirth(updatedCustomer.getDateOfBirth());
            response.setCity(updatedCustomer.getCity());

            return response;

        } else {

            throw new RuntimeException("Customer not found");

        }
    }
    
    /////////////////////////
    public CustomerResponseDTO getCustomerById(int customerId) {

        Optional<Customer> optionalCustomer = customerRepository.findById(customerId);

        if (optionalCustomer.isPresent()) {

            Customer customer = optionalCustomer.get();

            CustomerResponseDTO response = new CustomerResponseDTO();

            response.setCustomerId(customer.getCustomerId());
            response.setCustomerName(customer.getCustomerName());
            response.setEmail(customer.getEmail());
            response.setMobile(customer.getMobile());
            response.setDateOfBirth(customer.getDateOfBirth());
            response.setCity(customer.getCity());

            return response;

        } else {

            throw new RuntimeException("Customer not found");

        }

    }
    
    ///////////////////
    public CustomerResponseDTO loginCustomer(LoginRequestDTO loginRequestDTO) {

        Optional<Customer> optionalCustomer =
                customerRepository.findByEmail(loginRequestDTO.getEmail());

        if (optionalCustomer.isPresent()) {

            Customer customer = optionalCustomer.get();

            if (!customer.getPassword().equals(loginRequestDTO.getPassword())) {
                throw new RuntimeException("Invalid Password");
            }

            CustomerResponseDTO response = new CustomerResponseDTO();

            response.setCustomerId(customer.getCustomerId());
            response.setCustomerName(customer.getCustomerName());
            response.setEmail(customer.getEmail());
            response.setMobile(customer.getMobile());
            response.setDateOfBirth(customer.getDateOfBirth());
            response.setCity(customer.getCity());

            return response;

        } else {

            throw new RuntimeException("Invalid Email");

        }
    }
}