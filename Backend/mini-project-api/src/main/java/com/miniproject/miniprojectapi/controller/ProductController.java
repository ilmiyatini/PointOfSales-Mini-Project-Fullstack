package com.miniproject.miniprojectapi.controller;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.miniproject.miniprojectapi.model.Category;
import com.miniproject.miniprojectapi.model.Product;
import com.miniproject.miniprojectapi.model.request.ProductRequest;
import com.miniproject.miniprojectapi.model.response.HttpResponseModel;
import com.miniproject.miniprojectapi.model.response.ProductResponse;
import com.miniproject.miniprojectapi.service.CategoryService;
import com.miniproject.miniprojectapi.service.ProductService;

@RestController
@RequestMapping("/pos/api")
public class ProductController {

    @Autowired
    private ProductService productService;
    @Autowired
    private CategoryService categoryService;

    @GetMapping("/listproduct")
    public ResponseEntity<List<ProductResponse>> listProducts(
            @RequestParam(required = false) Long category_id,
            @RequestParam(required = false) String title,
            @RequestParam(defaultValue = "title") String sort_by,
            @RequestParam(defaultValue = "asc") String sort_order
    ) {
        if (category_id != null) {
            List<Product> products = productService.getProductsByCategoryId(category_id);
            return new ResponseEntity<>(convertToProductResponseList(products), HttpStatus.OK);
        } else if (title != null) {
            List<Product> products = productService.searchProductsByTitle(title, sort_by, sort_order);
            return new ResponseEntity<>(convertToProductResponseList(products), HttpStatus.OK);
        } else {
            List<Product> products = productService.getAllProductsSorted(sort_by, sort_order);
            return new ResponseEntity<>(convertToProductResponseList(products), HttpStatus.OK);
        }
    }

    private List<ProductResponse> convertToProductResponseList(List<Product> products) {
        List<ProductResponse> responseList = new ArrayList<>();
        for (Product product : products) {
            ProductResponse productResponse = new ProductResponse();
            productResponse.setTitle(product.getTitle());
            productResponse.setImage(product.getImage());
            productResponse.setPrice(product.getPrice());
            productResponse.setCategory_id(product.getCategory().getId());
            productResponse.setId(product.getId());
            responseList.add(productResponse);
        }
        return responseList;
    }

    @PostMapping("/add")
    public ResponseEntity<HttpResponseModel> addProduct(@RequestBody ProductRequest productRequest) {
    	Product product = new Product();
    	
        product.setTitle(productRequest.getTitle());
        product.setImage(productRequest.getImage());
        product.setPrice(productRequest.getPrice());
        
        Long categoryId = productRequest.getCategory_id();
        Category category = categoryService.getCategoryById(categoryId);
        product.setCategory(category);
        productService.addProduct(product);
        
        HttpResponseModel resp= new HttpResponseModel("ok","success");
        return ResponseEntity.ok(resp);
    }

    @PutMapping("/updateproduct/{id}")
    public ResponseEntity<HttpResponseModel> updateProduct(@PathVariable Long id, @RequestBody ProductRequest productRequest) {
        Product product = new Product();
        product.setId(id);
        product.setTitle(productRequest.getTitle());
        product.setImage(productRequest.getImage());
        product.setPrice(productRequest.getPrice());
        
        Long categoryId = productRequest.getCategory_id();
        Category category = categoryService.getCategoryById(categoryId);
        product.setCategory(category);
        
        Product updatedProduct = productService.updateProduct(id, product);
        if (updatedProduct != null) {
        	HttpResponseModel resp= new HttpResponseModel("ok","success");
            return ResponseEntity.ok(resp);
        } else {
        	HttpResponseModel resp = new HttpResponseModel("error", "Product not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(resp);
        }
    }

    @DeleteMapping("deleteproduct/{id}")
    public ResponseEntity<HttpResponseModel> deleteProduct(@PathVariable Long id) {
    	boolean deleted = productService.deleteProduct(id);
        if (deleted) {
            HttpResponseModel resp = new HttpResponseModel("ok", "success");
            return ResponseEntity.ok(resp);
        } else {
            HttpResponseModel resp = new HttpResponseModel("error", "Product not found or unable to delete");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(resp);
        }
    }


    @GetMapping("/detailproduct/{id}")
    public ResponseEntity<Map<String, Object>> getProductDetail(@PathVariable Long id) {
        Product product = productService.getProductById(id);
        if (product != null) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("id", product.getId());
            response.put("title", product.getTitle());
            response.put("image", product.getImage());
            response.put("price", product.getPrice());
            
            Category category = product.getCategory();
            response.put("category_id", category.getId());
            response.put("category_name", category.getName());
            
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
