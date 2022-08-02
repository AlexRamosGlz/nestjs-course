import { Injectable } from '@nestjs/common';
import { TaskStatus } from './task_model/task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { filter, retry, throwError } from 'rxjs';
import { TaskRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  //Replacing the old storage with database storage
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository){}

  //since we are using async function, the return type will be a promise therefore we need to declared the type promise as the returned value 
  async getTaskById(id: string): Promise<Task>{
    const found = await this.taskRepository.findOne(id)

    if(!found)
      throw new Error();

    return found; 
  }

  // //since the task model is Type Task, we can add more type safety by adding the type to the method and the field
  // private tasks: Task[] = [];

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  // filterTasks(filterTaskDto: FilterTaskDto): Task[] {
  //   console.log(filterTaskDto);
  //   if (Object.keys(filterTaskDto).length === 0) return this.getAllTasks();

  //   if (filterTaskDto.status)
  //     return this.tasks.filter((task) => task.status === filterTaskDto.status);

  //   if (filterTaskDto.search)
  //     return this.tasks.filter((task) => {
  //       if (
  //         task.title.includes(filterTaskDto.search) ||
  //         task.description.includes(filterTaskDto.search)
  //       )
  //         return task;
  //     });
  // }

  // getTaskById(id: string): Task {
  //   const found = this.tasks.find((task) => task.id === id);

  //   if (!found) throw new Error();

  //   return found;
  // }

  // deleteTaskById(id: string): void {
  //   const found = this.tasks.find((task) => task.id === id);

  //   if (!found) throw new Error();

  //   this.tasks = this.tasks.filter((task) => task.id !== id);
  // }

  // updateTaskById(id: string, status: TaskStatus): void {
  //   const task = this.getTaskById(id);
  //   console.log(task);
  //   task.status = status;
  // }

  // createTasks(createTaskDto: CreateTaskDto): Task {
  //   const task: Task = {
  //     id: uuid(),
  //     title: createTaskDto.title,
  //     description: createTaskDto.description,
  //     status: TaskStatus.OPEN,
  //   };

  //   this.tasks.push(task);

  //   return task;
  // }
}
