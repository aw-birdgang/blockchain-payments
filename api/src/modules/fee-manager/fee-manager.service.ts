import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import * as bip39 from 'bip39';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { hdkey } from 'ethereumjs-wallet';

@Injectable()
export class FeeManagerService {
  private contract: Contract<any>;
  private readonly centralWallet: string;
  private readonly centralWalletPrivateKey: string;

  constructor(@Inject('WEB3') private readonly web3: Web3) {
    this.centralWallet = 'YOUR_CENTRAL_WALLET_ADDRESS';
    this.centralWalletPrivateKey = 'YOUR_CENTRAL_WALLET_PRIVATE_KEY';

    const abi = [
      /* ABI from the CentralizedFeeManager contract */
    ];
    const contractAddress = 'CENTRALIZED_FEE_MANAGER_CONTRACT_ADDRESS';
    this.contract = new this.web3.eth.Contract(abi, contractAddress);
  }

  private async getHDWalletAccount(index: number) {
    const mnemonic = 'your-mnemonic-seed-phrase'; // 보안 유지 필요
    const validate = bip39.validateMnemonic(mnemonic);
    if (!validate) {
      throw new NotFoundException('INVALID_KEY');
    }

    const seed = await bip39.mnemonicToSeed(mnemonic);
    const root = hdkey.fromMasterSeed(seed);
    const hdNode = root.derivePath(`m/44'/60'/0'/0/${index}`);
    return hdNode.getWallet();
  }

  async createAndExecuteTransaction(index: number, to: string, value: number, data: string) {
    const hdAccount = await this.getHDWalletAccount(index);
    const from = hdAccount.getAddressString();

    const txData = {
      from,
      to,
      value: this.web3.utils.toWei(value.toString(), 'ether'),
      gas: 200000,
      data,
    };

    // 트랜잭션 서명
    const signedTx = await this.web3.eth.accounts.signTransaction(
      txData,
      hdAccount.getPrivateKeyString(),
    );

    // 트랜잭션 실행
    return this.executeTransaction(from, to, value, data, signedTx.rawTransaction);
  }

  async executeTransaction(
    from: string,
    to: string,
    value: number,
    data: string,
    signature: string,
  ) {
    const nonce = await this.web3.eth.getTransactionCount(this.centralWallet, 'pending');

    const txHash = this.web3.utils.soliditySha3(
      { type: 'address', value: from },
      { type: 'address', value: to },
      { type: 'uint256', value: value },
      { type: 'bytes', value: data },
    );

    const { r, s, v } = this.parseSignature(signature);

    let signer: string;
    try {
      signer = this.web3.eth.accounts.recover({
        messageHash: txHash,
        v: v.toString(),
        r: r,
        s: s,
      });
    } catch (error) {
      throw new Error('Failed to recover signer from signature: ' + error.message);
    }

    if (signer.toLowerCase() !== from.toLowerCase()) {
      throw new Error('Invalid signature');
    }

    const tx = {
      from: this.centralWallet,
      to: this.contract.options.address,
      data: this.contract.methods.executeTransaction(from, to, value, data, v, r, s).encodeABI(),
      gas: 200000,
      gasPrice: await this.web3.eth.getGasPrice(),
      nonce,
    };

    try {
      const signedTx = await this.web3.eth.accounts.signTransaction(
        tx,
        this.centralWalletPrivateKey,
      );
      return await this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    } catch (error) {
      throw new Error('Failed to send signed transaction: ' + error.message);
    }
  }

  private parseSignature(signature: string) {
    const r = `0x${signature.slice(2, 66)}`;
    const s = `0x${signature.slice(66, 130)}`;
    const v = parseInt(signature.slice(130, 132), 16);
    return { r, s, v };
  }
}
