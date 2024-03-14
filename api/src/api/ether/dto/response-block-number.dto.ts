import { ApiProperty } from '@nestjs/swagger';

export class ResponseBlockNumberDto {
  @ApiProperty({ description: 'Block Number' })
  blockNumber: string;
}
