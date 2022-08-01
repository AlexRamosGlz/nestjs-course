import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task_model/task_model';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Post()
  createTask(
    @Body() body,
    @Body('title') title: string,
    @Body('description') description: string,
  ): Task {
    console.log(title, description, body);
    return this.tasksService.createTasks(title, description);
  }
}
