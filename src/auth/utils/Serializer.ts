import { Inject, Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { User } from "./entities/User";

@Injectable()
export class Serializer extends PassportSerializer{
    constructor(@Inject('AUTH_SERVICE') private readonly authService:AuthService){
        super()
    }

    serializeUser(user: User, done: Function) {
        console.log('Serializer')
        console.log(user)
        done(null,user)
    }

    async deserializeUser(payload: any, done: Function) {
        const user = await this.authService.findUser(payload.id)
        console.log('Deserializer')
        console.log(user)
        return user ? done(null, user) : done(null,null)
    }
}