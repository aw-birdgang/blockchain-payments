import { ApiProperty } from '@nestjs/swagger';

export class ResponseBalanceOfDto {
  @ApiProperty({ description: 'Address' })
  address: string;

  @ApiProperty({ description: 'Balance' })
  balance: string;
}
