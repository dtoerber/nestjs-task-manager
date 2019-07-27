import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(id: string, title: string, description: string): Task {
    const newTask: Task = {
      id,
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(newTask);

    return newTask;
  }
}
