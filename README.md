# Crypto PoS

**Web3-ready Point of Sale system for cryptocurrency transactions using NFC technology.**  
Supports transactions on **Optimism Sepolia, Ethereum Sepolia, Celo, Celo cUSD, and Zircuit Testnet**.

## Overview

Crypto PoS offers a contactless payment experience using NFC (Near Field Communication) for fast and secure cryptocurrency transactions. Designed for merchants and users alike, it simplifies crypto payments by leveraging NFC tags/cards, providing a seamless and intuitive payment process.

With **Crypto PoS**, you can choose between two main protocols:

1. **Card Emulation Mode**  
   In this mode, the PoS shares address, chain ID, and transaction amount with a phone, which then processes the transaction. The PoS listens for on-chain transactions to confirm the payment using BlockScout's API.

2. **NFC Card Mode**  
   Users can load balance onto an NFC card and transfer funds by simply tapping it on the PoS. While this mode offers convenience, the current implementation lacks robust security measures like transaction signing, as it requires a custom smartcard. Future improvements aim to enhance security.

The system supports tax reporting by utilizing **DBForest** to store transaction data and **zkVerify** to generate zero-knowledge proofs, ensuring privacy when reporting the total amount handled.

## Features

- **NFC Contactless Payments**  
  Enables tap-to-pay cryptocurrency transactions with NFC tags or cards.
  
- **Multi-chain Support**  
  Transactions can be made on multiple networks: Optimism Sepolia, Ethereum Sepolia, Celo Alfajores, Celo cUSD ERC20, and Zircuit Testnet.
  
- **ENS Integration**  
  Displays ENS (Ethereum Name Service) information for added trust in transactions.
  
- **Invoice Generation**  
  Merchants can generate invoices using **Request Network**.
  
- **Zero-Knowledge Proofs**  
  zkVerify integration for secure and private transaction reporting.

## Problem it Solves

QR-based crypto payments, while useful, can be unreliable due to scanning issues. Crypto PoS offers a more reliable and user-friendly contactless alternative. With NFC technology, users can complete payments without relying on QR codes, enhancing convenience and speed.

Moreover, Crypto PoS aims to simplify tax reporting by using zero-knowledge proofs to share only the total amount of transactions handled, avoiding the need to disclose individual transactions to authorities.

## Technologies Used

- **Solidity** (for smart contract development) [https://github.com/albertoZurini/ETHWarsaw2024/tree/master/PoS_smartContract](https://github.com/albertoZurini/ETHWarsaw2024/tree/master/PoS_smartContract)
- **Optimism Sepolia, Ethereum Sepolia, Celo Alfajores, Zircuit Testnet** (blockchain networks) [https://github.com/albertoZurini/ETHWarsaw2024/blob/c52d5c77c9836682a95d2a1eae912905b98814d6/PoS_cardEmulator/pos/index.html#L67-L80](https://github.com/albertoZurini/ETHWarsaw2024/blob/c52d5c77c9836682a95d2a1eae912905b98814d6/PoS_cardEmulator/pos/index.html#L67-L80)
- **BlockScout API** (for transaction confirmation) [https://github.com/albertoZurini/ETHWarsaw2024/blob/a05d78f0425d14928979257526f691f62b05cdef/PoS_cardEmulator/pos/index.html#L251-L272](https://github.com/albertoZurini/ETHWarsaw2024/blob/a05d78f0425d14928979257526f691f62b05cdef/PoS_cardEmulator/pos/index.html#L251-L272)
- **DBForest** (for transaction storage) [https://github.com/albertoZurini/ETHWarsaw2024/blob/c52d5c77c9836682a95d2a1eae912905b98814d6/PoS_cardEmulator/index.js#L36-L150](https://github.com/albertoZurini/ETHWarsaw2024/blob/c52d5c77c9836682a95d2a1eae912905b98814d6/PoS_cardEmulator/index.js#L36-L150)
- **zkVerify** (for zero-knowledge proofs) [https://github.com/albertoZurini/ETHWarsaw2024/tree/master/PoS_cardEmulator/zkverify](https://github.com/albertoZurini/ETHWarsaw2024/tree/master/PoS_cardEmulator/zkverify)
- **ENS** (for domain name resolution) [https://github.com/albertoZurini/ETHWarsaw2024/blob/c52d5c77c9836682a95d2a1eae912905b98814d6/PoS_cardEmulator/client/index.html#L20-L52](https://github.com/albertoZurini/ETHWarsaw2024/blob/c52d5c77c9836682a95d2a1eae912905b98814d6/PoS_cardEmulator/client/index.html#L20-L52)
- **Request Network** (for invoice generation) [https://github.com/albertoZurini/ETHWarsaw2024/tree/master/PoS_cardEmulator/invoicing/invoicing-template](https://github.com/albertoZurini/ETHWarsaw2024/tree/master/PoS_cardEmulator/invoicing/invoicing-template)
- **Docker** (for zkVerify integration) [https://github.com/albertoZurini/ETHWarsaw2024/tree/master/PoS_cardEmulator/zkverify/Docker](https://github.com/albertoZurini/ETHWarsaw2024/tree/master/PoS_cardEmulator/zkverify/Docker)

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/albertoZurini/ETHWarsaw2024.git
   cd ETHWarsaw2024
   ```

2. **Install Dependencies:**
   - Install required packages for your environment (e.g., Docker for zkVerify).
   - Run `npm i`
   - Configure secrets in `keys.js`
   
3. **Deploy the Smart Contracts:**
   - Use the provided Solidity contracts and deploy them to the supported networks.

4. **Run the Application:**
   - Set up your NFC reader, connect to the selected blockchain network, and start the PoS system.

## Video Demo

Check out a live demo of Crypto PoS in action: [YouTube Demo](https://youtu.be/pssMTk7GiSk)

## Devfolio

Check out this project on [Devfolio](https://devfolio.co/projects/cryptopos-9345)

## Team

I did hack solo for this hackathon.

# Next steps

1. Develop a custom Smartcard able to sign a challenge coming from the smart contract. 
2. Develop a hardware able to take in both contact-less payment types (crypto and FIAT).
