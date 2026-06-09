import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
    Query,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiOkResponse, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ProviderAccountService } from '../services/provider-account.service';
import { CreateProviderAccountDto } from '../dto/payload/create-provider-account.dto';
import { UpdateProviderAccountDto } from '../dto/payload/update-provider-account.dto';
import { ProviderAccount } from '../entities/provider-account.entity';
import { ResponseDto } from '../../../common/dto/response/api-response.dto';
import { PaginatedResponseDto } from '../../../common/dto/response/paginated-response.dto';
import type { PaginatedResult } from '../../../common/interfaces/pagination.type';

@ApiTags('Provider Accounts')
@ApiBearerAuth()
@Controller('provider-accounts')
export class ProviderAccountController {
    constructor(private readonly providerAccountService: ProviderAccountService) {}

    @Get()
    @ApiOperation({ summary: 'Get all provider accounts with pagination' })
    @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
    @ApiQuery({ name: 'pageSize', required: false, type: Number, example: 10 })
    @ApiQuery({ name: 'providerId', required: false, type: String })
    @ApiOkResponse({ description: 'Paginated list of provider accounts', type: PaginatedResponseDto(ProviderAccount) })
    async getAll(
        @Query('page') page?: number,
        @Query('pageSize') pageSize?: number,
        @Query('providerId') providerId?: string,
    ): Promise<PaginatedResult<ProviderAccount>> {
        return this.providerAccountService.findAll({ page, pageSize }, providerId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get provider account by ID' })
    @ApiParam({ name: 'id', type: String })
    @ApiOkResponse({ description: 'Provider account found', type: ResponseDto(ProviderAccount) })
    async getById(@Param('id') id: string) {
        return this.providerAccountService.findOne(id);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new provider account' })
    @ApiBody({ type: CreateProviderAccountDto })
    @ApiOkResponse({ description: 'Provider account created', type: ResponseDto(ProviderAccount) })
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() dto: CreateProviderAccountDto) {
        return this.providerAccountService.create(dto);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update provider account by ID' })
    @ApiParam({ name: 'id', type: String })
    @ApiBody({ type: UpdateProviderAccountDto })
    @ApiOkResponse({ description: 'Provider account updated', type: ResponseDto(ProviderAccount) })
    async update(@Param('id') id: string, @Body() dto: UpdateProviderAccountDto) {
        return this.providerAccountService.update(id, dto);
    }

    @Patch(':id/toggle-active')
    @ApiOperation({ summary: 'Toggle provider account active status' })
    @ApiParam({ name: 'id', type: String })
    @ApiOkResponse({ description: 'Provider account active status toggled', type: ResponseDto(ProviderAccount) })
    async toggleActive(@Param('id') id: string) {
        return this.providerAccountService.toggleActive(id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete provider account by ID' })
    @ApiParam({ name: 'id', type: String })
    @ApiOkResponse({ description: 'Provider account deleted' })
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id') id: string) {
        await this.providerAccountService.remove(id);
    }
}
