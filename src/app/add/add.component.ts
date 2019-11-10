import { Component } from '@angular/core';
import { TasksService } from '../services/tasks.service.firebase.store';
import { Task } from '../model/task';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {

  constructor(private taskService: TasksService) {}

  task = '';

  addTask() {
    this.task = this.task.trim();

    if (this.task === '') { return; }

    const newTask: Task = {
      name: this.task,
      creation: new Date(),
      done: false,
    };

    this.taskService.addTask(newTask);
    this.task = '';
  }

}

