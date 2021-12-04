package org.example.web;

import io.javalin.http.Handler;
import org.example.entity.Account;
import org.example.repository.TransactionRepository;
import org.example.repository.TransactionRepositoryJPA;
import org.example.repository.UserRepositoryJPA;
import org.example.requestTemplates.TransactionTemplate;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.sound.midi.SysexMessage;

import static org.example.web.AccountController.accountRepo;

public class TransactionController {
    static EntityManagerFactory entityManagerFactory;

    static {
        entityManagerFactory = Persistence.createEntityManagerFactory("my-pu");
    }
    static TransactionRepository transactionRepo = new TransactionRepositoryJPA(entityManagerFactory);

    public static Handler createTransaction = ctx -> {

        TransactionTemplate transactionTemplate = ctx.bodyAsClass(TransactionTemplate.class);
        double amount = transactionTemplate.getAmount();
        Account fromAccount = accountRepo.findAccountById(transactionTemplate.getFromAccountId());
        Account toAccount = accountRepo.findAccountById(transactionTemplate.getToAccountId());
        // Recording Transaction
        transactionRepo.recordTransaction(fromAccount, toAccount, amount);
        // Debitting and Creditting
        accountRepo.debitAccount(fromAccount,amount);
        accountRepo.creditAccount(toAccount,amount);

    };
}
