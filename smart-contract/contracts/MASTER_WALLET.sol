// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// 간단한 ERC20 인터페이스
interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract MasterWalletManager {
    address public masterWallet;
    address public owner;
    IERC20 public token;

    // 입금 지갑 목록
    mapping(address => bool) private depositWallets;
    address[] private depositWalletsList;

    // 입금 지갑 추가 이벤트
    event DepositWalletAdded(address depositWallet);

    // 입금 지갑 제거 이벤트
    event DepositWalletRemoved(address depositWallet);

    // 소유자만 실행 가능한 기능을 위한 모디파이어
    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the contract owner");
        _;
    }

    constructor(address _tokenAddress, address _masterWallet) {
        owner = msg.sender;
        token = IERC20(_tokenAddress);
        masterWallet = _masterWallet;
    }

    // 입금 지갑 추가 기능
    function addDepositWallet(address _depositWallet) external onlyOwner {
        require(!depositWallets[_depositWallet], "Deposit wallet already added");
        depositWallets[_depositWallet] = true;
        depositWalletsList.push(_depositWallet);
        emit DepositWalletAdded(_depositWallet);
    }

    // 입금 지갑 목록에서 특정 지갑 제거 기능
    function removeDepositWallet(address _depositWallet) external onlyOwner {
        require(depositWallets[_depositWallet], "Deposit wallet not found");
        depositWallets[_depositWallet] = false;
        for (uint i = 0; i < depositWalletsList.length; i++) {
            if (depositWalletsList[i] == _depositWallet) {
                depositWalletsList[i] = depositWalletsList[depositWalletsList.length - 1];
                depositWalletsList.pop();
                emit DepositWalletRemoved(_depositWallet);
                break;
            }
        }
    }

    // 모든 입금 지갑에서 마스터 지갑으로 토큰 전송 기능
    function transferAllToMasterWallet(uint256 amount) external onlyOwner {
        for (uint i = 0; i < depositWalletsList.length; i++) {
            address depositWallet = depositWalletsList[i];
            if (depositWallets[depositWallet] && token.balanceOf(depositWallet) >= amount) {
                token.transferFrom(depositWallet, masterWallet, amount);
            }
        }
    }

    // 특정 입금 지갑에서 마스터 지갑으로 토큰 전송 기능
    function transferFromDepositWallet(address _depositWallet, uint256 amount) external onlyOwner {
        require(depositWallets[_depositWallet], "Not a registered deposit wallet");
        require(token.balanceOf(_depositWallet) >= amount, "Insufficient balance in deposit wallet");
        token.transferFrom(_depositWallet, masterWallet, amount);
    }
}
