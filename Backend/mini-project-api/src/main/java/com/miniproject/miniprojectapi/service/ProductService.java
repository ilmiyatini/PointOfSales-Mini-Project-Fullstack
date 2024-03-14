package com.miniproject.miniprojectapi.service;

import java.util.List;
//import org.springframework.data.domain.Page;

import com.miniproject.miniprojectapi.model.Product;


public interface ProductService {
    List<Product> getAllProducts();
    List<Product> getProductsByCategoryId(Long category_id);
    Product addProduct(Product product);
    Product updateProduct(Long id, Product product);
    boolean deleteProduct(Long id);
    Product getProductById(Long id);
//    Page<Product> findPaginated(int pageNo, int pageSize, String sortField, String sortDirection);
    List<Product> searchProductsByTitle(String title, String sortBy, String sortOrder);
    List<Product> getAllProductsSorted(String sortBy, String sortOrder);
}
