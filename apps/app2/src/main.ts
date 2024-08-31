import { NestFactory } from '@nestjs/core';
import { App2Module } from './app2.module';
import logger from '@app/common/log/logger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import config from '@app/common/config/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  logger.info('---------App2 is starting---------');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    App2Module,

    {
      transport: Transport.NATS,
      options: {
        servers: [config.NATS_URI],
      },
    },
  );
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen();
  logger.info('App2 Bootstrap process completed');
}
bootstrap().catch((error) => {
  logger.error('App2 Bootstrap process failed with error:', error);
});
