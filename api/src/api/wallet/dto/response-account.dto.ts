import { ApiProperty } from '@nestjs/swagger';

export class ResponseApiKeyDto {
  @ApiProperty({ description: '그룹코드', default: 'client_code' })
  client_code: string;

  @ApiProperty({ description: '사용자 API Key', default: 'api key' })
  api_key: string;

  @ApiProperty({ description: 'Webhook Href', default: 'https://xxx.com/yyy' })
  webhook_href: string;

  @ApiProperty({ description: '생성일시' })
  created_at: Date;
}
