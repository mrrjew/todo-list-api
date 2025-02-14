import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, TypeOrmModule.forRoot({
    type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      autoLoadEntities:true,
      synchronize: true,

  }),PassportModule.register({session:true}), TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
