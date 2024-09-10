/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { HttpApiGatewayController } from './http-api-gateway.controller';
import { HttpApiGatewayService } from './http-api-gateway.service';
import { NatsClientModule } from '@app/common';
import { UsersModule } from './user/user.module';

@Module({
  imports: [NatsClientModule, UsersModule],
  controllers: [HttpApiGatewayController, ],
  providers: [HttpApiGatewayService],
})
export class HttpApiGatewayModule {}
