import type { Environment } from '../enums/environment.enum';

export type UpdateProviderAccountData = {
    name?: string;
    apiKey?: string;
    secretKey?: string;
    merchantCode?: string;
    environment?: Environment;
    isActive?: boolean;
};
