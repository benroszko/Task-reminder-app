import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  toDoTasks: Task[] = [];
  doneTasks: Task[] = [];

  toDoObsTasks = new BehaviorSubject<Task[]>([]);
  doneObsTasks = new BehaviorSubject<Task[]>([]);

  addTask(newTask: Task) {
    this.toDoTasks.push(newTask);
    this.toDoObsTasks.next(this.toDoTasks);
  }

  delete(task: Task) {
    const index = this.toDoTasks.indexOf(task);
    this.toDoTasks[index].deletion = new Date();
    console.log(this.toDoTasks[index].deletion);
    this.toDoTasks.splice(index, 1);
    this.toDoObsTasks.next(this.toDoTasks);
  }

  done(task: Task) {
    this.doneTasks.push(task);
    this.delete(task);
    this.doneObsTasks.next(this.doneTasks);
  }

  getToDoObsTasks(): Observable<Task[]> {
    return this.toDoObsTasks.asObservable();
  }

  getDoneObsTasks(): Observable<Task[]> {
    return this.doneObsTasks.asObservable();
  }
}
