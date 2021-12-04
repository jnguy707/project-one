// import { User } from "./user.model";

class Account  {
    public id: number;
    public balance: number;
    public type: string;
    // public user: User;
    // public transactionList: Array<Transaction>
    constructor(id: number, balance: number, type: string){
        this.id = id;
        this.balance = balance;
        this.type = type;
    }

    // constructor(public id: number, public balance: number, public type: string){
    // }
}

export { Account }