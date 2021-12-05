import {Account} from "./account.model";
import { User } from "./user.model";

const url = "http://localhost:8080/accounts";


class AccountService {
    public accountList: Array<Account>

    fetchAccount(user: User){
        console.log('fetch account');
        return fetch(`${url}/${user.id}`,{method: 'GET'})
        .then(response => { 
            return response.json()
        })
        .then(data =>{
            console.log(data)
            return data;
        })
        .catch(err => console.error(err));
        // .then((account: Array<Account>)=> {
        //     console.log(account)
        //     account.map
        //     return account;
        // })
    }
}

export { AccountService }