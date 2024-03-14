package com.miniproject.miniprojectapi.service;

import java.util.List;

import com.miniproject.miniprojectapi.model.Transaction;

public interface TransactionService {
	Transaction addTransaction(Transaction transaction);
	List<Transaction> getAllTransactions();
    Transaction getTransactionById(Long id);
}
