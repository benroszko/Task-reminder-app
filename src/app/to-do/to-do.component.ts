import { Component } from '@angular/core';
import { TasksService } from '../services/tasks.service.firebase.store';
import { Task } from '../model/task';
import { UndoService } from '../services/undo.service';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent {
  toDoTasks: Task[] = [];

  constructor(private taskService: TasksService, public undoService: UndoService) {
    this.taskService.getTasks().subscribe((tasks: Task[]) => {
        this.toDoTasks = tasks.filter(task => !task.isDone);
    });
  }

  delete(task: Task) {
    this.taskService.delete(task);

    this.undoService.commands.push({
      command: 'delete',
      task,
    });
  }

  done(task: Task) {
    this.taskService.done(task);

    this.undoService.commands.push({
      command: 'done',
      task,
    });
  }

  getColor(): string {
    return this.toDoTasks.length > 5 ? 'red' : 'black';
  }
}
