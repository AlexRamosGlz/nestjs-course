import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task_model/task_model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { filter, retry } from 'rxjs';

@Injectable()
export class TasksService {
  //since the task model is Type Task, we can add more type safety by adding the type to the method and the field
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  filterTasks(filterTaskDto: FilterTaskDto): Task[] {
    console.log(filterTaskDto);
    if (Object.keys(filterTaskDto).length === 0) return this.getAllTasks();

    if (filterTaskDto.status)
      return this.tasks.filter((task) => task.status === filterTaskDto.status);

    if (filterTaskDto.search)
      return this.tasks.filter((task) => {
        if (
          task.title.includes(filterTaskDto.search) ||
          task.description.includes(filterTaskDto.search)
        )
          return task;
      });
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  deleteTaskById(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  updateTaskById(id: string, status: TaskStatus): void {
    const task = this.getTaskById(id);
    console.log(task);
    task.status = status;
  }

  createTasks(createTaskDto: CreateTaskDto): Task {
    const task: Task = {
      id: uuid(),
      title: createTaskDto.title,
      description: createTaskDto.description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }
}
