package com.miniproject.miniprojectapi.service;

import java.util.List;

import com.miniproject.miniprojectapi.model.Category;

public interface CategoryService {
	List<Category> getAllCategories();
	Category addCategory(Category category);
	Category getCategoryById(Long categoryId);
	Category updateCategory(Long id, Category category); 
        boolean deleteCategory(Long id);
}
