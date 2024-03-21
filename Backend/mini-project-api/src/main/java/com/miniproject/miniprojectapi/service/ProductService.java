package com.miniproject.miniprojectapi.service;

import java.util.List;
import com.miniproject.miniprojectapi.model.Product;


public interface ProductService {
    List<Product> getAllProducts();
    List<Product> getProductsByCategoryId(Integer category_id);
    Product addProduct(Product product);
    Product updateProduct(Integer id, Product product);
    boolean deleteProduct(Integer id);
    Product getProductById(Integer id);
    List<Product> searchProductsByTitle(String title, String sortBy);
    List<Product> getAllProductsSorted(String sortBy, String sortOrder);
    List<Product> getProductsByTitleAndCategoryId(String title, Integer categoryId, String sortBy);
}
