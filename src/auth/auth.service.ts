import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserDetails } from './utils/types/User';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './utils/entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>){}

    async validateUser(details:UserDetails) {
        const user = await this.userRepository.findOneBy({email:details.email})
        
        if(user) return user
        const newUser = this.userRepository.create(details)

        return this.userRepository.save(newUser)
    }
    
    async validateLogin(details){
        console.log(details)
        const user = await this.userRepository.findOneBy({email:details.email})
        
        if(!user){
            throw new NotFoundException('User not found')
        }
        
        const pass = await user.validatePassword(details.password)
        
        if(!pass){
            throw new UnauthorizedException('wrong password')
        }
        
        return user
    }
    
    async register(details){
        try{
            const user = await this.userRepository.findOneBy({email:details.email})

            if(user){
                throw new BadRequestException('user already exists')
            }
            const _user = this.userRepository.create(details)

        return _user
        }catch(e){
            throw new BadRequestException(e)
        }
    }

    async findUser(id:number){
        const user = await this.userRepository.findOneBy({id})

        return user
    }
}
