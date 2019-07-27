import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskFilterDTO } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksByFitler(filterDTO: GetTaskFilterDTO): Task[] {
    const { status, search } = filterDTO;

    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter(task => task.status === status);
    }

    if (search) {
      tasks = tasks.filter(task => {
        return task.title.includes(search) || task.description.includes(search);
      });
    }

    return tasks;
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

  updateTaskStatusById(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
