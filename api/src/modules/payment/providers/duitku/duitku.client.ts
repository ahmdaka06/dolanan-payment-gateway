import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class DuitkuClient {
    private readonly client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: process.env.DUITKU_API_URL || 'https://api.duitku.com',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    getClient(): AxiosInstance {
        return this.client;
    }
}
