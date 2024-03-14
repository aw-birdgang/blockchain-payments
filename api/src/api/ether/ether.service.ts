import { Injectable } from '@nestjs/common';
import { Web3 } from 'web3';

@Injectable()
export class EtherService {
  rpcurl = process.env.ETHEREUM_ENDPOINT;
  web3 = new Web3(new Web3.providers.HttpProvider(this.rpcurl));

  /* 계정(address)이 보유한 자산 조회 */
  async balanceOf(ownerAddress: string) {
    const balance = await this.web3.eth.getBalance(ownerAddress);
    return this.web3.utils.fromWei(balance, 'ether');
  }

  /* Ethereum 네트워크 내 현재 Block number 조회 */
  async getBlockNumber() {
    const currentBlockNumber = await this.web3.eth.getBlockNumber();
    return currentBlockNumber;
  }

  /* Block number를 통해 Ethereum 네트워크 내 Block 정보 조회 */
  async getBlockByNumber(blockNumber: bigint) {
    const block = await this.web3.eth.getBlock(blockNumber);
    const customJson = JSON.stringify(block, (key, value) => {
      return typeof value === 'bigint' ? value.toString() : value;
    });
    return JSON.parse(customJson);
  }

  /* private key에 해당하는 계정(address) 찾기 */
  async findAddress(privateKey: string) {
    const account = await this.web3.eth.accounts.privateKeyToAccount(privateKey);
    return account.address;
  }

  /* 트랜잭션 receipt 조회 */
  async getTransactionReceipt(transactionHash: string) {
    const receipt = await this.web3.eth.getTransactionReceipt(transactionHash);
    const customJson = JSON.stringify(receipt, (key, value) => {
      return typeof value === 'bigint' ? value.toString() : value;
    });
    return JSON.parse(customJson);
  }

  /* Blockchain 네트워크 내 gas price 조회 */
  async getGasPrice() {
    const gasPrice = await this.web3.eth.getGasPrice();
    return this.web3.utils.fromWei(gasPrice, 'Gwei');
  }

  /* Blockchain 네트워크 내 계정 생성 */
  async createAccount() {
    const account = await this.web3.eth.accounts.create();
    return account;
  }

  /* transfer에 필요한 gas price 구하기 */
  async getTransferGasPrice(speed: number, toAddress: string) {
    const gasPrice = BigInt(Math.floor(Number(await this.web3.eth.getGasPrice()) * speed));

    const gasAmount = await this.web3.eth.estimateGas({
      to: toAddress,
    });

    const getGas = gasPrice * gasAmount;

    return this.web3.utils.fromWei(getGas.toString(), 'ether');
  }

  /* Base Token 전송 */
  async transferAmount(speed: number, toAddress: string, private_key: string, toAmount: number) {
    try {
      this.web3.eth.accounts.wallet.clear();
      this.web3.eth.accounts.wallet.add(private_key);
      const gasPrice = BigInt(Math.floor(Number(await this.web3.eth.getGasPrice()) * 2 * speed));
      const maxGas = await this.web3.eth.estimateGas({
        to: toAddress,
      });

      const account = this.web3.eth.accounts.privateKeyToAccount(private_key);
      //console.log('fromAddress : ' + account.address + ', toAddress : ' + toAddress, true);
      const receipt = await this.web3.eth.sendTransaction({
        from: account.address,
        to: toAddress,
        value: toAmount * Math.pow(10, 18),
        gas: maxGas,
        gasPrice: gasPrice,
      });

      const customJson = JSON.stringify(receipt, (key, value) => {
        return typeof value === 'bigint' ? value.toString() : value;
      });
      const returnJson = JSON.parse(customJson);
      return returnJson;
    } catch (err) {
      console.error('error  => ' + err.message);
    }
  }
}
