import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./schema/user.schema";
import { RefreshToken, RefreshTokenSchema } from "./schema/refresh-token.schema";
import { ResetToken, ResetTokenSchema } from "./schema/reset-token.schema";
import { MailService } from "src/services/mail.service";

@Module({
    imports: [MongooseModule.forFeature([
        {
        name: 'User',
        schema: UserSchema,
        },{
        name: RefreshToken.name,
        schema: RefreshTokenSchema,
        },{
        name: ResetToken.name,
        schema: ResetTokenSchema,
        }
])],
    controllers: [AuthController],
    providers: [AuthService, MailService],
    exports: [AuthService, MailService]
})
export class AuthModule{}