const zk = require("zkverifyjs")
const {SEED} = require("./conf")
const fs = require('fs');

async function main(){
    const zkVerifySession = zk.zkVerifySession;
    console.log(SEED);
    const session = await zkVerifySession
            .start()
            .Testnet()
            .withAccount(SEED)
    
            const accountInfo = await session.accountInfo();
console.log(accountInfo.address);
console.log(accountInfo.nonce);
console.log(accountInfo.freeBalance);
console.log(accountInfo.reservedBalance);

    const proof = fs.readFileSync("../pos/target/proof_out").toString('hex'),
    publicSignals = "0x" + fs.readFileSync("../pos/target/pubs").toString('hex'), 
    vk = fs.readFileSync("../pos/target/vk").toString('hex');

    //console.log(proof, publicSignals, vk);

    console.log("Start")
    const { events, transactionResult } = await session.verify()
            .ultraplonk()
            .execute(proof, publicSignals, vk);

    console.log(await transactionResult)
}
main()