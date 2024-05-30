import { ApiProperty } from '@nestjs/swagger';

export class RequestContractAllowanceDto {
  @ApiProperty({ description: 'token', default: 'USDT' })
  token: string;
  @ApiProperty({
    description: 'Private Key',
    default: '0x0000000000000000000000000000000000000000',
  })
  private_key: string;
  @ApiProperty({ description: 'To Address', default: '0x0000000000000000000000000000000000000000' })
  toAddress: string;
}
