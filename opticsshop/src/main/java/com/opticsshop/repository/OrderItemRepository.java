package com.opticsshop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.opticsshop.entity.OrderItem;
import com.opticsshop.entity.Orders;

public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {

	List<OrderItem> findByOrder(Orders order);
}
