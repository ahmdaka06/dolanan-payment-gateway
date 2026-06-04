export const appConfig = () => ({
    port: parseInt(process.env.APP_PORT ?? '3000', 10),
    prefix: process.env.APP_PREFIX || 'api/v1',
    nodeEnv: process.env.NODE_ENV || 'development',
});
