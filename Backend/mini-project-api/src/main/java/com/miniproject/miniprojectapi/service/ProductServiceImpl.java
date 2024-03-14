package com.miniproject.miniprojectapi.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import com.miniproject.miniprojectapi.model.Product;
import com.miniproject.miniprojectapi.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.data.domain.Pageable;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepository productRepository;
	

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public List<Product> getProductsByCategoryId(Long category_id) {
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
    public List<Product> searchProductsByTitle(String title, String sortBy, String sortOrder) {
        Sort.Direction direction = Sort.Direction.ASC;
        if (sortOrder.equalsIgnoreCase("desc")) {
            direction = Sort.Direction.DESC;
        }
        
        Sort sort = Sort.by(direction, sortBy);
        return productRepository.findByTitle(title, sort);
    }
    
    @Override
    public Product addProduct(Product product) {
    	return productRepository.save(product);
    }

    @Override
    public Product updateProduct(Long id, Product product) {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Product with id " + id + " not found"));
        existingProduct.setTitle(product.getTitle());
        existingProduct.setImage(product.getImage());
        existingProduct.setPrice(product.getPrice());
        existingProduct.setCategory(product.getCategory());
        return productRepository.save(existingProduct);
    }

    @Override
    public boolean deleteProduct(Long id) {
    	if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Product with id " + id + " not found"));
    }
    
//    @Override
//	public Page<Product> findPaginated(int pageNo, int pageSize, String sortField, String sortDirection) {
//		 Sort sort = sortDirection.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortField).ascending() :
//		 Sort.by(sortField).descending();
//		 
//		 Pageable pageable = PageRequest.of(pageNo - 1, pageSize, sort);
//		 return this.productRepository.findAll(pageable);
//		}
	

}
