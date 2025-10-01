import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MinLength,
    IsDateString,
    IsOptional,
    Matches,
    IsArray,
    IsNumber,
    Min,
    Max,
  } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FixerSignupDto {
    @ApiProperty({ 
        example: 'John Smith', 
        description: 'Fixer full name' 
    })
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @ApiProperty({ 
        example: 'fixer@example.com', 
        description: 'Fixer email address',
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
        description: 'Fixer phone number' 
    })
    @IsNotEmpty()
    @IsString()
    @Matches(/^\+254[0-9]{9}$/, { message: 'Phone number must be in format +254XXXXXXXXX' })
    phoneNumber: string;

    @ApiProperty({ 
        example: ['plumbing', 'electrical', 'carpentry'], 
        description: 'Array of fixer skills/services',
        type: [String]
    })
    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty({ each: true })
    skills: string[];

    @ApiProperty({ 
        example: 5, 
        description: 'Years of experience in the field',
        minimum: 0,
        maximum: 50
    })
    @IsNumber()
    @Min(0, { message: 'Experience cannot be negative' })
    @Max(50, { message: 'Experience cannot exceed 50 years' })
    experienceYears: number;
  
    @ApiProperty({ 
        example: 'Kilimani, Nairobi', 
        description: 'Fixer service area/address' 
    })
    @IsNotEmpty()
    @IsString()
    serviceArea?: string;

    @ApiProperty({ 
        example: 'A123456789', 
        description: 'National ID number (optional)',
        required: false 
    })
    @IsOptional()
    @IsString()
    nationalId?: string;

    @ApiProperty({ 
        example: 'Certified electrician with 5+ years experience in residential and commercial projects.', 
        description: 'Brief description of services and experience (optional)',
        required: false 
    })
    @IsOptional()
    @IsString()
    @MinLength(10, { message: 'Description must be at least 10 characters long' })
    description?: string;
}