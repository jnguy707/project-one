package org.example.repository;

import org.example.entity.User;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;
import java.util.List;

public class UserRepositoryJPA implements UserRepository {
    private EntityManagerFactory entityManagerFactory;

    public UserRepositoryJPA(EntityManagerFactory entityManagerFactory) {
        this.entityManagerFactory = entityManagerFactory;
    }

    @Override
    public void save(User user) {
        EntityManager entityManager = entityManagerFactory.createEntityManager();
        entityManager.getTransaction().begin();

        entityManager.persist(user);

        entityManager.getTransaction().commit();
        entityManager.close();
    }

    @Override
    public User findByEmail(String username) {
        EntityManager entityManager = entityManagerFactory.createEntityManager();
        entityManager.getTransaction().begin();

        String jpql = "FROM User WHERE username='" + username + "\'";
        Query query = entityManager.createQuery(jpql);
        // Query should return singular result
        User user = (User) query.getSingleResult();
        return user;
    }

//    public static void main(String[] args) {
//        EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("my-pu");
//        UserRepository jpaTest= new UserRepositoryJPA(entityManagerFactory);
//        jpaTest.findByEmail("test2@mail.com");
//        jpaTest.findByEmail("test3@mail.com");
//
//    }
//
}




