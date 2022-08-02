import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
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
    try {
      const task = this.tasksService.getTaskById(id);

      return task;
    } catch (err) {
      throw new NotFoundException('Task with id: ' + id + ' not found');
    }
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): void {
    try {
      this.tasksService.deleteTaskById(id);
    } catch (err) {
      throw new NotFoundException(
        'Task with id: ' + id + " not found, deletion couldn't be completed",
      );
    }
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): void {
    try {
      this.tasksService.updateTaskById(id, status);
    } catch (err) {
      throw new NotFoundException(
        'Task with id: ' + id + " not found, patch couldn't be completed",
      );
    }
  }

  @Get()
  filterTasks(@Query() filterData: FilterTaskDto): Task[] {
    console.log(filterData);
    if (Object.keys(filterData).length != 0)
      return this.tasksService.filterTasks(filterData);

    return this.tasksService.getAllTasks();
  }
}
