import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task_model/task_model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TasksService {
  //since the task model is Type Task, we can add more type safety by adding the type to the method and the field
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTasks(title: string, description: string): Task {
    console.log(title, description);
    const task: Task = {
      id: uuid(),
      title: title,
      description: description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }
}
