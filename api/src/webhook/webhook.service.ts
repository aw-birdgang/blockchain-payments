import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

@Injectable()
export class WebhookService {
    constructor(private readonly httpService: HttpService) {}

    sendWebhookResponse(webhookUrl: string, data: any): Observable<AxiosResponse<any>> {
        return this.httpService.post(webhookUrl, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
