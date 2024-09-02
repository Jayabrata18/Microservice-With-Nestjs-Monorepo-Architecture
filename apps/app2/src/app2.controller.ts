/* eslint-disable prettier/prettier */
import { Controller,  Inject } from '@nestjs/common';
import { App2Service } from './app2.service';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';

@Controller()
export class App2Controller {
  constructor(private readonly app2Service: App2Service, @Inject('NATS_SERVICE') private  natsClient: ClientProxy,) {}

  @MessagePattern({ cmd: 'health-app2' })
  async healthCheck(): Promise<{ application: unknown; system: unknown; timeStamp: number }> {
    const healthData = this.app2Service.healthCheck();
    this.natsClient.emit('health-check-event', healthData);
    return healthData;
  }


}
