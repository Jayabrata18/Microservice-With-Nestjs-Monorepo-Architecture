/* eslint-disable prettier/prettier */
import { Controller, Get, Inject, Req } from '@nestjs/common';
import { HttpApiGatewayService } from './http-api-gateway.service';
import { ClientProxy } from '@nestjs/microservices';
import logger from '@app/common/log/logger';
import { Request } from 'express';
import moment from 'moment-timezone';


const timestamp = Date.now()

@Controller({ path: 'system', version: '1' })
export class HttpApiGatewayController {
  constructor(private readonly httpApiGatewayService: HttpApiGatewayService, @Inject('NATS_SERVICE') private natsClient: ClientProxy) { }

  @Get('helloworld')
  getHello(): string {
    logger.info('Received request for helloworld');
    return this.httpApiGatewayService.getHello();
  }
  @Get('health')
  getHealth(@Req() request: Request): { application: unknown; system: unknown; timeStamp: number } {
    logger.info('Received request for health check', {
      meta: {
        ipAddress: request.ip,
        method: request.method,
        url: request.originalUrl,
        timestamp: moment(timestamp).tz('Asia/Kolkata').format('DD-MM-YYYY HH:mm:ss'),


        userAgent: request.headers['user-agent']
      }
    });
    const healthData = this.httpApiGatewayService.healthCheck();
    return healthData;
  }
  @Get('health-app2')
  getHealthApp2(@Req() request: Request): any {
    logger.info('Received request for health check from app2', {
      meta: {
        ipAddress: request.ip,
        method: request.method,
        url: request.originalUrl,
        timestamp: moment(timestamp).tz('Asia/Kolkata').format('DD-MM-YYYY HH:mm:ss'),


        userAgent: request.headers['user-agent']
      }
    });
    return this.natsClient.send({ cmd: 'health-app2' }, {});
  }

}