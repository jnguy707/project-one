class Transaction {
    public id: number;
    public amount: number;
    public type: string;

    constructor(id: number, amount: number, type: string){
        this.id = id;
        this.amount = amount;
        this.type = type;
    }
}

export { Transaction }