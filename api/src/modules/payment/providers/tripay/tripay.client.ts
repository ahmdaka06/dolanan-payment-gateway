import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { AppConfigService } from '../../../../config/app-config.service';

@Injectable()
export class TripayClient {
    constructor(private readonly config: AppConfigService) {}

    getClient(apiKey: string): AxiosInstance {
        return axios.create({
            baseURL: this.config.tripayApiUrl,
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
        });
    }
}
