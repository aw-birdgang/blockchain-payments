import { ApiProperty } from '@nestjs/swagger';

export class ResponseWalletDto {
  @ApiProperty({ description: '그룹코드', default: 'group_code' })
  group_code: string;

  @ApiProperty({ description: '블록체인 네트워크', default: 'Ethereum' })
  network: string;

  @ApiProperty({ description: 'Wallet Address', default: '0x0000000000000000000000000' })
  wallet_address: string;

  @ApiProperty({ description: '생성일시' })
  created_at: Date;

  @ApiProperty({ description: '수정일시' })
  updated_at: Date;
}
