import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Subscription } from 'rxjs';
import { TaskService } from '../task.service';
import { TaskComponent } from '../task/task.component';
import { TaskComponentInterface } from '../task/task.component.interface';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, OnDestroy {

  tasks: string[] = [];
  newTask: string = '';
  private subscription!: Subscription;

  @ViewChildren(TaskComponent) taskComponents!: QueryList<TaskComponent>;

  constructor(private taskService: TaskService ){}

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
    this.subscription = this.taskService.taskAdded.subscribe(task => {
      this.tasks.push(task)
    })
  }

  ngAfterViewInit(): void {
    // Now you can access taskComponents safely here after they have been initialized
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  addTask(){
    if(this.newTask){
      this.taskService.addTask(this.newTask);
      this.newTask = '';
    }
  }

  removeMarkedTasks() {
    this.tasks = this.tasks.filter((task) => {
      const taskComponent = this.getTaskComponent(task);
      if (taskComponent) {
        return !taskComponent.markedForRemoval;
      }
      return true;
    });
  }

  getTaskComponent(task: string): TaskComponentInterface | undefined {
    const taskComponent = this.taskComponents.find((component) => component.task === task);
    return taskComponent;
  }

}
