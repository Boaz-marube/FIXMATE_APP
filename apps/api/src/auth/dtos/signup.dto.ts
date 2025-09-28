import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SignupDTO{
    @ApiProperty({ 
        example: 'John Doe', 
        description: 'User full name' })
    @IsString()
    name: string;

    @ApiProperty({ 
        example: 'user@example.com', description: 'User email address',
        format: 'email'
    })
    @IsEmail({}, {message: 'Please provide a valid email'})
    @IsNotEmpty()
    email: string;

    @ApiProperty({ 
        example: 'strongPassword123!', 
        description: 'Password with at least 8 characters, including uppercase, lowercase, number, and special character' ,
        format: 'password',
        minLength: 8
    })
    @IsString()
    @MinLength(8, {message: 'Password must be at least 8 characters long'})
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    })
    password: string;
}