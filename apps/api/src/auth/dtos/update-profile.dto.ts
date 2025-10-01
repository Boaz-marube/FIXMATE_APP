import { IsOptional, IsString, IsEmail, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiProperty({ example: 'John Doe', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 'user@example.com', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: '+254712345678', required: false })
  @IsOptional()
  @IsString()
  @Matches(/^\+254[0-9]{9}$/, { message: 'Phone number must be in format +254XXXXXXXXX' })
  phoneNumber?: string;

  @ApiProperty({ example: 'Nairobi, Kenya', required: false })
  @IsOptional()
  @IsString()
  address?: string;
}