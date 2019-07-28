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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid/v1';
import { CreateTaskPutDTO } from './dto/create-task.put.dto';
import { CreateTaskPostDTO } from './dto/create-task.post.dto';
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
  @UsePipes(ValidationPipe)
  postTask(@Body() dto: CreateTaskPostDTO): Task {
    return this.putTask({ ...dto, id: uuid() });
  }

  @Put()
  @UsePipes(ValidationPipe)
  putTask(@Body() createTaskDTO: CreateTaskPutDTO): Task {
    return this.tasks.createTask(createTaskDTO);
  }

  @Delete(':id')
  deleteTask(@Param('id') id): void {
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
