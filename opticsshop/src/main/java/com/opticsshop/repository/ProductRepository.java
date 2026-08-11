package com.opticsshop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.opticsshop.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {

    boolean existsByProductName(String productName);

    List<Product> findByProductNameContainingIgnoreCase(String productName);

    List<Product> findByCategory_CategoryId(int categoryId);
}