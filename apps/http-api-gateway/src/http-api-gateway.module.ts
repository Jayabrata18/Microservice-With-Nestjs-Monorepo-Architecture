import { Module } from '@nestjs/common';
import { HttpApiGatewayController } from './http-api-gateway.controller';
import { HttpApiGatewayService } from './http-api-gateway.service';
import { NatsClientModule } from '@app/common';

@Module({
  imports: [NatsClientModule],
  controllers: [HttpApiGatewayController],
  providers: [HttpApiGatewayService],
})
export class HttpApiGatewayModule {}
