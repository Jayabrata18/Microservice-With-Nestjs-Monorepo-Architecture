import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import logger from '@app/common/log/logger';
import config from '@app/common/config/config';

async function bootstrap() {
  logger.info('Starting microservice-with-nestjs-monorepo-architecture');
  const app = await NestFactory.create(AppModule);
  await app.listen(config.PORT, () => {
    logger.info(`  🚀   Microservice is running at port ${config.PORT}`, {
      meta: {
        PORT: config.PORT,
        SERVER_URL: config.SERVER_URL,
      },
    });
  });
}
bootstrap().catch((error) => {
  logger.error('Bootstrap process failed with error:', error);
});
