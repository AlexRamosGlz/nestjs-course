import { TaskStatus } from '../task_model/task_model';

export class FilterTaskDto {
  //the "?" is added since we are not sure which of this properties will get filled by the Query call
  status?: TaskStatus;
  search?: string;
}