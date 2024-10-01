import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(@InjectRepository(Todo) private todoRepo: Repository<Todo>){}
  async create(createTodoDto: CreateTodoDto) {
    try{
      const todo = this.todoRepo.create(createTodoDto)
      await this.todoRepo.save(todo)
      return todo
    }catch(err){
      throw new HttpException('BAD_REQUEST',HttpStatus.BAD_REQUEST, {cause:err})
    }
  }

  findAll() {
    try{
      const todos = this.todoRepo.find({})
      return todos
    }catch(err){
      throw new HttpException('BAD_REQUEST',HttpStatus.BAD_REQUEST, {cause:err})
    }
  }

  findOne(id: number) {
    try{
      const todo = this.todoRepo.findOneBy({id})
      return todo
    }catch(err){
      throw new HttpException('BAD_REQUEST',HttpStatus.BAD_REQUEST, {cause:err})
    }
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    try{
      const todo = await this.todoRepo.update(id,updateTodoDto)

      return todo
    }catch(err){
      throw new HttpException('BAD_REQUEST',HttpStatus.BAD_REQUEST, {cause:err})
    }
  }

  remove(id: number) {
    try{
      const todo = this.todoRepo.delete({id})
      return todo
    }catch(err){
      throw new HttpException('BAD_REQUEST',HttpStatus.BAD_REQUEST, {cause:err})
    }
  }
}
