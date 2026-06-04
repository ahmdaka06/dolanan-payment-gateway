export interface SyncChannelData {
    providerCode: string;
    channels: Array<{
        code: string;
        name: string;
        feePercent?: number;
        feeFlat?: number;
        status?: string;
    }>;
}
