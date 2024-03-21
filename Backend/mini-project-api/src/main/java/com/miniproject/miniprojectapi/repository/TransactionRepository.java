package com.miniproject.miniprojectapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.miniproject.miniprojectapi.model.Transaction;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Integer>{
}
