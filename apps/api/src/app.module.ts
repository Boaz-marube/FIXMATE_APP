import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true,
      cache: true,
      load: [config] }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config) => ({
        secret: config.get('jwt.secret') || 'fallback-secret-key',
      }),
      global: true,
      inject: [ConfigService],
    }),
    AuthModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config) => ({
        uri: config.get('database.connectionString') || 'mongodb://localhost:27017/fixmate',
      }),
      inject: [ConfigService],
    }),
    // UserModule,
    // PrismaModule,
    // 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
