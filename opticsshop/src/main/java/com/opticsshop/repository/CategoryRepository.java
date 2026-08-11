package com.opticsshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.opticsshop.entity.Category;


public interface CategoryRepository extends JpaRepository<Category, Integer>{

	boolean existsByCategoryName(String categoryName);

}
