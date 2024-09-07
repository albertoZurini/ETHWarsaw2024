// SPDX-License-Identifier: GPLv3
pragma solidity ^0.8.0;

contract CryptoPayment {

    // Mapping from addresses to balances
    mapping(address => uint256) public balances;

    // Mapping from addresses to public keys
    mapping(address => bytes32) public publicKeys;

    // Mapping from addresses to current challenges
    mapping(address => uint256) public challenges;

    // Register a public key for an address
    function registerPublicKey(bytes32 publicKey) public {
        publicKeys[msg.sender] = publicKey;
    }

    // Deposit funds to the smart contract and update the balance
    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    // Generate a random challenge for a transaction
    function generateChallenge(address to) public returns (uint256) {
        require(balances[msg.sender] > 0, "Insufficient balance");
        uint256 challenge = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, to)));
        challenges[msg.sender] = challenge;
        return challenge;
    }

    // Verify the challenge and transfer funds
    function verifyAndTransfer(address to, uint256 amount, bytes32 signedChallenge) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        require(publicKeys[msg.sender] != 0, "Sender's public key not registered");
        require(publicKeys[to] != 0, "Recipient's public key not registered");
        
        // Verify the signed challenge matches the generated challenge
        uint256 generatedChallenge = challenges[msg.sender];
        require(uint256(keccak256(abi.encodePacked(signedChallenge))) == generatedChallenge, "Invalid signed challenge");

        // Transfer funds if challenge is valid
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }
}
