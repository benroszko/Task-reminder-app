import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { Task } from '../model/task';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

function mapToTask(action) {
  const data = action.payload.doc.data() as Task;
  data.id = action.payload.doc.id;
  return data;
}
@Injectable({
  providedIn: 'root'
})
export class TasksService {

  allTasks: AngularFirestoreCollection<Task>;

  constructor(private angularFireStore: AngularFirestore) {
    this.getAllTasks();
  }

  getAllTasks() {
    this.allTasks = this.angularFireStore.collection<Task>('/Tasks') as AngularFirestoreCollection<Task>;
  }

  addTask(newTask: Task) {
    this.allTasks.add(newTask).then(() =>
      console.log('added')
    );
  }

  delete(task: Task) {
  }

  done(task: Task) {
  }

  getToDoObsTasks(): Observable<Task[]> {
    return this.allTasks.snapshotChanges().pipe( map((actions) => {
      return actions.map(mapToTask).filter(value => !value.done);
    }));
  }

  getDoneObsTasks(): Observable<Task[]> {
    return this.allTasks.snapshotChanges().pipe( map((actions) => {
      return actions.map(mapToTask).filter(value => value.done);
    }));  }
}
