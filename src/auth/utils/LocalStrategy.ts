import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(@Inject('AUTH_SERVICE') private authService:AuthService){
        super()
    }

    async validate(email:string,password:string,displayName:string){
        console.log(email)
        const user = await this.authService.validateLogin({email,password,displayName})
        if(!user){
            throw new UnauthorizedException()
        }

        return user
    }
}