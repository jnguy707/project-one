package org.example.web;

import io.javalin.http.Handler;
import org.eclipse.jetty.http.HttpStatus;
import org.example.entity.User;
import org.example.repository.UserRepository;
import org.example.repository.UserRepositoryJPA;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class UserController {
    static EntityManagerFactory entityManagerFactory;

    static {
        entityManagerFactory = Persistence.createEntityManagerFactory("my-pu");
    }
    static UserRepository userRepo = new UserRepositoryJPA(entityManagerFactory);

    public static Handler login = ctx -> {
        User frontUser = ctx.bodyAsClass(User.class);
        frontUser.setUsername(frontUser.getUsername().toLowerCase());
        User backUser = userRepo.findByEmail(frontUser.getUsername());
        backUser.setUsername(backUser.getUsername().toLowerCase());

        if (backUser != null) {
            if (backUser.getPassword().equals(frontUser.getPassword())) {
                ctx.json(backUser);
            } else {
                // Invalid Password
                ctx.status(HttpStatus.FORBIDDEN_403);
            }
        } else {
            // Invalid Username
            ctx.status(HttpStatus.FORBIDDEN_403);
        }
    };
}
