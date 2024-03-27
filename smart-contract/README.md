# setup
````
npm init
npm install hardhat

````


# init
````
npx hardhat

````


# build & deploy & verify
````

> npx hardhat compile
> npx hardhat run scripts/deploy-erc20-token.js --network sepolia
> npx hardhat verify --network sepolia 0x5865b234E2D690c5A63CE5B843e6A27DC3365583 --contract contracts/TOKEN/BIRDGANG.sol:BIRDGANG


> npx hardhat compile
> npx hardhat run scripts/deploy-erc20-token.js --network wemix_testnet
> npx hardhat verify --network wemix_testnet 0x5dfc2f95dda60454eac3e123e211ed021ac9a2e6 --contract contracts/BIRDGANG.sol:BIRDGANG


> npx hardhat compile
> npx hardhat run scripts/deploy-lotto.js --network wemix_testnet
> npx hardhat verify --network wemix_testnet 0x476DAc34a11f84F48Da3a3455a3Be1b3FEE17b59 --contract contracts/LOTTO.sol:LOTTO




# 지원 네트워크 목록
npx hardhat verify --list-networks
````


# test

````

````


# token
```` 

* token address : 0x5865b234E2D690c5A63CE5B843e6A27DC3365583
* scan ref : https://sepolia.etherscan.io/tx/0x4def11bb07cf3ef5363fedbe6c3a2f765f742430bee3464a8c9a72951907720f
* verify ref : https://sepolia.etherscan.io/address/0x5865b234E2D690c5A63CE5B843e6A27DC3365583#code


* token address : 0x5dfc2f95dda60454eac3e123e211ed021ac9a2e6
* scan ref : https://testnet.wemixscan.com/token/0x5dfc2f95dda60454eac3e123e211ed021ac9a2e6


````






# link

````
https://docs.openzeppelin.com/

get chain key support
https://app.infura.io/

get chain key
https://sepolia.etherscan.io/

https://hardhat.org/

````



# metadata
````
ETH chain - sepolia
````



# guide
````
WEMIX chain - testnet


https://docs.wemix.com/v/ko/tutorial/erc-20-token/erc-20-token
https://docs.wemix.com/v/ko/tutorial/erc-20-token/erc-20-contract
https://docs.wemix.com/v/ko/tutorial/erc-20-token/erc-20-token-1
https://docs.wemix.com/v/ko/tutorial/erc-20-token/erc-20-token-api
https://docs.wemix.com/v/ko/tutorial/erc-20-token/erc-20-token-2
````


# wemix networks TIP
````

https://docs.wemix.com/v/ko/install-and-operation/download


Network Name: WEMIX_Testnet 
New RPC URL: https://api.test.wemix.com/
ChainID: 1112
Symbol: TWEMIX
Block Explorer URL: https://explorer.test.wemix.com/

Network Name: WEMIX_Mainnet 
New RPC URL: https://api.wemix.com/
ChainID: 1111
Symbol: WEMIX
Block Explorer URL: https://explorer.wemix.com/


Max base fee (GWEI) = 101
Max priority fee (GWEI) = 100 


https://explorer.test.wemix.com/


https://explorerapi.test.wemix.com/v1/tokens/{contract_address}/total-supply


https://explorerapi.test.wemix.com/v1/accounts/balance

https://explorerapi.test.wemix.com/v1/accounts/balance
{
    "addresses" : [
                "0x43EAAAaE78B6CA996A6f9eCF04d021e8af17db43",
                "0x608f9b1F8aE974D2BBffD46aeC3dB90376846D8F"
    ]
}


https://docs.wemix.com/v/ko/manual/explorer#verify-contract-code

````






# wemix api ref - account
````
https://docs.wemix.com/v/ko/dapp-developer/api-reference/account-apis

https://explorerapi.test.wemix.com/v1/accounts/balance
{
    "addresses" : [
                "0x43EAAAaE78B6CA996A6f9eCF04d021e8af17db43",
                "0x608f9b1F8aE974D2BBffD46aeC3dB90376846D8F"
    ]
}
````




# wemix api ref - contract
````
https://explorerapi.test.wemix.com/v1/contracts/{contract_address}/abi

{
    "status": "200",
    "message": "contract is not yet verified",
    "results": {}
}

