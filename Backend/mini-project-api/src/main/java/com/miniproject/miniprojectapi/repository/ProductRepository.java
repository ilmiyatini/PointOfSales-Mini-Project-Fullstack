package com.miniproject.miniprojectapi.repository;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.miniproject.miniprojectapi.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
	List<Product> findByCategory_Id(Long categoryId);
	List<Product> findByTitle(String title, Sort sort);
}
