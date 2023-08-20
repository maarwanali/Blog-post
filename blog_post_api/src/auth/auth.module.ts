import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt/dist';
import { adminStrategy, atStrategy, rtStrategy } from './strategy';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, rtStrategy, atStrategy, adminStrategy],
})
export class AuthModule {}
