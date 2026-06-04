import { Injectable } from '@nestjs/common';
import { HttpService as NestHttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class HttpService {
    constructor(private readonly httpService: NestHttpService) {}

    async get<T>(url: string, config?: any): Promise<T> {
        const response = await firstValueFrom(
            this.httpService.get<T>(url, config),
        );
        return response.data;
    }

    async post<T>(url: string, data?: any, config?: any): Promise<T> {
        const response = await firstValueFrom(
            this.httpService.post<T>(url, data, config),
        );
        return response.data;
    }

    async put<T>(url: string, data?: any, config?: any): Promise<T> {
        const response = await firstValueFrom(
            this.httpService.put<T>(url, data, config),
        );
        return response.data;
    }

    async patch<T>(url: string, data?: any, config?: any): Promise<T> {
        const response = await firstValueFrom(
            this.httpService.patch<T>(url, data, config),
        );
        return response.data;
    }

    async delete<T>(url: string, config?: any): Promise<T> {
        const response = await firstValueFrom(
            this.httpService.delete<T>(url, config),
        );
        return response.data;
    }
}
