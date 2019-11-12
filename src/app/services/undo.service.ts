import { Injectable } from '@angular/core';
import { Task } from '../model/task';
import { TasksService } from './tasks.service.firebase.store';

interface Instruction {
  command: string;
  task: Task;
}

@Injectable({
  providedIn: 'root'
})
export class UndoService {
  commands: Instruction[] = [];

  constructor(public taskService: TasksService) {}

  undo() {
    if (this.commands) {
      const instruction = this.commands.pop();

      switch (instruction.command) {
        case 'add':
          this.taskService.delete(instruction.task);
          break;
        case 'delete':
          this.taskService.addTask(instruction.task);
          break;
        default:
          this.taskService.undone(instruction.task);
          break;
      }
    }
  }
}
