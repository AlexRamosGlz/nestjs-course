import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
@Module({
  //provider: Array of Providers to be availabe within the module via dependency injection
  //controllers: Array of controllers to be instansianted whithin the module
          //Responsible for handling incoming requests and returning resposnses tot eh client

  imports: [TasksModule],
})
export class AppModule {}
