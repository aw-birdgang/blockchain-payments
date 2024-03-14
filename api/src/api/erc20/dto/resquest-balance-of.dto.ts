import { ApiProperty } from '@nestjs/swagger';

export class RequestBalanceOfDto {
  // @ApiProperty({ description: 'Blockchain Network (Ethereum, Polygon)', default: 'Ethereum' })
  // network: string;

  @ApiProperty({ description: 'Owner Address', default: '0x0000000000000000000000000000000000000000' })
  ownerAddress: string;

  @ApiProperty({ description: 'Token (USDT, USDC)', default: 'USDT' })
  token: string;
}