````





# wemix api ref - transaction
````
https://explorerapi.test.wemix.com/v1/transactions/{transaction_hash}/transaction-status

{
    "status": "200",
    "message": "success",
    "results": {
        "data": {
            "status": "1"
        }
    }
}

````


# wemix api ref - token
````
https://explorerapi.test.wemix.com/v1/event-logs?address={contract_address}

{
    "status": "200",
    "message": "success",
    "results": {
        "count": "4",
        "data": [
            {
                "id": "53453744001600070",
                "timestamp": "2024-03-27T02:12:26Z",
                "address": "0x5dfc2f95dda60454eac3e123e211ed021ac9a2e6",
                "data": "0x00000000000000000000000000000000000000000000021e19e0c9bab2400000",
                "method": "0xddf252ad",
                "transaction_hash": "0xf248f3d8744dd7098c0ae997c7a67246ac5552e111198815a57cf9fdd514e1eb",
                "log_name": null,
                "log_abi": null,
                "address_type": "3",
                "address_extra": null,
                "transaction_index": "16",
                "log_index": "70",
                "topics_count": "3",
                "topic_0": "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
                "topic_1": "0x00000000000000000000000043eaaaae78b6ca996a6f9ecf04d021e8af17db43",
                "topic_2": "0x000000000000000000000000608f9b1f8ae974d2bbffd46aec3db90376846d8f",
                "topic_3": null
            },
            {
                "id": "53453696001300159",
                "timestamp": "2024-03-27T02:11:38Z",
                "address": "0x5dfc2f95dda60454eac3e123e211ed021ac9a2e6",
                "data": "0x000000000000000000000000000000000000000000000006aaf7c8516d0c0000",
                "method": "0xddf252ad",
                "transaction_hash": "0x77c23067e03dd1f00dfe7909183368a922ca3029d3493b307ef6e288496a29e9",
                "log_name": null,
                "log_abi": null,
                "address_type": "3",
                "address_extra": null,
                "transaction_index": "13",
                "log_index": "159",
                "topics_count": "3",
                "topic_0": "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
                "topic_1": "0x00000000000000000000000043eaaaae78b6ca996a6f9ecf04d021e8af17db43",
                "topic_2": "0x000000000000000000000000608f9b1f8ae974d2bbffd46aec3db90376846d8f",
                "topic_3": null
            },
            {
                "id": "53388648004000171",
                "timestamp": "2024-03-26T08:07:31Z",
                "address": "0x5dfc2f95dda60454eac3e123e211ed021ac9a2e6",
                "data": "0x0000000000000000000000000000000000000000204fce5e3e25026110000000",
                "method": "0xddf252ad",
                "transaction_hash": "0x7b034a9fa347118617f30f39bde7a77ef82681f5b2825f7712d68f6d1dca7c54",
                "log_name": null,
                "log_abi": null,
                "address_type": "3",
                "address_extra": null,
                "transaction_index": "40",
                "log_index": "171",
                "topics_count": "3",
                "topic_0": "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
                "topic_1": "0x0000000000000000000000000000000000000000000000000000000000000000",
                "topic_2": "0x00000000000000000000000043eaaaae78b6ca996a6f9ecf04d021e8af17db43",
                "topic_3": null
            },
            {
                "id": "53388648004000170",
                "timestamp": "2024-03-26T08:07:31Z",
                "address": "0x5dfc2f95dda60454eac3e123e211ed021ac9a2e6",
                "data": "0x",
                "method": "0x8be0079c",
                "transaction_hash": "0x7b034a9fa347118617f30f39bde7a77ef82681f5b2825f7712d68f6d1dca7c54",
                "log_name": null,
                "log_abi": null,
                "address_type": null,
                "address_extra": null,
                "transaction_index": "40",
                "log_index": "170",
                "topics_count": "3",
                "topic_0": "0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0",
                "topic_1": "0x0000000000000000000000000000000000000000000000000000000000000000",
                "topic_2": "0x00000000000000000000000043eaaaae78b6ca996a6f9ecf04d021e8af17db43",
                "topic_3": null
            }
        ]
    }
}

````




# wemix api ref - token
````
https://explorerapi.test.wemix.com/v1/tokens/{contract_address}/inventory/{holder_address}


````
