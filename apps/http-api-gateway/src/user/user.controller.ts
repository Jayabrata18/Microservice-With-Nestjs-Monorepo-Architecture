/* eslint-disable prettier/prettier */
import { CreateUserDto } from '@app/common/dto/create-user.dto';
import { LoginUserDto } from '@app/common/dto/login-user.dto';
import logger from '@app/common/log/logger';
import {
    Body,
    Controller,
    Inject,
    Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller({ path: 'user' })
export class UsersController {

    constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) { 
        logger.info('UsersController started');
    }
    //create-user
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