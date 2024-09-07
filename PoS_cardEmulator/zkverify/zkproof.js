let transactions = [
    {
        product: "Computer",
        transaction: "0xb873cf926f25c2369096f5b485d8c86df6ea601ebdb38d4e191109fc8125ad39",
        amount: 10
    },
    {
        product: "Computer2",
        transaction: "0xcaaba316300e47598b70fa844b531da73e18a2c5ac811c1d598e31d03c1edaf3",
        amount: 10
    }
] // secret input
let total = 0
for(let item of transactions){
    total += item.amount;
}

console.log(total)