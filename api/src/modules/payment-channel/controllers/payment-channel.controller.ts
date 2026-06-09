import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiOkResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { PaymentChannelService } from '../services/payment-channel.service';
import { CreatePaymentChannelDto } from '../dto/payload/create-payment-channel.dto';
import { UpdatePaymentChannelDto } from '../dto/payload/update-payment-channel.dto';
import { PaymentChannel } from '../entities/payment-channel.entity';
import { ResponseDto } from '../../../common/dto/response/api-response.dto';

@ApiTags('Payment Channels')
@ApiBearerAuth()
@Controller('payment-channels')
export class PaymentChannelController {
    constructor(private readonly paymentChannelService: PaymentChannelService) {}

    @Get()
    @ApiOperation({ summary: 'Get all payment channels' })
    @ApiOkResponse({ description: 'List of payment channels', type: ResponseDto(PaymentChannel) })
    async getAll() {
        return this.paymentChannelService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get payment channel by ID' })
    @ApiParam({ name: 'id', type: String })
    @ApiOkResponse({ description: 'Payment channel found', type: ResponseDto(PaymentChannel) })
    async getById(@Param('id') id: string) {
        return this.paymentChannelService.findOne(id);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new payment channel' })
    @ApiBody({ type: CreatePaymentChannelDto })
    @ApiOkResponse({ description: 'Payment channel created', type: ResponseDto(PaymentChannel) })
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() dto: CreatePaymentChannelDto) {
        return this.paymentChannelService.create(dto);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update payment channel by ID' })
    @ApiParam({ name: 'id', type: String })
    @ApiBody({ type: UpdatePaymentChannelDto })
    @ApiOkResponse({ description: 'Payment channel updated', type: ResponseDto(PaymentChannel) })
    async update(@Param('id') id: string, @Body() dto: UpdatePaymentChannelDto) {
        return this.paymentChannelService.update(id, dto);
    }

    @Patch(':id/toggle-active')
    @ApiOperation({ summary: 'Toggle payment channel active status' })
    @ApiParam({ name: 'id', type: String })
    @ApiOkResponse({ description: 'Active status toggled', type: ResponseDto(PaymentChannel) })
    async toggleActive(@Param('id') id: string) {
        return this.paymentChannelService.toggleActive(id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete payment channel by ID' })
    @ApiParam({ name: 'id', type: String })
    @ApiOkResponse({ description: 'Payment channel deleted' })
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id') id: string) {
        await this.paymentChannelService.remove(id);
    }
}
