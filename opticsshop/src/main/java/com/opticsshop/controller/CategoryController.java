package com.opticsshop.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.opticsshop.entity.Category;
import com.opticsshop.service.CategoryService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/category")
public class CategoryController {
	@Autowired
	private CategoryService categoryService;
	
	@PostMapping("/add")
	public Category saveCategory(@RequestBody Category category) {
		return categoryService.saveCategory(category);
	}
	
	@GetMapping("/getAll")
	public List<Category> getAllCategories(){
		return categoryService.getAllCategories();
	}
	
	@PutMapping("/update")
	public Category updateCategory(@RequestBody Category category) {
		return categoryService.updateCategory(category);
	}
}
