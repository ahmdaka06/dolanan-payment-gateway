import { Controller, Post, Body, Req } from '@nestjs/common';
import { WebhookService } from '../services/webhook.service';
import { TripayWebhookDto } from '../dto/payload/tripay-webhook.dto';

@Controller('webhook/tripay')
export class TripayWebhookController {
    constructor(private readonly webhookService: WebhookService) {}

    @Post()
    async handle(@Body() payload: TripayWebhookDto, @Req() req: any) {
        return this.webhookService.process(
            payload.providerId,
            payload,
            payload.signature,
            req.ip,
        );
    }
}
