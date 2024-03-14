package com.miniproject.miniprojectapi.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.miniproject.miniprojectapi.model.Transaction;
import com.miniproject.miniprojectapi.repository.TransactionRepository;

@Service
public class TransactionServiceImpl implements TransactionService {

	@Autowired
    private TransactionRepository transactionRepository;
	
	@Override
    public Transaction addTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }
	@Override
    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll(); 
    }

    @Override
    public Transaction getTransactionById(Long id) {
        Optional<Transaction> transactionOptional = transactionRepository.findById(id);
        return transactionOptional.orElse(null);
    }
}
