/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { App2Controller } from './app2.controller';
import { App2Service } from './app2.service';
import { Database, DatabaseModule, NatsClientModule } from '@app/common';

@Module({
  imports: [NatsClientModule, 
    DatabaseModule.register(Database.PRIMARY),
    DatabaseModule.forEntity(Database.PRIMARY, [UserEntity]),
],
  controllers: [App2Controller],
  providers: [App2Service],
})
export class App2Module {}
