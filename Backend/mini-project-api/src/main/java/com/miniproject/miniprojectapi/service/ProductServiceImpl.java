package com.miniproject.miniprojectapi.service;

import java.util.Arrays;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import com.miniproject.miniprojectapi.model.Product;
import com.miniproject.miniprojectapi.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;


@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepository productRepository;
	

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public List<Product> getProductsByCategoryId(Integer category_id) {
        return productRepository.findByCategory_Id(category_id);
    }

    @Override
    public List<Product> getAllProductsSorted(String sortBy, String sortOrder) {
        Sort.Direction direction = Sort.Direction.ASC;
        if (sortOrder.equalsIgnoreCase("desc")) {
            direction = Sort.Direction.DESC;
        }
        
        Sort sort = Sort.by(direction, sortBy);
        return productRepository.findAll(sort);
    }
    @Override
    public List<Product> searchProductsByTitle(String title, String sortBy) {
    	 Sort.Direction direction = Sort.Direction.ASC;
    	    if (sortBy.equals("desc")) {
    	        direction = Sort.Direction.DESC;
    	    }

    	    
    	    String[] validColumns = {"title", "price"}; 
    	    if (!Arrays.asList(validColumns).contains(sortBy)) {
    	        sortBy = "title"; 
    	    }

    	    Sort sort = Sort.by(direction, sortBy);
    	    return productRepository.findByTitleContainingIgnoreCaseOrderByTitle(title, sort);
    }
    
    @Override
    public Product addProduct(Product product) {
    	return productRepository.save(product);
    }

    @Override
    public Product updateProduct(Integer id, Product product) {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Product with id " + id + " not found"));
        existingProduct.setTitle(product.getTitle());
        existingProduct.setImage(product.getImage());
        existingProduct.setPrice(product.getPrice());
        existingProduct.setCategory(product.getCategory());
        return productRepository.save(existingProduct);
    }

    @Override
    public boolean deleteProduct(Integer id) {
    	if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public Product getProductById(Integer id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Product with id " + id + " not found"));
    }
    @Override
    public List<Product> getProductsByTitleAndCategoryId(String title, Integer categoryId, String sortBy) {
        return productRepository.findByTitleContainingAndCategory_IdOrderByTitle(title, categoryId, Sort.by(sortBy));
    }
	

}
