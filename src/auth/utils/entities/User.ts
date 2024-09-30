import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from "bcrypt"

@Entity({name:"users"})
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    displayName: string

    @Column({nullable:true})
    password: string

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(){
        if(this.password){
            this.password = await bcrypt.hash(this.password,10)
        }
    }

    async validatePassword(pass:string): Promise<boolean> {
        const _pass = await bcrypt.compare(pass, this.password)

        return _pass
    }
}