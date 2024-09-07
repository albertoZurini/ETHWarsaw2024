// main.nr
struct Transaction {
    amount: Field,
    hash1: Field,
    hash2: Field,
    hash3: Field,
    hash4: Field,
    hash5: Field,
    hash6: Field,
    hash7: Field,
    hash8: Field,
}

fn main(transactions: [Transaction; 2], total: pub Field) {
    let arr = transactions.map(|a : Transaction| a.amount);
    let reduced = arr.reduce(|a, b| a + b);
    assert(total == reduced);
}