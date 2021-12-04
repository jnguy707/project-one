package org.example.repository;

import org.example.entity.Account;
import org.example.entity.Transaction;
import org.example.entity.TransactionType;
import org.example.entity.User;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;
import java.util.Date;
import java.util.List;
import java.time.LocalDate;

public class TransactionRepositoryJPA implements TransactionRepository{
    private EntityManagerFactory entityManagerFactory;

    public TransactionRepositoryJPA(EntityManagerFactory entityManagerFactory) {
        this.entityManagerFactory = entityManagerFactory;
    }

    @Override
    public List<Transaction> findTransactionsByAccount(Account account) {
        EntityManager entityManager = entityManagerFactory.createEntityManager();
        entityManager.getTransaction().begin();

        String jpql = "FROM Transaction WHERE account_id =" + account.getId();
        Query query = entityManager.createQuery(jpql);
        List<Transaction> transactionList = query.getResultList();

        entityManager.getTransaction().commit();
        entityManager.close();

        return transactionList;
    }

    @Override
    public void recordTransaction(Account fromAccount, Account toAccount, double amount) {
        EntityManager entityManager = entityManagerFactory.createEntityManager();
        entityManager.getTransaction().begin();

        Date date = new Date();
        Transaction debitTxn = new Transaction(amount,date,fromAccount, TransactionType.DEBIT);
        Transaction creditTxn = new Transaction(amount,date,toAccount, TransactionType.CREDIT);

        entityManager.persist(debitTxn);
        entityManager.persist(creditTxn);

        entityManager.getTransaction().commit();
        entityManager.close();
    }

//    public static void main(String[] args) {
//        EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("my-pu");
//        UserRepository jpaUserRepoTest= new UserRepositoryJPA(entityManagerFactory);
//        User user1 = jpaUserRepoTest.findByEmail("test1@mail.com");
//        AccountRepository jpaAccRepoTest = new AccountRepositoryJPA(entityManagerFactory);
//        List<Account> accountList = jpaAccRepoTest.findAccountsByUser(user1);
//        TransactionRepository txnRepo = new TransactionRepositoryJPA(entityManagerFactory);
//
//        System.out.println(accountList.get(0));
//        List<Transaction> txnList = txnRepo.findTransactionsByAccount(accountList.get(0));
//        txnList
//                .stream()
//                .forEach(System.out::println);
////        txnRepo.recordTransaction(accountList.get(0),accountList.get(1),1000.00);
//    }
}
