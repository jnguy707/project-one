package org.example.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "accounts")
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private double balance;
    // TODO: FIX THIS ENUMERATION AND DB
    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private AccountType accountType;

    @JsonIgnore
    @OneToMany(
            mappedBy = "account",
            targetEntity = Transaction.class,
            fetch = FetchType.EAGER
            // my current solution is to change to EAGER
    )
    private List<Transaction> transactionList;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    public Account(AccountType accountType, double balance) {
        this.accountType = accountType;
        this.balance = balance;
    }

    public Account(){}

    public List<Transaction> getTransactions() {
        return transactionList;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public AccountType getAccountType() {
        return accountType;
    }

    public void setAccountType(AccountType accountType) {
        this.accountType = accountType;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }

    @Override
    public String toString() {
        return "Account{" +
                "id=" + id +
                ", accountType=" + accountType +
                ", balance=" + balance +
                '}';
    }
}
