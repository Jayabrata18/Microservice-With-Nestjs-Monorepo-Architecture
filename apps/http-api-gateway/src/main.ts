/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { HttpApiGatewayModule } from './http-api-gateway.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import logger from '@app/common/log/logger';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import {
  BaseRpcExceptionFilter,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
import config from '@app/common/config/config';

async function bootstrap() {
  logger.info('---------Http-api-gateway is starting---------');

  try {
    const app = await NestFactory.create(HttpApiGatewayModule, {
      abortOnError: false,
      bufferLogs: true,
      rawBody: true,
    });

    app.setGlobalPrefix('api');

    app.useGlobalFilters(new BaseRpcExceptionFilter());
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    );
    app.enableVersioning({
      type: VersioningType.URI,
    })
    logger.info('Setting up Swagger documentation...');
    const swagger = new DocumentBuilder()
      .setTitle('microservice-with-nestjs-monorepo-architecture')
      .setDescription('The API Description')
      .build();

    const document = SwaggerModule.createDocument(app, swagger);
    SwaggerModule.setup('/api/docs', app, document);
    logger.info('Swagger documentation is set up successfully at /api/docs', { meta: { url: 'http://localhost:3000/api/docs' } });

    logger.info('Connecting to NATS server...', {
      meta: {
        servers: config.NATS_URI,
      },
    });

    const natsClientOptions: MicroserviceOptions = {
      transport: Transport.NATS,
      options: {
        servers: [config.NATS_URI],
      },
    };
    app.connectMicroservice(natsClientOptions);

    await app.startAllMicroservices();
    logger.info('All microservices started successfully.');

    await app.listen(config.PORT, () => {
      logger.info(`🚀 Microservice is running at port ${config.PORT}`, {
        meta: {
          PORT: config.PORT,
          SERVER_NAME: config.SERVER_URL,
        },
      });
    });

    logger.info('Service configuration', {
      meta: {
        environment: config.ENV,
      },
    });

    logger.info('Http-api-gateway bootstrap completed successfully.');

  } catch (error) {
    logger.error('Http-api-gateway bootstrap process failed with error:', {
      error: error.message,
      stack: error.stack,
    });
  }
}

bootstrap();
