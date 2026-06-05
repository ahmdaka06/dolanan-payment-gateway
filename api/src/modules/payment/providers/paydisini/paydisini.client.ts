import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { AppConfigService } from '../../../../config/app-config.service';

@Injectable()
export class PaydisiniClient {
    private readonly client: AxiosInstance;

    constructor(private readonly config: AppConfigService) {
        this.client = axios.create({
            baseURL: this.config.paydisiniApiUrl,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    getClient(): AxiosInstance {
        return this.client;
    }
}
