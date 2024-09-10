/* eslint-disable prettier/prettier */
import {
    Controller,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import {  MessagePattern, Payload } from '@nestjs/microservices';
import { LoginUserDto } from '@app/common/dto/login-user.dto';
import { CreateUserDto } from '@app/common/dto/create-user.dto';
import { UsersMicroserviceService } from './userMicroservice.service';
import logger from '@app/common/log/logger';

@Controller()
export class UsersMicroserviceController {

    constructor(
        private userService: UsersMicroserviceService,
    ) { }
    //create user
    @MessagePattern({ cmd: 'create_user' })
    async createUser(@Payload() data: CreateUserDto) {
        logger.info('Received create user request');
        logger.debug(`Payload: ${JSON.stringify(data)}`);

        try {
            const user = await this.userService.createUser(data);
            logger.info(`User created successfully with userId: ${user.id}`);
            return { message: 'User created successfully', user };
        } catch (error) {
            logger.error('Error creating user', error.stack);
            throw error;
        }
    }
    //login user
    @MessagePattern({ cmd: 'login_user' })
    async loginUser(@Payload() data: LoginUserDto){
        logger.info('Received login user request');
        logger.debug(`Payload: ${JSON.stringify(data)}`);
        try {
            const user = await this.userService.loginUser(data);
            logger.info(`User login successfully with userId: ${user.id}`);
            return { message: 'User login successfully', user };
        } catch (error) {
            if (
                error instanceof NotFoundException ||
                error instanceof UnauthorizedException
            ) {
                throw error;
            } else {
                logger.error('Error login user', error.stack);
                throw error;
            }
        }
    }
}