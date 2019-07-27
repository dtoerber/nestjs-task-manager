import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid/v1';
import { CreateTaskDTO } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasks: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasks.getAllTasks();
  }

  @Get(':id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasks.getTaskById(id);
  }

  @Post()
  postTask(
    @Body('title') title: string,
    @Body('description') description: string,
  ): Task {
    const dto: CreateTaskDTO = {
      id: uuid(),
      title,
      description,
    };
    return this.putTask(dto);
  }

  @Put()
  putTask(@Body() createTaskDTO: CreateTaskDTO): Task {
    return this.tasks.createTask(createTaskDTO);
  }

  @Delete(':id')
  deleteTask(@Body('id') id): void {
    this.tasks.deleteTaskById(id);
  }

  @Patch(':id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task {
    return this.tasks.updateTaskStatusById(id, status);
  }
}
