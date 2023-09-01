import { AfterContentInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-task',
  template: '{{ task }}',
  
})
export class TaskComponent implements OnChanges, AfterContentInit{
  @Input() task!: string;
  markedForRemoval: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Task changeg: ', this.task)
  }

  ngAfterContentInit(): void {
    console.log('Task content initialized:', this.task)
  }
}
