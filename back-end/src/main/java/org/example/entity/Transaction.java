package org.example.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;


@Entity
@Table(name = "transactions")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private double amount;
    @Column(name = "date")
    @Temporal(TemporalType.DATE)
    private Date transactionDate;
    // TODO: FIX THIS ENUMERATION AND DB
    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private TransactionType transactionType;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "account_id")
    private Account account;


    public Transaction(double amount, Date transactionDate, Account account, TransactionType transactionType) {
        this.amount = amount;
        this.transactionDate = transactionDate;
        this.account = account;
        this.transactionType = transactionType;
    }
    public Transaction(){}

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public Date getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(Date transactionDate) {
        this.transactionDate = transactionDate;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public TransactionType getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(TransactionType transactionType) {
        this.transactionType = transactionType;
    }

    @Override
    public String toString() {
        return "Transaction{" +
                "id=" + id +
                ", amount=" + amount +
                ", transactionDate=" + transactionDate +
                ", transactionType=" + transactionType +
                '}';
    }
}
