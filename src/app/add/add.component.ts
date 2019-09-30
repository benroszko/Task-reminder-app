import { Component } from '@angular/core';
import { TasksService } from '../services/tasks.service';
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
    };

    this.taskService.addTask(newTask);
    this.task = '';
  }

}

{
  "id": 0,
  "name": "Mycie naczyn",
  "creation": ,
  "deletion": ,
  "isDone": "false"
}
