import { Component, Input } from '@angular/core';
import { TasksService } from '../services/tasks.service.firebase.store';
import { Task } from '../model/task';

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.css']
})
export class DoneComponent {
  doneTasks: Task[] = [];
  maxDoneSize: number;

  private setMaxDoneLen() {
    const width = window.innerWidth;
    if (width >= 521) {
      this.maxDoneSize = 15;
    } else if (width >= 341) {
      this.maxDoneSize = 12;
    } else if (width >= 0) {
      this.maxDoneSize = 9;
    }
  }

  constructor(private taskService: TasksService) {
    this.taskService.getTasks().subscribe((tasks: Task[]) => {
      this.doneTasks = tasks.filter(task => task.isDone);
      this.setMaxDoneLen();
      console.log(this.maxDoneSize);
  });
  }
}
