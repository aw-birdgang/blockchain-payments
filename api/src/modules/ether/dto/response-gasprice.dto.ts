import { ApiProperty } from '@nestjs/swagger';

export class ResponseGasPriceDto {
  @ApiProperty({ description: 'Gas Price' })
  gasPrice: string;
}
