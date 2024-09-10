/* eslint-disable prettier/prettier */
import { Controller } from '@nestjs/common';
import { App2Service } from './app2.service';
import {  MessagePattern } from '@nestjs/microservices';

@Controller()
export class App2Controller {
  constructor(private readonly app2Service: App2Service,) {
    
  }

  @MessagePattern({ cmd: 'health-app2' })
  async healthCheck(): Promise<{ application: unknown; system: unknown; timeStamp: number }> {
    const healthData = this.app2Service.healthCheck();
    return healthData;
  }


}
