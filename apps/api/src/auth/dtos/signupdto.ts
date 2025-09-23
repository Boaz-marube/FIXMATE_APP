import { IsEmail, IsString, Matches, MinLength } from "class-validator";

export class SignupDTO{
    @IsString()
    name: string;

    @IsEmail({}, {message: 'Please provide a valid email'})
    email: string;

    @IsString()
    @MinLength(8, {message: 'Password must be at least 8 characters long'})
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    })
    password: string;
}