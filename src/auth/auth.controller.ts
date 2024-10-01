import { BadRequestException, Body, Controller, Get, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { GoogleGuard } from './utils/oauth.guard';
import { LocalGuard } from './utils/local.guard';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(@Inject('AUTH_SERVICE') private authService:AuthService){}

  @Get('google/login')
  @UseGuards(GoogleGuard)
  HandleLogin() {}

  @Get('google/redirect')
  @UseGuards(GoogleGuard)
  HandleRedirect() {}

  @UseGuards(LocalGuard)
  @Post('login')
  HandleNormalLogin(@Req() req:Request){
    return req.user
  }

  @Post('register')
  async HandleRegister(@Body() details, @Req() req:Request){
    const user = await this.authService.register(details)
    console.log(user)

    req.login(user, (err) => {
      console.log(err)
      throw new BadRequestException(err)
    })

    return user
  }

  @Get('status')
  Status(@Req() request:Request){
    console.log(request.user)

    if(request.user){
      return {msg:"Authenticated"}
    }else{
      
      return {msg:"Not Authenticated"}
    }
  }
}
