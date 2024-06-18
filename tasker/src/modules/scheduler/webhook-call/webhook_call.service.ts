import { Injectable, Logger } from '@nestjs/common';

import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

@Injectable()
export class WebhookCallService {
  private readonly logger = new Logger(WebhookCallService.name);

  private processing: boolean = false;

  constructor(private readonly httpService: HttpService) {}

  async onModuleInit() {
    this.logger.log('onModuleInit()');
  }

  sendWebhookResponse(
    webhookUrl: string,
    data: any,
  ): Observable<AxiosResponse<any>> {
    return this.httpService.post(webhookUrl, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
