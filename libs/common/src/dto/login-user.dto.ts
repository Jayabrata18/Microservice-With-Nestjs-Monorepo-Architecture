/* eslint-disable prettier/prettier */

import { ApiProperty } from "@nestjs/swagger";
import {  IsEmail, IsString, Length } from "class-validator";

export class LoginUserDto {
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
}