import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
    FastifyAdapter,
    NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger.config';
import { appConfig } from './config/app.config';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter(),
    );

    app.setGlobalPrefix(appConfig().prefix);
    setupSwagger(app);

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
        }),
    );

    await app.listen(appConfig().port, '0.0.0.0');
}

bootstrap();
