import { Injectable } from '@nestjs/common';
import { Task } from './task_model/task_model';

@Injectable()
export class TasksService {
  //since the task model is Type Task, we can add more type safety by adding the type to the method and the field
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;  
  }
}
