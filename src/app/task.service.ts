import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: string[] = [];
  taskAdded = new BehaviorSubject<string>('');
  
  constructor() { }

  getTasks() {
    return this.tasks.slice();
  }

  addTask(task: string){
    this.tasks.push(task);
    this.taskAdded.next(task);
  }

}
