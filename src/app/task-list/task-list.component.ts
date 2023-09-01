import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, OnDestroy {

  tasks: string[] = [];
  newTask: string = '';
  private subscription!: Subscription;

  constructor(private taskService: TaskService ){}

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
    this.subscription = this.taskService.taskAdded.subscribe(task => {
      this.tasks.push(task)
    })
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

  removeMarkedTasks(){
    this.tasks = this.tasks.filter((task, index) => {
      const taskComponent: any = document.querySelector(`app-task:nth-child(${index + 1})`);
      if(taskComponent){
        if(taskComponent.markedForRemoval){
          return false; // Remove
        }
      }
      return true;
    })
  }

}
