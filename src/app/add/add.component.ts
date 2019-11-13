import { Component } from '@angular/core';
import { TasksService } from '../services/tasks.service.firebase.store';
import { Task } from '../model/task';
import { UndoService } from '../services/undo.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  maxToDoSize: number;
  task = '';
  toDoTasks: Task[];

  constructor(private taskService: TasksService, public undoService: UndoService) {
    this.taskService.getTasks().subscribe((tasks: Task[]) => {
      this.toDoTasks = tasks.filter(task => !task.isDone);
    });
  }

  private setMaxToDoLen() {
    const width = window.innerWidth;
    if (width >= 521) {
      this.maxToDoSize = 18;
    } else if (width >= 396) {
      this.maxToDoSize = 10;
    } else if (width >= 341) {
      this.maxToDoSize = 8;
    } else if (width >= 0) {
      this.maxToDoSize = 7;
    }
  }

  async addTask() {
    this.task = this.task.trim();

    this.setMaxToDoLen();

    if (this.task === '') { return; }
    if (this.toDoTasks.length >= this.maxToDoSize) {
      alert(`You can\'t add another task.\nMaximum number of tasks is ${this.maxToDoSize}!`);
      return;
    }

    console.log(window.innerWidth, this.maxToDoSize);
    const newTask: Task = {
      name: this.task,
      creationDate: new Date(),
      isDone: false,
    };

    this.task = '';

    const taskID = await this.taskService.addTask(newTask);
    newTask.id = taskID;

    this.undoService.commands.push({
      command: 'add',
      task: newTask,
    });
  }

}

