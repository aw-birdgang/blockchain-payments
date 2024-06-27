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




# transaction input data
````

ex)
https://explorer.test.wemix.com/tx/0x880fdf26aef4c752d49db79ccddde67a232df1deb300c6a4db3a9981da034cc6
https://lab.miguelmota.com/ethereum-input-data-decoder/example/
https://docs.ethers.org/v5/api/utils/bignumber/#BigNumber--BigNumber--methods--conversion
https://www.mobilefish.com/services/big_number/big_number.php

Input Data :
0x0b2e669100000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000007000000000000000000000000000000000000000000000000000000000000000b000000000000000000000000000000000000000000000000000000000000001600000000000000000000000000000000000000000000000000000000000000210000000000000000000000000000000000000000000000000000000000000029


1. _drawNumber는 첫 번째 32바이트로, 0000000000000000000000000000000000000000000000000000000000000003, 즉 3 입니다.
2. _numbers 배열의 길이의 값은 0000000000000000000000000000000000000000000000000000000000000006로, 배열의 길이는 6입니다.
3. _numbers 배열의 값은 다음과 같습니다
첫 번째 값: 0000000000000000000000000000000000000000000000000000000000000004 → 4
두 번째 값: 0000000000000000000000000000000000000000000000000000000000000007 → 7
세 번째 값: 000000000000000000000000000000000000000000000000000000000000000b → 11
네 번째 값: 0000000000000000000000000000000000000000000000000000000000000016 → 22
다섯 번째 값: 0000000000000000000000000000000000000000000000000000000000000021 → 33
여섯 번째 값: 000000000000000000000000000000000000000000000000000000000000000000029 → 41

결론, 3 회차 번호 [4, 7, 11, 22, 33, 41]

````



# multi sig description
````
상태 변수:
- owners : 지갑 소유자의 주소 배열.
- isOwner : 주소가 소유자인지 여부를 확인하는 매핑.
- required: 트랜잭션 실행에 필요한 최소 승인 수.
- transactions: 트랜잭션 구조체의 배열.
- isConfirmed: 특정 트랜잭션에 대한 주소의 서명 여부를 확인하는 매핑.


트랜잭션 구조체:
to: 자금 수신자 주소.
value: 송금할 금액.
data: 트랜잭션에 포함될 데이터.
executed: 트랜잭션 실행 여부.
numConfirmations: 트랜잭션에 대한 서명 수.


이벤트:
Deposit: 입금 이벤트.
SubmitTransaction: 트랜잭션 제출 이벤트.
ConfirmTransaction: 트랜잭션 서명 이벤트.
RevokeConfirmation: 트랜잭션 서명 철회 이벤트.
ExecuteTransaction: 트랜잭션 실행 이벤트.


수정자:
onlyOwner: 호출자가 소유자인지 확인.
txExists: 트랜잭션이 존재하는지 확인.
notExecuted: 트랜잭션이 실행되지 않았는지 확인.
notConfirmed: 트랜잭션이 서명되지 않았는지 확인.


컨트랙트 생성자:
소유자 주소 배열과 필요한 승인 수를 받아 초기화.


트랜잭션 관련 함수:
submitTransaction: 트랜잭션 제출.
confirmTransaction: 트랜잭션 서명.
executeTransaction: 서명된 트랜잭션 실행.
revokeConfirmation: 서명 철회.


조회 함수:
getOwners: 소유자 목록 조회.
getTransactionCount: 트랜잭션 수 조회.
getTransaction: 특정 트랜잭션 정보 조회.

````