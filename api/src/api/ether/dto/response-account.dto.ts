import { ApiProperty } from '@nestjs/swagger';

export class ResponseAccountDto {
  @ApiProperty({ description: 'Address' })
  address: string;

  @ApiProperty({ description: 'Private Key' })
  privateKey: string;
}
