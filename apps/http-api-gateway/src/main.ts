/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { HttpApiGatewayModule } from './http-api-gateway.module';
import logger from '@app/common/log/logger';
import config from '@app/common/config/config';
import { ValidationPipe } from '@nestjs/common';
import {
  BaseRpcExceptionFilter,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';

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
        version: config.APP_VERSION,
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
