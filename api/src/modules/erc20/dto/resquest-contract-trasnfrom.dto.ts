import { ApiProperty } from '@nestjs/swagger';

export class RequestContractTransferFromDto {
  @ApiProperty({ description: 'token', default: 'USDT' })
  token: string;

  @ApiProperty({
    description: 'Private Key',
    default: '0x0000000000000000000000000000000000000000',
  })
  private_key: string;

  @ApiProperty({
    description: 'From Address',
    default: '0x0000000000000000000000000000000000000000',
  })
  fromAddress: string;

  @ApiProperty({ description: 'To Address', default: '0x0000000000000000000000000000000000000000' })
  toAddress: string;

  @ApiProperty({ description: 'Transfer Amount', default: '1' })
  toAmount: string;
}
