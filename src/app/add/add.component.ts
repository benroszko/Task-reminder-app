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
  MAX_TO_DO_TASKS_LENGTH = 18;
  task = '';
  toDoTasks: Task[];

  constructor(private taskService: TasksService, public undoService: UndoService) {
    this.taskService.getTasks().subscribe((tasks: Task[]) => {
      this.toDoTasks = tasks.filter(task => !task.isDone);
    });
  }

  async addTask() {
    this.task = this.task.trim();

    if (this.task === '') { return; }
    if (this.toDoTasks.length >= this.MAX_TO_DO_TASKS_LENGTH) {
      alert('You can\'t add another task.\nMaximum number of tasks is 18!');
      return;
    }

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

