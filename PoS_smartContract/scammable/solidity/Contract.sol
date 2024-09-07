// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CryptoPaymentService {
    // Mapping of users' balances
    mapping(address => uint256) public balances;
    
    // Struct to hold withdrawal request details
    struct WithdrawalRequest {
        uint256 amount;        // Amount requested for withdrawal
        uint256 releaseTime;   // Time when funds will be released (1 week from request)
    }

    // Mapping of users' withdrawal requests (if any)
    mapping(address => WithdrawalRequest) public withdrawalRequests;

    // Time delay for withdrawal (1 week in seconds)
    uint256 public constant WITHDRAWAL_DELAY = 7 days;

    // Event to log transfers
    event Transfer(address indexed from, address indexed to, uint256 amount);

    // Event to log withdrawals
    event WithdrawalRequested(address indexed user, uint256 amount, uint256 releaseTime);
    event WithdrawalExecuted(address indexed user, uint256 amount);

    // Function to deposit funds to the contract
    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    // Function to transfer funds from one user to another
    function transferFunds(address from, uint256 amount) external {
        require(balances[from] >= amount, "Insufficient balance in sender's account");
        require(from != msg.sender, "Cannot transfer to yourself");

        balances[from] -= amount;
        balances[msg.sender] += amount;

        emit Transfer(from, msg.sender, amount);
    }

    // Function to request withdrawal of funds (sets a 1-week delay)
    function requestWithdrawal(uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient balance for withdrawal");

        // Reset the grace period and update the amount if a new request is made
        withdrawalRequests[msg.sender] = WithdrawalRequest({
            amount: amount,
            releaseTime: block.timestamp + WITHDRAWAL_DELAY
        });

        emit WithdrawalRequested(msg.sender, amount, block.timestamp + WITHDRAWAL_DELAY);
    }

    // Function to execute the withdrawal after the grace period
    function executeWithdrawal() external {
        WithdrawalRequest storage request = withdrawalRequests[msg.sender];

        require(request.amount > 0, "No pending withdrawal request");
        require(block.timestamp >= request.releaseTime, "Withdrawal is still in grace period");

        uint256 amount = request.amount;

        // Update the balance and reset the withdrawal request
        balances[msg.sender] -= amount;
        delete withdrawalRequests[msg.sender];

        // Transfer the amount to the user
        payable(msg.sender).transfer(amount);

        emit WithdrawalExecuted(msg.sender, amount);
    }

    // Function to check the time left for withdrawal release
    function timeLeftForWithdrawal(address user) external view returns (uint256) {
        if (block.timestamp >= withdrawalRequests[user].releaseTime) {
            return 0;
        } else {
            return withdrawalRequests[user].releaseTime - block.timestamp;
        }
    }
}
