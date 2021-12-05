import { Account }  from './account.model';

const url = `http://localhost:8080/accounts/transactions/transfer`;

class TransactionService {
    
    pushTransfer(fromAccount: Account, toAccount: Account, amount: number) {
        fetch(url,{
            method: 'POST',
            body: JSON.stringify({
                    fromAccountId: fromAccount.id,
                    toAccountId: toAccount.id,
                    amount: amount
                }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}

export { TransactionService }