import { Controller, Post, Body, Req } from '@nestjs/common';
import { WebhookService } from '../services/webhook.service';
import { PaydisiniWebhookDto } from '../dto/paydisini-webhook.dto';

@Controller('webhook/paydisini')
export class PaydisiniWebhookController {
    constructor(private readonly webhookService: WebhookService) {}

    @Post()
    async handle(@Body() payload: PaydisiniWebhookDto, @Req() req: any) {
        return this.webhookService.process(
            payload.providerId,
            payload,
            payload.signature,
            req.ip,
        );
    }
}
