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
import { ProviderService } from '../services/provider.service';
import { CreateProviderDto } from '../dto/payload/create-provider.dto';
import { UpdateProviderDto } from '../dto/payload/update-provider.dto';
import { Provider } from '../entities/provider.entity';
import { ResponseDto } from '../../../common/dto/response/api-response.dto';

@ApiTags('Providers')
@ApiBearerAuth()
@Controller('providers')
export class ProviderController {
    constructor(private readonly providerService: ProviderService) {}

    @Get()
    @ApiOperation({ summary: 'Get all providers' })
    @ApiOkResponse({ description: 'List of providers', type: ResponseDto(Provider) })
    async getAllProviders() {
        return this.providerService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get provider by ID' })
    @ApiParam({ name: 'id', type: String })
    @ApiOkResponse({ description: 'Provider found', type: ResponseDto(Provider) })
    async getProviderById(@Param('id') id: string) {
        return this.providerService.findOne(id);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new provider' })
    @ApiBody({ type: CreateProviderDto })
    @ApiOkResponse({ description: 'Provider created', type: ResponseDto(Provider) })
    @HttpCode(HttpStatus.CREATED)
    async createProvider(@Body() dto: CreateProviderDto) {
        return this.providerService.create(dto);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update provider by ID' })
    @ApiParam({ name: 'id', type: String })
    @ApiBody({ type: UpdateProviderDto })
    @ApiOkResponse({ description: 'Provider updated', type: ResponseDto(Provider) })
    async updateProvider(@Param('id') id: string, @Body() dto: UpdateProviderDto) {
        return this.providerService.update(id, dto);
    }

    @Patch(':id/toggle-active')
    @ApiOperation({ summary: 'Toggle provider active status' })
    @ApiParam({ name: 'id', type: String })
    @ApiOkResponse({ description: 'Provider active status toggled', type: ResponseDto(Provider) })
    async toggleActive(@Param('id') id: string) {
        return this.providerService.toggleActive(id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete provider by ID' })
    @ApiParam({ name: 'id', type: String })
    @ApiOkResponse({ description: 'Provider deleted' })
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteProvider(@Param('id') id: string) {
        await this.providerService.remove(id);
    }
}
