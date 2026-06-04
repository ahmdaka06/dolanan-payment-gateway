import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class TripayClient {
    private readonly client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: process.env.TRIPAY_API_URL || 'https://api.tripay.co.id',
            headers: {
                'Authorization': `Bearer ${process.env.TRIPAY_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });
    }

    getClient(): AxiosInstance {
        return this.client;
    }
}
