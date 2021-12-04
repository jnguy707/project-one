package org.example;


import io.javalin.Javalin;
import org.example.entity.Transaction;
import org.example.web.AccountController;
import org.example.web.TransactionController;
import org.example.web.UserController;

public class Application {

    public static void main(String[] args) {

        Javalin app = Javalin.create(config -> {
            // your config here
            config.enableCorsForAllOrigins();
        }).start(8080); // server:8080

        // TODO: FINISH REST API ROUTES > CONTROLLERS > APPLICATION.JAVA > CONNECT BACK END > FURNISH FRONT-END

        //------------------------------------
        // REST API
        //------------------------------------

        // Routes
//        app.post("/users", UserController.createNewUser);
        app.post("/users/login",UserController.login);
        // As of right now, getAccounts receives the account's transactions as well.

        app.get("/accounts/{userId}", AccountController.getAccounts);
        // I can definitely refactor chain of calls
        // And this will affect the code in TransactionController and AccountRepo
        app.post("/accounts/transactions/transfer", TransactionController.createTransaction);
        // There should be an additional getTransactions HTTP get


    }
}
