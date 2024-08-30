import { NestFactory } from '@nestjs/core';
import { HttpApiGatewayModule } from './http-api-gateway.module';
import logger from '@app/common/log/logger';
import config from '@app/common/config/config';

async function bootstrap() {
  logger.info('---------Http-api-gateway is starting---------');
  const app = await NestFactory.create(HttpApiGatewayModule, {
    bufferLogs: true,
  });
  await app.listen(config.PORT, () => {
    logger.info(`  🚀   Microservice is running at port ${config.PORT}`, {
      meta: {
        PORT: config.PORT,
      },
    });
  });
}
bootstrap().catch((error) => {
  logger.error('Http-api-gateway  Bootstrap process failed with error:', error);
});
