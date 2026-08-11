package com.opticsshop.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.opticsshop.repository.CategoryRepository;
import com.opticsshop.entity.Category;

@Service
public class CategoryService {
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	/////////////////
	public Category saveCategory(Category category) {
		if(category.getCategoryName() == null || category.getCategoryName().isBlank()) {
			throw new RuntimeException("Category has to be filled ");
		}
		
		category.setCategoryName(category.getCategoryName().trim());
		
		if(categoryRepository.existsByCategoryName(category.getCategoryName())) {
			throw new RuntimeException("Category already exists");
		}
		return categoryRepository.save(category);
	}
	
	public List<Category> getAllCategories(){
		return categoryRepository.findAll();
	}
	
	///////////
	public Category updateCategory(Category category) {
		
		Optional<Category> optionalCategory = categoryRepository.findById(category.getCategoryId());
		
		if(optionalCategory.isPresent()) {
			Category existingCategory = optionalCategory.get();
			
			if (!existingCategory.getCategoryName()
			        .equalsIgnoreCase(category.getCategoryName().trim())) {

			    if (categoryRepository.existsByCategoryName(category.getCategoryName().trim())) {

			        throw new RuntimeException("Category already exists");

			    }

			}
			
			existingCategory.setCategoryName(category.getCategoryName().trim());
			existingCategory.setDescription(category.getDescription());
			
			return categoryRepository.save(existingCategory);
		}
		else {
			throw new RuntimeException("Category not found");
		}	
	}
}
