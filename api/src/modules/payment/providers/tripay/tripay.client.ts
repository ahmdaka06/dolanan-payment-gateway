import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class TripayClient {
    getClient(apiKey: string): AxiosInstance {
        return axios.create({
            baseURL: process.env.TRIPAY_API_URL || 'https://api.tripay.co.id',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
        });
    }
}
