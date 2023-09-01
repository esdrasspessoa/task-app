import { AfterContentInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TaskComponentInterface } from './task.component.interface';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  
})
export class TaskComponent implements OnChanges, AfterContentInit, TaskComponentInterface{
  @Input() task!: string;
  markedForRemoval: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Task changeg: ', this.task)
  }

  ngAfterContentInit(): void {
    console.log('Task content initialized:', this.task)
  }
}
