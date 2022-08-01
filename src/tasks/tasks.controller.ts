import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Console } from 'console';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task_model/task_model';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTasks(createTaskDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): void {
    return this.tasksService.deleteTaskById(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): void {
    console.log(id, status);
    return this.tasksService.updateTaskById(id, status);
  }

  @Get()
  filterTasks(@Query() filterData: FilterTaskDto): Task[] {
    console.log(filterData);
    if (Object.keys(filterData).length != 0)
      return this.tasksService.filterTasks(filterData);

    return this.tasksService.getAllTasks();
  }
}
