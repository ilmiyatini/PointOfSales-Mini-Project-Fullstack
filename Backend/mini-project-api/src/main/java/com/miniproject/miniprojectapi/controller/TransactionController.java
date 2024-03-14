package com.miniproject.miniprojectapi.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.miniproject.miniprojectapi.service.ProductService;
import com.miniproject.miniprojectapi.service.TransactionService;
import com.miniproject.miniprojectapi.model.Transaction;
import com.miniproject.miniprojectapi.model.TransactionDetail;
import com.miniproject.miniprojectapi.model.request.TransactionRequestDetail;
import com.miniproject.miniprojectapi.model.request.TransactionRequest;
import com.miniproject.miniprojectapi.model.response.HttpResponseModel;

@RestController
@RequestMapping("/pos/api")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;
    @Autowired
    private ProductService productService;
    
    @GetMapping("/transactionlist")
    public ResponseEntity<List<Transaction>> getAllTransactions() {
        List<Transaction> transactions = transactionService.getAllTransactions();
        if (!transactions.isEmpty()) {
            return ResponseEntity.ok(transactions);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/transaction/{id}")
    public ResponseEntity<Transaction> getTransactionById(@PathVariable("id") Long id) {
        Transaction transaction = transactionService.getTransactionById(id);
        if (transaction != null) {
            return ResponseEntity.ok(transaction);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping("/addtransaction")
    public ResponseEntity<HttpResponseModel> addTransaction(@RequestBody TransactionRequest transactionRequest) {
        Transaction transaction = new Transaction();
        
        transaction.setTransactionDate(LocalDate.now());
        transaction.setTotalAmount(transactionRequest.getTotal_amount());
        transaction.setTotalPay(transactionRequest.getTotal_pay());
        
        List<TransactionDetail> transactionDetails = new ArrayList<>();
        for (TransactionRequestDetail detailRequest : transactionRequest.getTransaction_details()) { 
            TransactionDetail transactionDetail = new TransactionDetail();
            transactionDetail.setTransaction(transaction); 
            transactionDetail.setProduct(productService.getProductById(detailRequest.getProduct_id())); 
            transactionDetail.setQuantity(detailRequest.getQuantity());
            transactionDetail.setSubtotal(detailRequest.getSubtotal());
            transactionDetails.add(transactionDetail);
        }
        
        transaction.setTransactionDetails(transactionDetails); 
        Transaction addedTransaction = transactionService.addTransaction(transaction);

        if (addedTransaction != null) {
            HttpResponseModel resp = new HttpResponseModel("ok", "success");
            return ResponseEntity.status(HttpStatus.CREATED).body(resp);
        } else {
            HttpResponseModel resp = new HttpResponseModel("error", "failed to add transaction");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(resp);
        }
    }
}