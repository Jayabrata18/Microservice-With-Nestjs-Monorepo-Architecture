/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { App2Module } from './app2.module';
import logger from '@app/common/log/logger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import config from '@app/common/config/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  logger.info('---------App2 is starting---------');

  try {
    logger.info('Connecting to NATS server...', {
      meta: {
        servers: config.NATS_URI,
      },
    });

    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
      App2Module,
      {
        transport: Transport.NATS,
        options: {
          servers: [config.NATS_URI],
        },
      },
    );

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    );

    await app.listen();
    logger.info('App2 Bootstrap process completed', {
      meta: {
        
      },
    });

  } catch (error) {
    logger.error('App2 Bootstrap process failed with error:', {
      error: error.message,
      stack: error.stack,
    });
  }
}

bootstrap();
