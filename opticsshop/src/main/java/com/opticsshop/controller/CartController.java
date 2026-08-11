package com.opticsshop.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.opticsshop.entity.Cart;
import com.opticsshop.service.CartService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/add")
    public Cart addToCart(@RequestBody Cart cart) {

        return cartService.addToCart(cart);

    }
    
    @GetMapping("/getCartByCustomer/{customerId}")
    public List<Cart> getCartByCustomer(@PathVariable int customerId){

        return cartService.getCartByCustomer(customerId);

    }
    
    @PutMapping("/update")
    public Cart updateCart(@RequestBody Cart cart) {

        return cartService.updateCart(cart);

    }
    
    @DeleteMapping("/delete/{cartId}")
    public String removeFromCart(@PathVariable int cartId) {

        return cartService.removeFromCart(cartId);

    }

}