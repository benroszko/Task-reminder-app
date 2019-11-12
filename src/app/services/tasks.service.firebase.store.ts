import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { Task } from '../model/task';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

function mapToTask(action) {
  const doc = action.payload.doc;
  const data = doc.data() as Task;
  data.id = doc.id;
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
    this.allTasks.add(newTask).then(() => console.log('Added new task!'));
  }

  delete(task: Task) {
    const taskToDelete = this.angularFireStore.doc(`Tasks/${task.id}`);
    taskToDelete.delete().then(() => console.log('Deleted a task!'));
  }

  done(task: Task) {
    const taskToUpdate = this.angularFireStore.doc(`Tasks/${task.id}`);
    taskToUpdate.update({
      isDone: true,
      doneDate: new Date(),
    }).then(() => console.log('done'));
  }

  getTasks(): Observable<Task[]> {
    return this.allTasks.snapshotChanges().pipe(
      map(actions => {
        return actions.map(mapToTask);
    }));
  }
}
