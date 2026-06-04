import { Controller, Post, Body, Req } from '@nestjs/common';
import { WebhookService } from '../services/webhook.service';
import { DuitkuWebhookDto } from '../dto/duitku-webhook.dto';

@Controller('webhook/duitku')
export class DuitkuWebhookController {
    constructor(private readonly webhookService: WebhookService) {}

    @Post()
    async handle(@Body() payload: DuitkuWebhookDto, @Req() req: any) {
        return this.webhookService.process(
            payload.providerId,
            payload,
            payload.signature,
            req.ip,
        );
    }
}
