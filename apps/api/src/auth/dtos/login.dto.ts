import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDTO{
    @ApiProperty({ 
        example: 'user@example.com', description: 'User email address',
        format: 'email'
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ 
        example: 'strongPassword123!', description: 'User password',
        format: 'password'
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}