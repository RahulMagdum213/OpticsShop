package com.opticsshop.service;

import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.opticsshop.entity.Category;
import com.opticsshop.entity.Product;
import com.opticsshop.repository.CategoryRepository;
import com.opticsshop.repository.ProductRepository;

@Service
public class ProductService {
	
	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	
	////////////
	public Product saveProduct(Product product) {
		
		if(product.getProductName() == null || product.getProductName().isBlank()) {
			throw new RuntimeException("Product name cannot be empty");
		}
		product.setProductName(product.getProductName().trim());
		
		if(productRepository.existsByProductName(product.getProductName())) {
			throw new RuntimeException("Product already exists");
		}
		
		if(product.getPrice()<=0) {
			throw new RuntimeException("Price must be greater than zero");

		}
		
		if(product.getStock()<0) {
			 throw new RuntimeException("Stock cannot be negative");
		}
		
		Optional<Category> optionalCategory = categoryRepository.findById(product.getCategory().getCategoryId());
		
		if(optionalCategory.isPresent()) {
			
			Category exixtingCategory = optionalCategory.get();
			product.setCategory(exixtingCategory);
		}
		else {
			throw new RuntimeException("Please select a valid category.");

		}
		return productRepository.save(product);
		
	}
	
	///////////
	public List<Product> getAllProducts(){
		return productRepository.findAll();
	}
	////////////
	public Product updateProduct(Product product) {
		
		Optional<Product> optionalProduct = productRepository.findById(product.getProductId());
		
		
		if(optionalProduct.isPresent()) {
			Product existingProduct = optionalProduct.get();
			
			if(product.getProductName() == null || product.getProductName().isBlank()) {
				throw new RuntimeException("Product name cannot be empty");
			}
			
			
			if(!existingProduct.getProductName().equalsIgnoreCase(product.getProductName().trim())) {
				
				if(productRepository.existsByProductName(product.getProductName().trim())) {
					throw new RuntimeException("Product already exists change its stock");
				}
			}
			
			
			
			if(product.getPrice()<=0) {
				throw new RuntimeException("Price must be greater than zero");

			}
			
			if(product.getStock()<0) {
				 throw new RuntimeException("Stock cannot be negative");
			}
			
			Optional<Category> optionalCategory = categoryRepository.findById(product.getCategory().getCategoryId());
			
			if(optionalCategory.isPresent()) {
				
				Category exixtingCategory = optionalCategory.get();
				existingProduct.setCategory(exixtingCategory);
			}
			else {
				throw new RuntimeException("Please select a valid category.");

			}
			
			existingProduct.setProductName(product.getProductName().trim());
			existingProduct.setBrand(product.getBrand());
			existingProduct.setPrice(product.getPrice());
			existingProduct.setStock(product.getStock());
			existingProduct.setDescription(product.getDescription());
			existingProduct.setImageUrl(product.getImageUrl());
			
			
			return productRepository.save(existingProduct);
		}
		else {
			throw new RuntimeException("Product not found");
		}		
	}
	
	////////////////
	
	public List<Product> searchProducts(String productName) {

	    return productRepository
	            .findByProductNameContainingIgnoreCase(productName);
	}
	/////////////////
	
	public List<Product> getProductsByCategory(int categoryId) {

	    return productRepository
	            .findByCategory_CategoryId(categoryId);
	}
	
	
	/////////////
	
	public List<Product> sortByPrice(String sortBy) {

	    if (sortBy.equalsIgnoreCase("asc")) {

	        return productRepository.findAll(
	                Sort.by("price").ascending()
	        );

	    } else {

	        return productRepository.findAll(
	                Sort.by("price").descending()
	        );
	    }
	}
}


