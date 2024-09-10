/* eslint-disable prettier/prettier */
import { DynamicModule } from '@nestjs/common';
import { Database } from './interface/database.interface';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DATABASE_CONFIG } from './constants/database.constant';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import logger from '../log/logger';

export class DatabaseModule {
    static register(database: Database): DynamicModule {
        return {
            module: DatabaseModule,
            imports: [
                TypeOrmModule.forRootAsync({
                    name: database,
                    useFactory: (): TypeOrmModuleOptions => {
                        const config = DATABASE_CONFIG[database];
                        logger.info(`Initializing database connection for ${database}...`, {
                            meta: {
                                database: config.database,
                                type: config.type,
                            }
                        });
                        return {
                            type: config.type,
                            host: config.host,
                            port: config.port,
                            database: config.database,
                            username: config.user,
                            password: config.password,
                            entities: config.entities,
                            synchronize: config.synchronize,
                            dropSchema: config.dropSchema,
                            retryAttempts: 3,
                            retryDelay: 3000,
                            autoLoadEntities: true,
                        } as TypeOrmModuleOptions;
                        logger.info(`Database configuration for ${database} initialized.`);
                    },
                    inject: [],
                }),
            ],
            exports: [TypeOrmModule]
        }
    }

    static forEntity(database: Database, entities: EntityClassOrSchema[]): DynamicModule {
        logger.info(`Registering entities for ${database}...`);
        return {
            module: DatabaseModule,
            imports: [
                TypeOrmModule.forFeature(entities, database)
            ],
            exports: [TypeOrmModule]
        };
    }
}