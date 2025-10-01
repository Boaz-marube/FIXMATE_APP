import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MinLength,
    IsOptional,
    Matches,
  } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CustomerSignupDto {
    @ApiProperty({ 
        example: 'John Doe', 
        description: 'Customer full name' 
    })
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @ApiProperty({ 
        example: 'customer@example.com', 
        description: 'Customer email address',
        format: 'email'
    })
    @IsEmail({}, { message: 'Please provide a valid email' })
    @IsNotEmpty()
    email: string;
  
    @ApiProperty({ 
        example: 'strongPassword123!', 
        description: 'Password with at least 8 characters, including uppercase, lowercase, number, and special character',
        format: 'password',
        minLength: 8
    })
    @IsNotEmpty()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    })
    password: string;
  
    @ApiProperty({ 
        example: '+254712345678', 
        description: 'Customer phone number' 
    })
    @IsNotEmpty()
    @IsString()
    @Matches(/^\+254[0-9]{9}$/, { message: 'Phone number must be in format +254XXXXXXXXX' })
    phoneNumber: string;
  
    @ApiProperty({ 
        example: 'Westlands, Nairobi', 
        description: 'Customer address (optional)',
        required: false 
    })
    @IsOptional()
    @IsString()
    address?: string;
}