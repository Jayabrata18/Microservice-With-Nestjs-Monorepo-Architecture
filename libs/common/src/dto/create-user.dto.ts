/* eslint-disable prettier/prettier */

import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEmail, IsOptional, IsString, Length } from "class-validator";

export class CreateUserDto {
    @ApiProperty({
        description: 'The name of the user',
        example: 'John Doe',
    })
    @IsString()
    @Length(1, 255)
    name: string;

    @ApiProperty({
        description: 'The email of the user',
        example: 'johndoe@example.com',
    })
    @IsEmail()
    @Length(1, 255)
    email: string;

    @ApiProperty({
        description: 'The password for the user account',
        example: 'StrongPassword123!',
    })
    @IsString()
    @Length(6, 255)
    password: string;

    @ApiProperty({
        description: 'The user ID, automatically generated if not provided',
        example: 'abc123xyz',
        required: false,
    })
    @IsString()
    @IsOptional()
    userId?: string;

    @ApiProperty({
        description: 'The avatar URL for the user',
        example: 'https://example.com/avatar.jpg',
        required: false,
    })
    @IsString()
    @IsOptional()
    avatar?: string;

    @ApiProperty({
        description: 'The API key for the user, default value is provided',
        example: 'asdf-qwer-zxcv-mnbv',
    })
    @IsString()
    @Length(16, 16)
    @IsOptional()
    apikey?: string;

    @ApiProperty({
        description: 'The phone number of the user',
        example: '+1234567890',
        required: false,
    })
    @IsOptional()
    phoneNumber?: string;

    @ApiProperty({
        description: 'The role of the user, default is "user"',
        example: 'admin',
    })
    @IsString()
    @IsOptional()
    role?: string;

    @ApiProperty({
        description: 'Indicates whether the user is active, default is true',
        example: true,
    })
    @IsOptional()
    isActive?: boolean;

    @ApiProperty({
        description: 'The date of birth of the user',
        example: '1990-01-01',
        required: false,
    })
    @IsDate()
    @IsOptional()
    dateOfBirth?: Date;

    @ApiProperty({
        description: 'The address of the user',
        example: '1234 Elm Street',
        required: false,
    })
    @IsString()
    @IsOptional()
    address?: string;
}
