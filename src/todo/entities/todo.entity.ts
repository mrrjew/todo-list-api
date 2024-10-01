import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    title: string

    @Column()
    description: string

    @Column({default: new Date().toISOString()})
    createdAt: Date

    @Column({default: new Date().toISOString()})
    updatedAt: Date
}
