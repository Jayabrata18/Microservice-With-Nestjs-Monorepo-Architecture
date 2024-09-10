/* eslint-disable prettier/prettier */
// import dotenvFlow from 'dotenv-flow';
// import logger from '../log/logger';
// import Joi from 'joi';
// dotenvFlow.config();

// const envSchema = Joi.object({
//   ENV: Joi.string().valid('development', 'production', 'test').required(),
//   APP_VERSION: Joi.string().required(),
//   PORT: Joi.number().required(),
//   PORT2: Joi.number().required(),
//   SERVER_URL: Joi.string().uri().required(),
//   NATS_URI: Joi.string().uri().required(),
//   NATS_PORT: Joi.number().required(),
//   MONGODB_DATABASE: Joi.string().required(),
//   MONGODB_DATABASE_URL: Joi.string().uri().required(),
//   POSTGRES_DATABASE_URL: Joi.string().uri().required(),
//   DURATION: Joi.number().default(60),
//   POINTS: Joi.number().default(10),
//   REDIS_URL: Joi.string().uri().required(),
//   REDIS_PORT: Joi.number().required(),
//   REDIS_PASSWORD: Joi.string().required(),
//   REDIS_DB: Joi.number().required(),
//   POSTGRES_USER: Joi.string().required(),
//   POSTGRES_PASSWORD: Joi.string().required(),
//   POSTGRES_DB: Joi.string().required(),
//   POSTGRES_HOST: Joi.string().required(),
//   POSTGRES_PORT: Joi.number().required(),
// }).unknown();

// const { error, value: validatedEnv } = envSchema.validate(process.env, { allowUnknown: true, stripUnknown: true });

// if (error) {
//  logger.error(`Config validation error: ${error.message}. Please ensure that all required environment variables are set and valid.`);
// }

// export default {
//   ENV: validatedEnv.ENV,
//   APP_VERSION: validatedEnv.APP_VERSION,
//   PORT: validatedEnv.PORT,
//   PORT2: validatedEnv.PORT2,
//   SERVER_URL: validatedEnv.SERVER_URL,
//   NATS_URI: validatedEnv.NATS_URI,
//   NATS_PORT: validatedEnv.NATS_PORT,
//   MONGODB_CONNECTION_STRING: validatedEnv.MONGODB_CONNECTION_STRING,
//   MONGODB_USERNAME: validatedEnv.MONGODB_USERNAME,
//   MONGODB_PASSWORD: validatedEnv.MONGODB_PASSWORD,
//   MONGODB_DATABASE: validatedEnv.MONGODB_DATABASE,
//   MONGODB_DATABASE_URL: validatedEnv.MONGODB_DATABASE_URL,
//   POSTGRES_DATABASE_URL: validatedEnv.POSTGRES_DATABASE_URL,
//   DURATION: validatedEnv.DURATION,
//   POINTS: validatedEnv.POINTS,
//   REDIS_URL: validatedEnv.REDIS_URL,
//   REDIS_PORT: validatedEnv.REDIS_PORT,
//   REDIS_PASSWORD: validatedEnv.REDIS_PASSWORD,
//   REDIS_DB: validatedEnv.REDIS_DB,
//   POSTGRES_USER: validatedEnv.POSTGRES_USER,
//   POSTGRES_PASSWORD: validatedEnv.POSTGRES_PASSWORD,
//   POSTGRES_DB: validatedEnv.POSTGRES_DB,
//   POSTGRES_HOST: validatedEnv.POSTGRES_HOST,
//   POSTGRES_PORT: validatedEnv.POSTGRES_PORT,
// };

import dotenvFlow from 'dotenv-flow';

dotenvFlow.config();

export default {
  ENV: process.env.ENV,
  PORT: process.env.PORT as string,
  SERVER_URL: process.env.SERVER_URL,
  MONGODB_DATABASE_URL: process.env.MONGODB_DATABASE_URL,
  POSTGRES_DATABASE_URL: process.env.POSTGRES_DATABASE_URL,
  DURATION: 60,
  POINTS: 10,
  REDIS_URL: process.env.REDIS_URL,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  REDIS_DB: process.env.REDIS_DB,
  NATS_URI: process.env.NATS_URI as string,



  POSTGRES_USER: process.env.POSTGRES_USER as string,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD as string,
  POSTGRES_DB: process.env.POSTGRES_DB as string,
  POSTGRES_HOST: process.env.POSTGRES_HOST as string,
  POSTGRES_PORT: process.env.POSTGRES_PORT as unknown as number,
}
