package org.example.repository;

import org.example.entity.Account;
import org.example.entity.User;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;
import java.util.List;

public class AccountRepositoryJPA implements AccountRepository{
    private EntityManagerFactory entityManagerFactory;

    public AccountRepositoryJPA(EntityManagerFactory entityManagerFactory) {
        this.entityManagerFactory = entityManagerFactory;
    }

    @Override
    public List<Account> findAccountsByUser(int userId) {
        EntityManager entityManager = entityManagerFactory.createEntityManager();
        entityManager.getTransaction().begin();

        String jpql = "FROM Account WHERE user_id =" + userId;
        Query query = entityManager.createQuery(jpql);
        List<Account> accList= query.getResultList();

        entityManager.getTransaction().commit();
        entityManager.close();

        return accList;
    }
    @Override
    public Account findAccountById(int accountId) {
        EntityManager entityManager = entityManagerFactory.createEntityManager();
        entityManager.getTransaction().begin();

        Account account = entityManager.find(Account.class,accountId);

        entityManager.getTransaction().commit();
        entityManager.close();

        return account;
    }

    @Override
    public void debitAccount(Account account, double debit) {
        EntityManager entityManager = entityManagerFactory.createEntityManager();
        entityManager.getTransaction().begin();

        Account targetAccount = entityManager.find(Account.class, account.getId());

        targetAccount.setBalance(targetAccount.getBalance() - debit);

        entityManager.getTransaction().commit();
        entityManager.close();
    }

    @Override
    public void creditAccount(Account account, double credit) {
        EntityManager entityManager = entityManagerFactory.createEntityManager();
        entityManager.getTransaction().begin();

        Account targetAccount = entityManager.find(Account.class, account.getId());

        targetAccount.setBalance(targetAccount.getBalance() + credit);

        entityManager.getTransaction().commit();
        entityManager.close();
    }

    public static void main(String[] args) {
        EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("my-pu");
        // Creating user1
        UserRepository jpaUserRepoTest= new UserRepositoryJPA(entityManagerFactory);
        User user1 = jpaUserRepoTest.findByEmail("test1@mail.com");
        // Looking for user1's accounts
        AccountRepository jpaAccRepoTest = new AccountRepositoryJPA(entityManagerFactory);
        List<Account> accountList = jpaAccRepoTest.findAccountsByUser(user1.getId());
        System.out.println(accountList);
    }
}
