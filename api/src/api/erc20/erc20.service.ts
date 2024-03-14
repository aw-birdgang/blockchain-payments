import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Web3 } from 'web3';
import { ethers } from 'ethers';
import { readFileSync } from 'fs';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class ERC20Service {
  rpcurl = process.env.ETHEREUM_ENDPOINT;
  web3 = new Web3(new Web3.providers.HttpProvider(this.rpcurl));
  provider = new ethers.JsonRpcProvider(this.rpcurl);

  erc20abiFile = './abi/erc20.json';
  contract_abi = JSON.parse(readFileSync(this.erc20abiFile).toString());

  constructor(private readonly commonService: CommonService) {}

  /* 계정(address)이 보유한 자산 조회 */
  async balanceOf(ownerAddress: string, token: string) {
    const signer = new ethers.Wallet(process.env.Wallet_PrivateKey, this.provider);
    const erctoken = this.getERC20Token(token);

    // Balance 조회
    const erc20Contract = new ethers.Contract(erctoken.ContractAddress, this.contract_abi, signer);
    const balance = await erc20Contract.balanceOf(ownerAddress);
    return Number(ethers.formatUnits(balance, erctoken.Decimals));
  }

  /* 계정(address)이 보유한 전체 ERC20 자산 조회 */
  async balanceOfTotal(ownerAddress: string) {
    const tokenList = this.commonService.getEthereumTokens();
    const signer = new ethers.Wallet(process.env.Wallet_PrivateKey, this.provider);

    for (const item of tokenList) {
      const erctoken = this.getERC20Token(item.symbol);

      // Balance 조회
      const erc20Contract = new ethers.Contract(erctoken.ContractAddress, this.contract_abi, signer);
      const balance = await erc20Contract.balanceOf(ownerAddress);
      item.balance = Number(ethers.formatUnits(balance, erctoken.Decimals));
    }

    return tokenList;
  }

  // Contract 정보 조회
  async getInfo(ContractAddress: string) {
    // Balance 조회
    const erc20Contract = new ethers.Contract(ContractAddress, this.contract_abi, this.provider);
    const contractName = await erc20Contract.name();
    const contractSymbol = await erc20Contract.symbol();
    const contractDecimal = await erc20Contract.decimals();
    const contractTotalSupply = await erc20Contract.totalSupply();
    const balance = ethers.formatUnits(contractTotalSupply, contractDecimal);
    const contractOwner = await erc20Contract.owner();

    return {
      Name: contractName,
      Symbol: contractSymbol,
      Decimal: contractDecimal.toString(),
      TotalSupply: balance.toString(),
      Owner: contractOwner,
    };
  }
  async approve2(symbol: string, private_key: string) {
    const signer = new ethers.Wallet(private_key, this.provider);

    const erctoken = this.getERC20Token(symbol);

    // ERC20 컨트랙트 객체를 생성합니다.
    const token = new ethers.Contract(erctoken.ContractAddress, this.contract_abi, signer);

    // 토큰을 전송할 대상 주소와 수량을 정합니다.
    const toAddress = '0xabcdef123456789abcdef123456789abcdef123456'; // 예시 주소입니다. 실제 대상 주소로 바꿔주세요.
    const amount = ethers.parseUnits('100', 18); // 100 토큰을 전송하려면 10^18을 곱해야 합니다. 토큰의 소수점 자릿수에 따라 바꿔주세요.

    // 토큰을 전송하기 전에 컨트랙트에 승인을 해야 합니다.
    // 승인할 최대 수량을 정합니다. 한 번에 모두 승인하면 다음 번에 승인할 필요가 없습니다.
    const maxAmount = ethers.parseUnits('1000000', 18); // 예시 수량입니다. 원하는 수량으로 바꿔주세요.

    // 컨트랙트에 승인합니다. 이 트랜잭션은 가스 비용이 듭니다.
    await token.approve(erctoken.ContractAddress, maxAmount);

    // 토큰을 전송합니다. 이 트랜잭션도 가스 비용이 듭니다.
    await token.transfer(toAddress, amount);

    // 토큰 전송이 성공적으로 완료되었습니다.
    console.log('Token transfer completed!');
  }

  // transferFrom
  async transferFrom(token: string, private_key: string, fromAddress: string, toAddress: string, toAmount: string) {
    const signer = new ethers.Wallet(private_key, this.provider);
    const erctoken = this.getERC20Token(token);

    const value = BigInt(toAmount) * BigInt(Math.pow(10, erctoken.Decimals));

    const erc20Contract = new ethers.Contract(erctoken.ContractAddress, this.contract_abi, signer);
    const transaction = await erc20Contract.transferFrom(fromAddress, toAddress, value);
    await transaction.wait();
    return transaction;
  }

  // allowance
  async allowance(token: string, private_key: string, toAddress: string) {
    const signer = new ethers.Wallet(private_key, this.provider);
    const erctoken = this.getERC20Token(token);

    const erc20Contract = new ethers.Contract(erctoken.ContractAddress, this.contract_abi, signer);
    const resultData = await erc20Contract.allowance(signer.address, toAddress);

    return ethers.formatUnits(resultData, erctoken.Decimals);
  }

  // approve
  async approve(token: string, private_key: string, toAddress: string, toAmount: string) {
    const signer = new ethers.Wallet(private_key, this.provider);
    const erctoken = this.getERC20Token(token);

    const value = ethers.parseUnits(toAmount, erctoken.Decimals);

    const erc20Contract = new ethers.Contract(erctoken.ContractAddress, this.contract_abi, signer);
    const transaction = await erc20Contract.approve(toAddress, value);
    await transaction.wait();
    return transaction;
  }

  /* transfer에 필요한 gas price 구하기 */
  async getTransferGasPrice(token: string, toAddress: string, toAmount: string) {
    const signer = new ethers.Wallet(process.env.Wallet_PrivateKey, this.provider);
    const erctoken = this.getERC20Token(token);

    const erc20Contract = new ethers.Contract(erctoken.ContractAddress, this.contract_abi, signer);

    const value = ethers.parseUnits(toAmount, erctoken.Decimals);

    const transaction = await erc20Contract.transfer.estimateGas(toAddress, value);
    const gasPrice = await this.web3.eth.getGasPrice();

    return ethers.formatUnits(transaction * gasPrice, 18);
  }

  /* ERC20 Token 전송 */
  async transferAmount(token: string, private_key: string, toAddress: string, toAmount: string) {
    try {
      const signer = new ethers.Wallet(process.env.Wallet_PrivateKey, this.provider);
      const erctoken = this.getERC20Token(token);

      const erc20Contract = new ethers.Contract(erctoken.ContractAddress, this.contract_abi, signer);

      const value = ethers.parseUnits(toAmount, erctoken.Decimals);

      const transaction = await erc20Contract.transfer(toAddress, value);
      transaction.wait();

      const customJson = JSON.stringify(transaction, (key, value) => {
        return typeof value === 'bigint' ? value.toString() : value;
      });
      const returnJson = JSON.parse(customJson);
      return returnJson;
    } catch (err) {
      console.error('error  => ' + err.message);
    }
  }

  getERC20Token(token: string) {
    const erc20token = new ERC20Token();

    for (const item of this.commonService.getEthereumTokens()) {
      if (item.symbol == token) {
        erc20token.Symbol = item.symbol;
        erc20token.ContractAddress = item.contractAddress;
        erc20token.Decimals = item.decimals;
        break;
      }
    }

    if (erc20token.ContractAddress == null) {
      throw new HttpException('Token is invalid.', HttpStatus.BAD_REQUEST);
    }

    return erc20token;
  }
}

export class ERC20Token {
  Symbol: string;
  Name: string;
  ContractAddress: string;
  Decimals: number;
  Owner: string;
  TotalSupply: string;
}
