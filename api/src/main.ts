import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
    FastifyAdapter,
    NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger/swagger.config';
import { appConfig } from './config/app.config';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter(),
    );

    app.enableCors({
        origin: (origin: any, callback: any) => {
          if (!origin) return callback(null, true);
    
          const allowed = [
            /^http:\/\/dolanan-payment-gateway\.test$/,
            /^http:\/\/([a-z0-9-]+\.)+dolanan-payment-gateway\.test$/,
            /^https:\/\/([a-z0-9-]+\.)*dolanan\.id$/,
            /^http:\/\/localhost:\d+$/,
          ];
    
          callback(null, allowed.some(r => r.test(origin)) ? origin : false);
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    });

    app.setGlobalPrefix(appConfig().prefix);
    setupSwagger(app);

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            forbidNonWhitelisted: true,
        }),
    );

    await app.listen(appConfig().port, '0.0.0.0');
}

bootstrap();
