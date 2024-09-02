/* eslint-disable prettier/prettier */
import dotenvFlow from 'dotenv-flow';

dotenvFlow.config();

export default {
  ENV: process.env.ENV,
  APP_VERSION: process.env.APP_VERSION,
  PORT: process.env.PORT as unknown as number,
  PORT2: process.env.PORT2 as unknown as number,
  SERVER_URL: process.env.SERVER_URL,
  NATS_URI: process.env.NATS_URI as string,
  MONGODB_CONNECTION_STRING: process.env.MONGODB_CONNECTION_STRING,
  MONGODB_USERNAME: process.env.MONGODB_USERNAME,
  MONGODB_PASSWORD: process.env.MONGODB_PASSWORD,
  MONGODB_DATABASE: process.env.MONGODB_DATABASE,
  MONGODB_DATABASE_URL: process.env.MONGODB_DATABASE_URL,
  POSTGRES_DATABASE_URL: process.env.POSTGRES_DATABASE_URL,
  DURATION: 60,
  POINTS: 10,
  REDIS_URL: process.env.REDIS_URL,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  REDIS_DB: process.env.REDIS_DB,
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_DB: process.env.POSTGRES_DB,
  POSTGRES_HOST: process.env.POSTGRES_HOST,
  POSTGRES_PORT: process.env.POSTGRES_PORT,
};
