import { Type } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export function PaginatedResponseDto<T>(classRef: Type<T>) {
    class PaginatedMeta {
        @ApiProperty()
        page: number;

        @ApiProperty()
        pageSize: number;

        @ApiProperty()
        totalItems: number;

        @ApiProperty()
        totalPages: number;

        @ApiProperty()
        hasNextPage: boolean;

        @ApiProperty()
        hasPreviousPage: boolean;
    }

    class PaginatedData {
        @ApiProperty({ type: [classRef] })
        items: T[];

        @ApiProperty({ type: PaginatedMeta })
        meta: PaginatedMeta;
    }

    class Response {
        @ApiProperty()
        status: boolean;

        @ApiProperty()
        message: string;

        @ApiProperty({ type: PaginatedData })
        data: PaginatedData;

        @ApiProperty()
        timestamp: string;
    }

    Object.defineProperty(Response, 'name', {
        value: `PaginatedResponse_${classRef.name}`,
    });

    return Response;
}
