import { ApiProperty } from '@nestjs/swagger';

export class RequestContractNameDto {
  @ApiProperty({ description: 'Owner Address', default: '0x0000000000000000000000000000000000000000' })
  contractAddress: string;
}
