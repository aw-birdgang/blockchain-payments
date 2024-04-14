
# 입금 주소 관리
````


````


# web3 lib - getBlock (https://web3js.readthedocs.io/en/v1.10.0/web3-eth.html#)
````

>> web3.eth.getBlock(blockHashOrBlockNumber [, returnTransactionObjects] [, callback])



>> Parameters

String|Number|BN|BigNumber - The block number or block hash. Or the string "earliest", "latest" , "pending", "safe" or "finalized" as in the default block parameter.
Boolean - (optional, default false) If specified true, the returned block will contain all transactions as objects. If false it will only contains the transaction hashes.
Function - (optional) Optional callback, returns an error object as first parameter and the result as second.



>> Returns

Promise returns Object - The block object:

number - Number: The block number. null if a pending block.
hash 32 Bytes - String: Hash of the block. null if a pending block.
parentHash 32 Bytes - String: Hash of the parent block.
baseFeePerGas - Number: Minimum to be charged to send a transaction on the network
nonce 8 Bytes - String: Hash of the generated proof-of-work. null if a pending block.
sha3Uncles 32 Bytes - String: SHA3 of the uncles data in the block.
logsBloom 256 Bytes - String: The bloom filter for the logs of the block. null if a pending block.
transactionsRoot 32 Bytes - String: The root of the transaction trie of the block.
stateRoot 32 Bytes - String: The root of the final state trie of the block.
miner - String: The address of the beneficiary to whom the mining rewards were given.
difficulty - String: Integer of the difficulty for this block.
totalDifficulty - String: Integer of the total difficulty of the chain until this block.
extraData - String: The “extra data” field of this block.
size - Number: Integer the size of this block in bytes.
gasLimit - Number: The maximum gas allowed in this block.
gasUsed - Number: The total used gas by all transactions in this block.
timestamp - Number: The unix timestamp for when the block was collated.
transactions - Array: Array of transaction objects, or 32 Bytes transaction hashes depending on the returnTransactionObjects parameter.
uncles - Array: Array of uncle hashes.



>> example

web3.eth.getBlock(3150)
.then(console.log);

> {
    "number": 3,
    "hash": "0xef95f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34b46",
    "parentHash": "0x2302e1c0b972d00932deb5dab9eb2982f570597d9d42504c05d9c2147eaf9c88",
    "baseFeePerGas": 58713056622,
    "nonce": "0xfb6e1a62d119228b",
    "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
    "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "transactionsRoot": "0x3a1b03875115b79539e5bd33fb00d8f7b7cd61929d5a3c574f507b8acf415bee",
    "stateRoot": "0xf1133199d44695dfa8fd1bcfe424d82854b5cebef75bddd7e40ea94cda515bcb",
    "miner": "0x8888f1f195afa192cfee860698584c030f4c9db1",
    "difficulty": '21345678965432',
    "totalDifficulty": '324567845321',
    "size": 616,
    "extraData": "0x",
    "gasLimit": 3141592,
    "gasUsed": 21662,
    "timestamp": 1429287689,
    "transactions": [
        "0x9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d66f4c9c6c445836d8b"
    ],
    "uncles": []
}

````






# web3 lib - getTransaction (https://web3js.readthedocs.io/en/v1.10.0/web3-eth.html#gettransaction)
````

>> web3.eth.getTransaction(transactionHash [, callback])



>> Parameters

String - The transaction hash.
Function - (optional) Optional callback, returns an error object as first parameter and the result as second.



>> Returns

Promise returns Object - A transaction object its hash transactionHash:

hash 32 Bytes - String: Hash of the transaction.
nonce - Number: The number of transactions made by the sender prior to this one.
blockHash 32 Bytes - String: Hash of the block where this transaction was in. null if pending.
blockNumber - Number: Block number where this transaction was in. null if pending.
transactionIndex - Number: Integer of the transactions index position in the block. null if pending.
from - String: Address of the sender.
to - String: Address of the receiver. null if it’s a contract creation transaction.
value - String: Value transferred in wei.
gasPrice - String: Gas price provided by the sender in wei.
gas - Number: Gas provided by the sender.
input - String: The data sent along with the transaction.


>> example

web3.eth.getTransaction('0x9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d66f4c9c6c445836d8b§234')
.then(console.log);

> {
    "hash": "0x9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d66f4c9c6c445836d8b",
    "nonce": 2,
    "blockHash": "0xef95f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34b46",
    "blockNumber": 3,
    "transactionIndex": 0,
    "from": "0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b",
    "to": "0x6295ee1b4f6dd65047762f924ecd367c17eabf8f",
    "value": '123450000000000000',
    "gas": 314159,
    "gasPrice": '2000000000000',
    "input": "0x57cb2fc4"
}

````





# web3 lib - getTransactionReceipt (https://web3js.readthedocs.io/en/v1.10.0/web3-eth.html#gettransactionreceipt)
````


>> web3.eth.getTransactionReceipt(hash [, callback])



>>  Parameters

String - The transaction hash.
String - (optional) The hex keyword can be passed as second argument, in order to format in hex, values that would be Number otherwise.
Function - (optional) Optional callback, returns an error object as first parameter and the result as second.


>> Returns

Promise returns Object - A transaction receipt object, or null if no receipt was found:

status - Boolean: TRUE if the transaction was successful, FALSE if the EVM reverted the transaction.
blockHash 32 Bytes - String: Hash of the block where this transaction was in.
blockNumber - Number (or hex String): Block number where this transaction was in.
transactionHash 32 Bytes - String: Hash of the transaction.
transactionIndex- Number (or hex String): Integer of the transactions index position in the block.
from - String: Address of the sender.
to - String: Address of the receiver. null when it’s a contract creation transaction.
contractAddress - String: The contract address created, if the transaction was a contract creation, otherwise null.
cumulativeGasUsed - Number (or hex String): The total amount of gas used when this transaction was executed in the block.
gasUsed - Number (or hex String): The amount of gas used by this specific transaction alone.
logs - Array: Array of log objects, which this transaction generated.
effectiveGasPrice - Number (or hex String): The actual value per gas deducted from the senders account. Before EIP-1559, this is equal to the transaction’s gas price. After, it is equal to baseFeePerGas + min(maxFeePerGas - baseFeePerGas, maxPriorityFeePerGas).



>> example

var receipt = web3.eth.getTransactionReceipt('0x9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d66f4c9c6c445836d8b')
.then(console.log);

> {
  "status": true,
  "transactionHash": "0x9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d66f4c9c6c445836d8b",
  "transactionIndex": 0,
  "blockHash": "0xef95f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34b46",
  "blockNumber": 3,
  "contractAddress": "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe",
  "cumulativeGasUsed": 314159,
  "gasUsed": 30234,
  "logs": [{
         // logs as returned by getPastLogs, etc.
     }, ...]
}

var receipt = web3.eth.getTransactionReceipt('0x9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d66f4c9c6c445836d8b','hex')
.then(console.log);
> {
  "status": true,
  "transactionHash": "0x9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d66f4c9c6c445836d8b",
  "transactionIndex": '0x0',
  "blockHash": "0xef95f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34b46",
  "blockNumber": '0x3',
  "contractAddress": "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe",
  "cumulativeGasUsed": '0x4cb2f',
  "gasUsed": '0x761a',
  "logs": [{
         // logs as returned by getPastLogs, etc.
     }, ...]
}

````
