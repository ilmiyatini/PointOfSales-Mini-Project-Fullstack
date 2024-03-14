package com.miniproject.miniprojectapi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.miniproject.miniprojectapi.model.Category;
import com.miniproject.miniprojectapi.model.response.HttpResponseModel;
import com.miniproject.miniprojectapi.service.CategoryService;

@RestController
@RequestMapping("/pos/api/categories")
public class CategoryController {
	@Autowired
    private CategoryService categoryService;

    @GetMapping("/listcategory")
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> categories = categoryService.getAllCategories();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }
    
    @PostMapping("/add")
    public ResponseEntity<HttpResponseModel> addCategory(@RequestBody Category category) {
        Category addedCategory = categoryService.addCategory(category);
        if (addedCategory != null) {
            HttpResponseModel resp = new HttpResponseModel("ok", "Category added successfully");
            return ResponseEntity.status(HttpStatus.CREATED).body(resp);
        } else {
            HttpResponseModel resp = new HttpResponseModel("error", "Failed to add category");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(resp);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<HttpResponseModel> updateCategory(@PathVariable("id") long id, @RequestBody Category category) {
        Category updatedCategory = categoryService.updateCategory(id, category);
        if (updatedCategory != null) {
            HttpResponseModel resp = new HttpResponseModel("ok", "Category updated successfully");
            return ResponseEntity.status(HttpStatus.OK).body(resp);
        } else {
            HttpResponseModel resp = new HttpResponseModel("error", "Category not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(resp);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpResponseModel> deleteCategory(@PathVariable("id") long id) {
        boolean result = categoryService.deleteCategory(id);
        if (result) {
            HttpResponseModel resp = new HttpResponseModel("ok", "Category deleted successfully");
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(resp);
        } else {
            HttpResponseModel resp = new HttpResponseModel("error", "Category not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(resp);
        }
    }
}