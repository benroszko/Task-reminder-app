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

  constructor(private taskService: TasksService) {
    this.taskService.getDoneObsTasks().subscribe(
      tasks => this.doneTasks = tasks
    );
  }
}
