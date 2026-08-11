package com.opticsshop.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.opticsshop.entity.Cart;
import com.opticsshop.entity.Customer;
import com.opticsshop.entity.Product;
import com.opticsshop.repository.CartRepository;
import com.opticsshop.repository.CustomerRepository;
import com.opticsshop.repository.ProductRepository;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ProductRepository productRepository;

    ///////////////
    public Cart addToCart(Cart cart) {
    	
    	if(cart.getQuantity() <= 0){
    	    throw new RuntimeException("Quantity must be greater than zero");
    	}
    	Optional<Customer> optionalCustomer =customerRepository.findById(cart.getCustomer().getCustomerId());
    	
    	Customer existingCustomer;
    	if(optionalCustomer.isPresent()) {
    		existingCustomer = optionalCustomer.get();
    	}else {

    		throw new RuntimeException("Customer not found");
    	}
    	
    	Product existingProduct;
    	Optional<Product> optionalProduct =productRepository.findById(cart.getProduct().getProductId());

    	if (optionalProduct.isPresent()) {
    		
    		existingProduct = optionalProduct.get();
    	}else {
    	    throw new RuntimeException("Product not found");
    	}
    	
    	Optional<Cart> optionalCart = cartRepository.findByCustomerAndProduct(existingCustomer,existingProduct);
    	
    	if(optionalCart.isPresent()) {
    		Cart existingCart = optionalCart.get();
    		
    		int totalQuantity = existingCart.getQuantity() + cart.getQuantity();

    		if(totalQuantity > existingProduct.getStock()){
    		    throw new RuntimeException("Requested quantity exceeds available stock");
    		}

    		existingCart.setQuantity(totalQuantity);
    		
    		
    		return cartRepository.save(existingCart);
    	}else {
    		
    		if(cart.getQuantity() > existingProduct.getStock()){
    		    throw new RuntimeException("Requested quantity exceeds available stock");
    		}
    		cart.setCustomer(existingCustomer);
    		cart.setProduct(existingProduct);
    		
    		
    		return cartRepository.save(cart);
    	}
    }
    ///////////////////
    public List<Cart> getCartByCustomer(int customerId){
    	Optional<Customer> optionalCustomer =customerRepository.findById(customerId);
    	
    	
    	Customer existingCustomer;
    	if(optionalCustomer.isPresent()) {
    		
    		existingCustomer = optionalCustomer.get();
    		
    	}else {
    		throw new RuntimeException("Customer not found");
    	}
    	
    	return cartRepository.findByCustomer(existingCustomer);
	
    }
    ///////////////
    public Cart updateCart(Cart cart) {
    	
    	Optional<Cart> optionalCart = cartRepository.findById(cart.getCartId());
    	
    	Cart existingCart;
    	if(optionalCart.isPresent()) {
    		existingCart = optionalCart.get();
    	}else {
    		throw new RuntimeException("Cart not found");
    	}
    	if(cart.getQuantity() <= 0){
    	    throw new RuntimeException("Quantity must be greater than zero");
    	}
    	
    	Product existingProduct = existingCart.getProduct();
    	
    	if(cart.getQuantity() > existingProduct.getStock()) {
    		 throw new RuntimeException("Requested quantity exceeds available stock");
    	}
    	
    	existingCart.setQuantity(cart.getQuantity());
    	
    	return cartRepository.save(existingCart);
    }
    
    /////////////////////
    public String removeFromCart(int cartId) {
    	
    	Optional<Cart> optionalCart = cartRepository.findById(cartId);
	
    	Cart existingCart;
    	if(optionalCart.isPresent()) {
    		existingCart = optionalCart.get();
    		
    		cartRepository.delete(existingCart);
    		 
    		return "Product removed from cart successfully";

    	}else {
    		throw new RuntimeException("Cart not found");
    	}
    	
    }
}