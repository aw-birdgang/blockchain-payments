// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CentralizedFeeManager {
    address public centralWallet;

    event TransactionExecuted(address indexed from, address indexed to, uint256 value, bytes data);

    modifier onlyCentralWallet() {
        require(msg.sender == centralWallet, "Caller is not the central wallet");
        _;
    }

    constructor(address _centralWallet) {
        centralWallet = _centralWallet;
    }

    function executeTransaction(
        address from,
        address to,
        uint256 value,
        bytes memory data,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) public onlyCentralWallet returns (bool) {
        // 트랜잭션의 해시를 재계산
        bytes32 txHash = keccak256(abi.encodePacked(from, to, value, data));

        // 서명자 복구
        address signer = ecrecover(txHash, v, r, s);
        require(signer == from, "Invalid signature");

        // 트랜잭션 실행
        (bool success, ) = to.call{value: value}(data);
        require(success, "Transaction execution failed");

        emit TransactionExecuted(from, to, value, data);
        return true;
    }

    // 중앙 지갑 주소를 업데이트하는 함수 (옵션)
    function updateCentralWallet(address newCentralWallet) public onlyCentralWallet {
        require(newCentralWallet != address(0), "Invalid address");
        centralWallet = newCentralWallet;
    }

    // 계약에서 이더를 인출하는 함수 (옵션)
    function withdraw() public onlyCentralWallet {
        payable(centralWallet).transfer(address(this).balance);
    }

    // 계약으로 이더를 수신할 수 있도록 fallback 함수 추가
    receive() external payable {}
}
