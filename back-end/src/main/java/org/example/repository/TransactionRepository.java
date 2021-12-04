package org.example.repository;

import org.example.entity.Account;
import org.example.entity.Transaction;

import java.util.List;

public interface TransactionRepository {
    List<Transaction> findTransactionsByAccount(Account account);
    void recordTransaction(Account fromAccount, Account toAccount, double amount);
}
