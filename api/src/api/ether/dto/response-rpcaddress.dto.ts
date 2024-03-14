import { ApiProperty } from '@nestjs/swagger';

export class ResponseRPCAddressDto {
  @ApiProperty({ description: 'RPC Address' })
  address: string;
}
