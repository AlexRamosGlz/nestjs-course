import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  //provider: Array of Providers to be availabe within the module via dependency injection
  //controllers: Array of controllers to be instansianted whithin the module
          //Responsible for handling incoming requests and returning resposnses tot eh client

  imports: [TasksModule, 
    //Setting up the database conection with typeOrm 
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'task-managment',
    autoLoadEntities: true,
    synchronize: true,
  })],
})
export class AppModule {}
