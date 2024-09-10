/* eslint-disable prettier/prettier */
import {
    ConflictException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '@app/common/dto/create-user.dto';
import { User } from '@app/common/Entity/user.entity';
import { Database } from '@app/common';
import { LoginUserDto } from '@app/common/dto/login-user.dto';
import logger from '@app/common/log/logger';
@Injectable()
export class UsersMicroserviceService {
    constructor(
        @InjectRepository(User, Database.PRIMARY) private userRepository: Repository<User>
    ) { }
   
    //signup
    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const { email } = createUserDto;
        // Check if the user with the given email already exists
        const existingUser = await this.userRepository.findOne({
            where: { email },
        });
        if (existingUser) {
            throw new ConflictException('User with the given email already exists');
        }
        // Create a new user
        const user = new User();
        user.name = createUserDto.name;
        user.email = createUserDto.email;
        user.password = createUserDto.password 
        // Save the user to the database
        try {
            await this.userRepository.save(user);
        } catch (error) {
            // throw new InternalServerErrorException('Failed to create user');
            logger.error('Failed to create user', {meta: {
                error: error.stack,
                createUserDto: createUserDto,
                user: {...user, password: '***' }, 
            }});
        }
        return user;

        
       
    }
    //login
    async loginUser(loginUserDto: LoginUserDto): Promise<User> {
        const { email, password } = loginUserDto;
        // Find user by email
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new NotFoundException('Email not found');
        }
        // Check if password matches
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            throw new UnauthorizedException('Password not match');
        }
        return user;
    }
}