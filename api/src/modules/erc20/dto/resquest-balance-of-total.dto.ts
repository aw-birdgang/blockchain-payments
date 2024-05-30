import { ApiProperty } from '@nestjs/swagger';

export class RequestBalanceOfTotalDto {
  @ApiProperty({
    description: 'Owner Address',
    default: '0x0000000000000000000000000000000000000000',
  })
  ownerAddress: string;
}
