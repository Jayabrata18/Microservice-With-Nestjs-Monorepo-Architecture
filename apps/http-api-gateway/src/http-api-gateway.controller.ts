/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Inject, Post, Req } from '@nestjs/common';
import { HttpApiGatewayService } from './http-api-gateway.service';
import { ClientProxy } from '@nestjs/microservices';
import logger from '@app/common/log/logger';
import { Request } from 'express';
import moment from 'moment-timezone';
import { LoginUserDto } from '@app/common/dto/login-user.dto';
import { CreateUserDto } from '@app/common/dto/create-user.dto';


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
  @Post('/signup')
  createUser(@Body() createUserDto: CreateUserDto) {
    console.log('api-gatweway', createUserDto);
    logger.info(
      'createUser method called with data: ' + JSON.stringify(createUserDto), {
      meta: {
        type: 'createUser',
        data: JSON.stringify(createUserDto),
        timestamp: new Date().toISOString(),
      }
    }
    );
    return this.natsClient.send({ cmd: 'create_user' }, createUserDto);
  }
  //login-user
  @Post('/login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    console.log('api-gatweway', loginUserDto);
    logger.info(
      'loginUser method called with data: ' + JSON.stringify(loginUserDto), {
      meta: {
        type: 'loginUser',
        data: JSON.stringify(loginUserDto),
        timestamp: new Date().toISOString(),
      }
    }
    );
    return this.natsClient.send({ cmd: 'login_user' }, loginUserDto);
  }
}