package com.miniproject.miniprojectapi.repository;

import java.util.List; 

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.miniproject.miniprojectapi.model.Product;


@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
	List<Product> findByCategory_Id(Integer categoryId);
    List<Product> findByTitleContainingIgnoreCaseOrderByTitle(String title, Sort sort);
    List<Product> findByTitleContainingAndCategory_IdOrderByTitle(String title, Integer categoryId, Sort sort);
}
