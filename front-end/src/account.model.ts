 //import { User } from "./user.model";
 import {Transaction} from "./transaction.model"

class Account  {
    public id: number;
    public balance: number;
    public accountType: string;
    // public user: User;
    public transactions: Array<Transaction>;

    // constructor(public id: number, public balance: number, public type: string){
    // }
}

export { Account }