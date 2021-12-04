package org.example.repository;

import org.example.entity.Account;
import org.example.entity.User;

import java.util.List;

public interface AccountRepository {
    List<Account> findAccountsByUser(int userId);
    Account findAccountById(int accountId);
    void debitAccount(Account account,double debit);
    void creditAccount(Account account,double credit);
}