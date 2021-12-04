package org.example.web;

import org.example.entity.Account;
import org.example.repository.AccountRepository;
import org.example.repository.AccountRepositoryJPA;
import io.javalin.http.Handler;
import org.eclipse.jetty.http.HttpStatus;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import java.util.List;


public class AccountController {
    static EntityManagerFactory entityManagerFactory;

    static {
        entityManagerFactory = Persistence.createEntityManagerFactory("my-pu");
    }

    static AccountRepository accountRepo = new AccountRepositoryJPA(entityManagerFactory);

    public static Handler getAccounts = ctx -> {
        int userID = Integer.parseInt(ctx.pathParam("userId"));
        List<Account> accounts = accountRepo.findAccountsByUser(userID);
        System.out.println(accounts);
        ctx.json(accounts);
    };

}
