/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { NatsClientModule } from '@app/common/nats-client/nats-client.module';
import { UsersMicroserviceController } from './userMicroservice.controller';
import { UsersMicroserviceService } from './userMicroservice.service';

@Module({
    imports: [NatsClientModule],
    controllers: [UsersMicroserviceController],
    providers: [UsersMicroserviceService],
})
export class UserMicroserviceModule { }