package com.opticsshop.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.opticsshop.entity.Product;
import com.opticsshop.service.ProductService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/product")
public class ProductController {
	
	@Autowired
	private ProductService productService;
	
	@PostMapping("/add")
	public Product saveProduct(@RequestBody Product product) {
		return productService.saveProduct(product);
	}
	
	@GetMapping("/getAll")
	public List<Product> getAllProducts(){
		return productService.getAllProducts();
	}
	
	@PutMapping("/update")
	public Product updateProduct(@RequestBody Product product) {
		return productService.updateProduct(product);
	}
	
	@GetMapping("/search")
	public List<Product> searchProducts(@RequestParam String productName) {
	    return productService.searchProducts(productName);
	}
	
	@GetMapping("/category/{categoryId}")
	public List<Product> getProductsByCategory(@PathVariable int categoryId) {

	    return productService.getProductsByCategory(categoryId);
	}
	
	@GetMapping("/sort")
	public List<Product> sortByPrice(@RequestParam String sortBy) {
	    return productService.sortByPrice(sortBy);
	}
}
