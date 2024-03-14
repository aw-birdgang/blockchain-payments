import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DepositTransactions {
  @ApiProperty({ description: 'network', default: 'Ethereum' })
  network: string;

  @ApiProperty({ description: 'coin', default: 'Ether' })
  coin: string;

  @IsNumber()
  @ApiProperty({ description: 'amounts', default: 0 })
  amounts: number;

  @ApiProperty({ description: 'txhash', default: '0x00000000000000000000000000000000000000000000000000' })
  txhash: string;

  @ApiProperty({ description: 'from_address', default: '0x0000000000000000000000000000000000000000' })
  from_address: string;

  @ApiProperty({ description: 'to_address', default: '0x0000000000000000000000000000000000000000' })
  to_address: string;

  @IsNumber()
  @ApiProperty({ description: 'block_number', default: 0 })
  block_number: number;
}
