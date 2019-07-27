import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDTO } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(dto: CreateTaskDTO): Task {
    const { id, title, description } = dto;
    const newTask: Task = {
      id,
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(newTask);

    return newTask;
  }

  getTaskById(id: string): Task {
    return this.tasks.find(task => task.id === id);
  }

  deleteTaskById(id: string): void {
    const idx = this.tasks.findIndex(task => task.id === id);
    this.tasks.splice(idx, 1);
  }
}
