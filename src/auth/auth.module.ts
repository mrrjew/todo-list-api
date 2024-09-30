import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './utils/GoogleStrategy';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './utils/entities/User';
import { Serializer } from './utils/Serializer';
import { LocalStrategy } from './utils/LocalStrategy';

@Module({
  imports: [ConfigModule,TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [{
    provide:'AUTH_SERVICE',
    useClass:AuthService
  }, GoogleStrategy,LocalStrategy,Serializer],
})
export class AuthModule {}
