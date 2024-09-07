const nfc = require('nfc-pcsc');
const Web3 = require('web3');
const EthereumTx = require('ethereumjs-tx').Transaction;
const fs = require("fs");
const {KEY1, KEY2} = require("./keys")

const web3 = new Web3('https://mainnet.infura.io/v3/YOUR-PROJECT-ID');

const reader = new nfc.NFC();

const CONTRACT_ADDRESS = "0x9839Fc1f2c531fe4fB08Dce477a6fbF8498ddd33";

function getAddress(uid){
    if(uid == "a632cb56"){
        return ["0x7A8E79dE63c29c3ee2375Cd3D2e90FEaA5aAf322", "0x97324859b73833dC6ACAFd216B1DB57EfDac9Fb7"]
    } else {
        return ["0x97324859b73833dC6ACAFd216B1DB57EfDac9Fb7", "0x7A8E79dE63c29c3ee2375Cd3D2e90FEaA5aAf322"]
    }
}
function getKey(addr){
    if(addr == "0x7A8E79dE63c29c3ee2375Cd3D2e90FEaA5aAf322")
        return KEY1
    return KEY2
}
const amountToSend = web3.utils.toWei('0.1', 'ether'); // 0.1 ETH
const gasPrice = web3.utils.toWei('20', 'gwei'); // 20 Gwei
const gasLimit = 21000; // standard gas limit for a simple transfer

reader.on('reader', (device) => {
    console.log(`${device.reader.name} device attached`);

    device.on('card', async (card) => {
        console.log(`Card detected`, card);
        
        let [addrFrom, addrTo] = getAddress(card.uid);
        console.log(addrFrom, addrTo)

        const web3js = new web3(new web3.providers.HttpProvider("https://sepolia.infura.io/v3/9e644c118b7c44068674e2d12a776536"));

        var privateKey = Buffer.from('PRIVATE-KEY', getKey(addrTo))
        
        // Get the nonce
        const nonce = await web3.eth.getTransactionCount(addrFrom);

        // Create transaction object
        const txObject = {
            nonce: web3.utils.toHex(nonce),
            to: addrTo,
            value: web3.utils.toHex(amountToSend),
            gasLimit: web3.utils.toHex(gasLimit),
            gasPrice: web3.utils.toHex(gasPrice),
        };

    });

    device.on('error', (err) => {
        console.error(`${device.reader.name} an error occurred`, err);
    });

    device.on('end', () => {
        console.log(`${device.reader.name} device removed`);
    });
});

const ABI = [
	{
		"inputs": [],
		"name": "deposit",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "executeWithdrawal",
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
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFunds",
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
		"name": "WithdrawalExecuted",
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
				"name": "releaseTime",
				"type": "uint256"
			}
		],
		"name": "WithdrawalRequested",
		"type": "event"
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
				"name": "user",
				"type": "address"
			}
		],
		"name": "timeLeftForWithdrawal",
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
		"inputs": [],
		"name": "WITHDRAWAL_DELAY",
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
		"name": "withdrawalRequests",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "releaseTime",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]