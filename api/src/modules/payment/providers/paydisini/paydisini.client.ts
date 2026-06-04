import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class PaydisiniClient {
    private readonly client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: process.env.PAYDISINI_API_URL || 'https://api.paydisini.co.id',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    getClient(): AxiosInstance {
        return this.client;
    }
}
