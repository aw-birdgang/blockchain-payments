import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class EthereumTransactionReceipt {
    @PrimaryGeneratedColumn()
    id: number;

    // "status": true,
    // "transactionHash": "0x9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d66f4c9c6c445836d8b",
    // "transactionIndex": 0,
    // "blockHash": "0xef95f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34b46",
    // "blockNumber": 3,
    // "contractAddress": "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe",
    // "cumulativeGasUsed": 314159,
    // "gasUsed": 30234,
    // "logs": [{
    //     // logs as returned by getPastLogs, etc.
    // }, ...]
}
