import { Controller, Get, Post, Body, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task';
import * as uuid from 'uuid/v1';

@Controller('tasks')
export class TasksController {
  constructor(private tasks: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasks.getAllTasks();
  }

  @Post()
  postTask(
    @Body('title') title: string,
    @Body('description') description: string,
  ): Task {
    return this.putTask(uuid(), title, description);
  }

  @Put()
  putTask(
    @Body('id') id: string,
    @Body('title') title: string,
    @Body('description') description: string,
  ): Task {
    return this.tasks.createTask(id, title, description);
  }
}
