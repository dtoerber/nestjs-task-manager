import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid/v1';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskFilterDTO } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasks: TasksService) {}

  @Get()
  getTasks(@Query() filterDTO: GetTaskFilterDTO): Task[] {
    if (Object.keys(filterDTO).length) {
      return this.tasks.getTasksByFitler(filterDTO);
    } else {
      return this.tasks.getAllTasks();
    }
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
