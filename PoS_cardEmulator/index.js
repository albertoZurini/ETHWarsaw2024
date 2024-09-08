const { NFC } = require('nfc-pcsc');
const ndef = require('@taptrack/ndef');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const {KEY2} = require("./keys.js")
const {ethers, JsonRpcProvider, Wallet, Contract} = require('ethers');

// dbforest
const {postgresString} = require("./conf.js")
const pg = require('pg');
const { setuid } = require('process');
const client = new pg.Client({
  connectionString: postgresString
})

const CONTRACT_ADDRESSES = {
  optimism: {
    address: "0xC55b5150A39BB5C544C73e8eF34879ACf7d82a41",
    rpcUrl: "https://sepolia.optimism.io",
    chainId: 11155420
  },
  zircuit: {
    address: "0x506D428E0414478dadC772891028282831085331",
    rpcUrl: "http://zircuit1-testnet.p2pify.com	",
    chainId: 48899, // 0xbf03
  },
  celo: {
    address: "0xb6B86fF60a2EB0CE405bd4d0590Cea7aD4B82b7a",
    rpcUrl: "https://alfajores-forno.celo-testnet.org	",
    chainId: 44787 // 0xaef3
  }
}

const DBNAME = "POS";
async function setUpPG(){
  await client.connect()
  
  const res = await client.query('SELECT $1::text as message', ['Hello world!'])
  console.log("Postgres started successfully", res.rows[0].message) // Hello world!

  const checkDbQuery = `SELECT 1 FROM pg_database WHERE datname = '${DBNAME}'`;
  const result = await client.query(checkDbQuery);

  // Create the database if it doesn't exist
  try {
    if (result.rows.length > 0) {
      console.log(`Database '${DBNAME}' already exists.`);
    } else {
      // If database doesn't exist, create it
      const createDbQuery = `CREATE DATABASE "${DBNAME}"`;
      await client.query(createDbQuery);
      console.log(`Database '${DBNAME}' created.`);
    }
  } catch (err) {
    console.error('Error checking or creating database:', err);
  }

  // Create the table

  try {

    // Check if the table 'POS' exists
    const checkTableQuery = `
      SELECT EXISTS (
        SELECT FROM pg_tables 
        WHERE schemaname = 'public' AND tablename = 'pos'
      )`;
    const tableResult = await client.query(checkTableQuery);

    if (tableResult.rows[0].exists) {
      console.log(`Table 'POS' already exists.`);
    } else {
      // Create the table 'POS' if it doesn't exist
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS POS (
          id SERIAL PRIMARY KEY,
          transactionId VARCHAR(255) NOT NULL,
          chainId VARCHAR(255) NOT NULL,
          tokenId VARCHAR(255),
          productName VARCHAR(255) NOT NULL,
          amount INTEGER NOT NULL
        );
      `;
      await client.query(createTableQuery);
      console.log(`Table 'POS' created.`);
    }
  } catch (err) {
    console.error('Error checking or creating table:', err);
  }

  await dumpPOSTable()

  //await deletePOSTable()
/*
  await dumpPOSTable()
  await addNewEntryToPOS(1, "test", "test", "test", 10)
  await dumpPOSTable()
*/
}
setUpPG()

async function dumpPOSTable() {
  try {
    // Query to select all rows from the POS table
    const query = 'SELECT * FROM POS';
    const result = await client.query(query);

    // Log the result
    console.log('Dumping table POS:');
    console.log(result.rows); // Dump all rows to the console
  } catch (err) {
    console.error('Error dumping table:', err);
  }
}

async function addNewEntryToPOS(transactionId, chainId, tokenId, productName, amount) {
  try {
    // Query to insert a new entry into the POS table
    const query = `
      INSERT INTO POS (transactionId, chainId, tokenId, productName, amount)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    
    // Execute the query with the provided arguments
    const result = await client.query(query, [transactionId, chainId, tokenId, productName, amount]);

    // Log the inserted row
    console.log('New entry added to POS:');
    console.log(result.rows[0]);
  } catch (err) {
    console.error('Error adding new entry to POS:', err);
  }
}

async function deletePOSTable() {
  try {
    // Query to drop the POS table
    const query = 'DROP TABLE IF EXISTS POS';
    await client.query(query);

    console.log('Table POS deleted (if it existed).');
  } catch (err) {
    console.error('Error deleting table:', err);
  }
}


function getAddress(uid){
  if(uid == "a632cb56"){
      return ["0x7A8E79dE63c29c3ee2375Cd3D2e90FEaA5aAf322", "0x97324859b73833dC6ACAFd216B1DB57EfDac9Fb7"]
  } else {
      return ["0x97324859b73833dC6ACAFd216B1DB57EfDac9Fb7", "0x7A8E79dE63c29c3ee2375Cd3D2e90FEaA5aAf322"]
  }
}

const nfc = new NFC();

nfc.on('reader', async reader => {
    console.log(`${reader.reader.name} device attached`);

	reader.on('card', async card => {
    // process payment with card
		console.log(`Card detected`, card);

    [addressFrom, addressTo] = getAddress(card.uid)

    console.log("FROM", addressFrom)
		
    let chainDetails;
    if(CHAINID == "0xaa37dc"){
      chainDetails = CONTRACT_ADDRESSES.optimism
    } else if(CHAINID == "0xbf03"){
      chainDetails =CONTRACT_ADDRESSES.zircuit
    } else {
      chainDetails = CONTRACT_ADDRESSES.celo
    }
    // Create a provider
    const provider = new JsonRpcProvider(chainDetails.rpcUrl);

    // Create a signer
    const signer = new Wallet(KEY2, provider);

    // Create a contract instance
    const contract = new Contract(chainDetails.address, ABI, signer);

    const balance = await provider.getBalance(addressFrom);
    console.log("==== BALANCE", balance)


    try {
      const gasEstimate = await contract.transfer.estimateGas(addressFrom, addressTo, PRICE);

        // Call the transfer function
        const tx = await contract.transfer(addressFrom, addressTo, PRICE, {
            gasLimit: BigInt(1e6), // Add 20% buffer to gas estimate
        });
        console.log('Transaction sent:', tx.hash);

        io.emit('transactionHash', {
          hash: tx.hash
        })

        // Wait for the transaction to be mined
        const receipt = await tx.wait();
        console.log('Transaction confirmed in block:', receipt.blockNumber);
    } catch (error) {
        console.error('Error:', error);
    }
    
        
    });


    reader.on('error', err => {
        console.error(`${reader.reader.name} an error occurred`, err);

		console.log("SetPayment", {
			price: PRICE,
			chainId: CHAINID,
			address: ADDRESS
		})
		io.emit('setPaymentData', {
			price: PRICE,
			chainId: CHAINID,
			address: ADDRESS,
      token: TOKEN
		});
    });

    reader.on('end', () => {
        console.log(`${reader.reader.name} device removed`);
    });
});

nfc.on('error', err => {
    console.error('NFC error', err);
});


const port = 3001;

app.use('/client', express.static('client'))
app.use('/pos', express.static('pos'))
/*
app.get('/client', (req, res) => {
	res.sendFile(__dirname + '/client/index.html');
});
app.get('/pos', (req, res) => {
	res.sendFile(__dirname + '/pos/index.html');
});
*/
var CHAINID = "0xaa37dc", PRICE = 1, ADDRESS, NAME, TOKEN, TRANSACTIONHASH;

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('broadcast message', (msg) => {
    console.log('Message received: ' + msg);
    io.emit('broadcast message', msg);
  });

  socket.on('setPrice', (msg) => {
	CHAINID = msg.chainId;
	PRICE = msg.price;
	ADDRESS = msg.address;
  NAME = msg.name;
  TOKEN = msg.token;
	console.log("Set price", msg)
  })

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });

  socket.on('transactionHash', (msg) => {
    console.log('transactionHash', JSON.stringify(msg))
    TRANSACTIONHASH = msg.hash
    io.emit('transactionHash', msg)
  })

  socket.on('transactionSuccessful', (msg) => {
    console.log("Transaction successful", msg)
    // TODO: enter here code for dbforest
    addNewEntryToPOS(TRANSACTIONHASH, CHAINID, TOKEN, NAME, PRICE)
  })

  socket.on('log', (msg) => {
    console.log(msg)
  })
});

http.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const ABI = [
	{
		"inputs": [],
		"name": "completeWithdrawal",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "requestWithdrawal",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "WithdrawalCompleted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "WithdrawalRequested",
		"type": "event"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "balances",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "pendingWithdrawals",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "withdrawalTimestamp",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
			

