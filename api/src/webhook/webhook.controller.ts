import {Controller, Get, Req} from '@nestjs/common';
import {ApiCreatedResponse, ApiOperation} from "@nestjs/swagger";
import {WebhookService} from "./webhook.service";

@Controller('webhook')
export class WebhookController {

    constructor(private readonly webhookService: WebhookService) {}

    @Get('getApiKey')
    @ApiOperation({ summary: '', description: '' })
    @ApiCreatedResponse({ description: '' })
    async selectApiKey(@Req() req,) {
        this.webhookService.sendWebhookResponse('https://example.com/webhook', { message: 'Hello, Webhook!' })
            .subscribe({
                next: (response) => {
                    console.log('Webhook Response Status:', response.status);
                    console.log('Webhook Response Data:', response.data);
                },
                error: (error) => {
                    console.error('Webhook Error:', error);
                },
            });
    }


}
