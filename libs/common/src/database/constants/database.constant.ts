/* eslint-disable prettier/prettier */
import { DatabaseType } from 'typeorm';
import { Database } from '../interface/database.interface';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import config from '@app/common/config/config';
export const DATABASE_CONFIG: Record<Database, {
    type: DatabaseType, env: string, entities: EntityClassOrSchema[], host: string | undefined, port: number, user: string, database: string, password: string, synchronize: boolean,  
    dropSchema: boolean, }> = {
    primary: {
        type: 'postgres',
        env: 'PRIMARY',
        entities: [
        ],
        host: config.POSTGRES_HOST, 
        port: config.POSTGRES_PORT, 
        user: config.POSTGRES_USER, 
        database: config.POSTGRES_DB, 
        password: config.POSTGRES_PASSWORD, 
        synchronize: true, // set false in production
        dropSchema: true,
    },
    secondary: {
        type: 'mongodb',
        env: 'SECONDARY',
        entities: [
        ],
        host: config.MONGODB_USERNAME,
        port: config.POSTGRES_PORT,
        user: config.POSTGRES_USER,
        database: config.POSTGRES_DB,
        password: config.POSTGRES_PASSWORD,
        synchronize: true, // set false in production
        dropSchema: true,
    }
};
