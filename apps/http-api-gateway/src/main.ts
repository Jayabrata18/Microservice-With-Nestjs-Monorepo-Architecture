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
  const app = await NestFactory.create(HttpApiGatewayModule, {
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
  const natsClientOptions: MicroserviceOptions = {
    transport: Transport.NATS,
    options: {
      servers: [config.NATS_URI],
    },
  };
  app.connectMicroservice(natsClientOptions);
  await app.startAllMicroservices();
  await app.listen(config.PORT, () => {
    logger.info(`  🚀   Microservice is running at port ${config.PORT}`, {
      meta: {
        PORT: config.PORT,
        SERVER_NAME: config.SERVER_URL,
      },
    });
  });
}
bootstrap().catch((error) => {
  logger.error('Http-api-gateway  Bootstrap process failed with error:', error);
});
