// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MultiSigWallet {
    // Array of wallet owners
    address[] public owners;
    // Mapping to check if an address is an owner
    mapping(address => bool) public isOwner;
    // Number of required confirmations for a transaction
    uint public required;

    // Structure to store transaction details
    struct Transaction {
        address to;               // Destination address of the transaction
        uint value;               // Value (in wei) to be sent
        bytes data;               // Data payload of the transaction
        bool executed;            // Whether the transaction has been executed
        uint numConfirmations;    // Number of confirmations received
    }

    // Mapping to track confirmations of transactions by owners
    mapping(uint => mapping(address => bool)) public isConfirmed;

    // Array to store all transactions
    Transaction[] public transactions;

    // Events to log activities
    event Deposit(address indexed sender, uint value);
    event SubmitTransaction(
        address indexed owner,
        uint indexed txIndex,
        address indexed to,
        uint value,
        bytes data
    );
    event ConfirmTransaction(address indexed owner, uint indexed txIndex);
    event RevokeConfirmation(address indexed owner, uint indexed txIndex);
    event ExecuteTransaction(address indexed owner, uint indexed txIndex);

    // Modifier to restrict function access to owners only
    modifier onlyOwner() {
        require(isOwner[msg.sender], "Not owner");
        _;
    }

    // Modifier to check if a transaction exists
    modifier txExists(uint _txIndex) {
        require(_txIndex < transactions.length, "tx does not exist");
        _;
    }

    // Modifier to check if a transaction is not executed
    modifier notExecuted(uint _txIndex) {
        require(!transactions[_txIndex].executed, "tx already executed");
        _;
    }

    // Modifier to check if a transaction is not confirmed by the sender
    modifier notConfirmed(uint _txIndex) {
        require(!isConfirmed[_txIndex][msg.sender], "tx already confirmed");
        _;
    }

    // Constructor to initialize the wallet owners and required confirmations
    constructor(address[] memory _owners, uint _required) {
        require(_owners.length > 0, "owners required");
        require(
            _required > 0 && _required <= _owners.length,
            "invalid number of required confirmations"
        );

        for (uint i = 0; i < _owners.length; i++) {
            address owner = _owners[i];

            require(owner != address(0), "invalid owner");
            require(!isOwner[owner], "owner not unique");

            isOwner[owner] = true;
            owners.push(owner);
        }

        required = _required;
    }

    // Fallback function to handle incoming Ether deposits
    receive() external payable {
        emit Deposit(msg.sender, msg.value);
    }

    // Function to submit a transaction
    function submitTransaction(address _to, uint _value, bytes memory _data)
    public
    onlyOwner
    {
        uint txIndex = transactions.length;

        transactions.push(Transaction({
            to: _to,
            value: _value,
            data: _data,
            executed: false,
            numConfirmations: 0
        }));

        emit SubmitTransaction(msg.sender, txIndex, _to, _value, _data);
    }

    // Function to confirm a transaction
    function confirmTransaction(uint _txIndex)
    public
    onlyOwner
    txExists(_txIndex)
    notExecuted(_txIndex)
    notConfirmed(_txIndex)
    {
        Transaction storage transaction = transactions[_txIndex];
        transaction.numConfirmations += 1;
        isConfirmed[_txIndex][msg.sender] = true;

        emit ConfirmTransaction(msg.sender, _txIndex);
    }

    // Function to execute a confirmed transaction
    function executeTransaction(uint _txIndex)
    public
    onlyOwner
    txExists(_txIndex)
    notExecuted(_txIndex)
    {
        Transaction storage transaction = transactions[_txIndex];

        require(
            transaction.numConfirmations >= required,
            "cannot execute tx"
        );

        transaction.executed = true;

        (bool success, ) = transaction.to.call{value: transaction.value}(
            transaction.data
        );
        require(success, "tx failed");

        emit ExecuteTransaction(msg.sender, _txIndex);
    }

    // Function to revoke a confirmation
    function revokeConfirmation(uint _txIndex)
    public
    onlyOwner
    txExists(_txIndex)
    notExecuted(_txIndex)
    {
        require(isConfirmed[_txIndex][msg.sender], "tx not confirmed");

        Transaction storage transaction = transactions[_txIndex];
        transaction.numConfirmations -= 1;
        isConfirmed[_txIndex][msg.sender] = false;

        emit RevokeConfirmation(msg.sender, _txIndex);
    }

    // Function to get the list of owners
    function getOwners() public view returns (address[] memory) {
        return owners;
    }

    // Function to get the total number of transactions
    function getTransactionCount() public view returns (uint) {
        return transactions.length;
    }

    // Function to get details of a specific transaction
    function getTransaction(uint _txIndex)
    public
    view
    returns (address to, uint value, bytes memory data, bool executed, uint numConfirmations)
    {
        Transaction storage transaction = transactions[_txIndex];

        return (
            transaction.to,
            transaction.value,
            transaction.data,
            transaction.executed,
            transaction.numConfirmations
        );
    }
}
