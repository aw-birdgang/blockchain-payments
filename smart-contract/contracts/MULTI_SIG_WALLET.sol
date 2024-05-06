// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MultiSigWallet {
    address[] public owners;
    uint256 public required;
    mapping(uint256 => Transaction) public transactions;
    uint256 public transactionCount;

    struct Transaction {
        address to;
        uint256 value;
        bool executed;
        uint256 numConfirmations;
    }

    mapping(uint256 => mapping(address => bool)) public isConfirmed;

    constructor(address[] memory _owners, uint256 _required) {
        require(_owners.length == 3, "There must be exactly three owners.");
        owners = _owners;
        required = _required;
    }

    function submitTransaction(address _to, uint256 _value) public onlyOwner {
        uint256 txIndex = transactionCount;
        transactions[txIndex] = Transaction({
        to: _to,
        value: _value,
        executed: false,
        numConfirmations: 0
        });
        transactionCount += 1;
    }

    function confirmTransaction(uint256 _txIndex) public onlyOwner {
        require(!transactions[_txIndex].executed, "Transaction already executed");
        require(!isConfirmed[_txIndex][msg.sender], "Transaction already confirmed by this owner");

        transactions[_txIndex].numConfirmations += 1;
        isConfirmed[_txIndex][msg.sender] = true;
        if (transactions[_txIndex].numConfirmations >= required) {
            executeTransaction(_txIndex);
        }
    }

    function executeTransaction(uint256 _txIndex) public onlyOwner {
        require(transactions[_txIndex].numConfirmations >= required, "Cannot execute transaction");
        require(!transactions[_txIndex].executed, "Transaction already executed");

        Transaction storage transaction = transactions[_txIndex];
        transaction.executed = true;
        (bool success,) = transaction.to.call{value: transaction.value}("");
        require(success, "Transaction failed to send Ether");
    }

    modifier onlyOwner() {
        bool isOwner = false;
        for (uint256 i = 0; i < owners.length; i++) {
            if (owners[i] == msg.sender) {
                isOwner = true;
                break;
            }
        }
        require(isOwner, "Caller is not owner");
        _;
    }
}
