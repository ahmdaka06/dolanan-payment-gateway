import {
    Controller,
    Get,
    Post,
    Patch,
    Put,
    Delete,
    Body,
    Param,
    Query,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiOkResponse, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/payload/create-user.dto';
import { UpdateUserDto } from '../dto/payload/update-user.dto';
import { User } from '../entities/user.entity';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import type { RequestUser } from '../../../common/interfaces/request-user.type';
import type { PaginatedResult } from '../../../common/interfaces/pagination.type';
import { ResponseDto } from '../../../common/dto/response/api-response.dto';
import { PaginatedResponseDto } from '../../../common/dto/response/paginated-response.dto';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @ApiOperation({ summary: 'Get all users with pagination' })
    @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
    @ApiQuery({ name: 'pageSize', required: false, type: Number, example: 10 })
    @ApiOkResponse({ description: 'Paginated list of users', type: PaginatedResponseDto(User) })
    async getAllUsers(
        @Query('page') page?: number,
        @Query('pageSize') pageSize?: number,
    ): Promise<PaginatedResult<User>> {
        return this.userService.getAllUsers({ page, pageSize });
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get user by ID' })
    @ApiParam({ name: 'id', type: String })
    @ApiOkResponse({ description: 'User found', type: ResponseDto(User) })
    async getUserById(@Param('id') id: string) {
        return this.userService.getUserById(id);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new user' })
    @ApiBody({ type: CreateUserDto })
    @ApiOkResponse({ description: 'User created', type: ResponseDto(User) })
    @HttpCode(HttpStatus.CREATED)
    async createUser(@Body() dto: CreateUserDto) {
        return this.userService.createUser(dto);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update user by ID' })
    @ApiParam({ name: 'id', type: String })
    @ApiBody({ type: UpdateUserDto })
    @ApiOkResponse({ description: 'User updated', type: ResponseDto(User) })
    async updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
        return this.userService.updateUser(id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete user by ID (cannot delete self)' })
    @ApiParam({ name: 'id', type: String })
    @ApiOkResponse({ description: 'User deleted' })
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteUser(@Param('id') id: string, @CurrentUser() user: RequestUser) {
        return this.userService.deleteUser(id, user.sub);
    }

    @Put('profile')
    @ApiOperation({ summary: 'Update own profile' })
    @ApiBody({ type: UpdateUserDto })
    @ApiOkResponse({ description: 'Profile updated', type: ResponseDto(User) })
    async updateProfile(@CurrentUser() user: RequestUser, @Body() dto: UpdateUserDto) {
        return this.userService.updateProfile(user.sub, dto);
    }
}
