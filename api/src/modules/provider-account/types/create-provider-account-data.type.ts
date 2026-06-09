import type { Environment } from '../enums/environment.enum';

export type CreateProviderAccountData = {
    providerId: string;
    name: string;
    apiKey?: string;
    secretKey?: string;
    merchantCode?: string;
    environment?: Environment;
};
