/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { App2Controller } from './app2.controller';
import { App2Service } from './app2.service';
import { Database, DatabaseModule, NatsClientModule } from '@app/common';
import { User } from '@app/common/Entity/user.entity';
import { UserMicroserviceModule } from './user/userMicroservice.module';

@Module({
  imports: [NatsClientModule, UserMicroserviceModule,
    DatabaseModule.register(Database.PRIMARY),
    DatabaseModule.forEntity(Database.PRIMARY, [User]),
  ],
  controllers: [App2Controller],
  providers: [App2Service
  ],
})
export class App2Module { }
