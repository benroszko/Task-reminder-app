import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  constructor(private afs: AngularFirestore) {
    this.getAllTasks();
  }

  getAllTasks() {
    this.allTasks = this.afs.collection<Task>('/Tasks') as AngularFirestoreCollection<Task>;
  }

  async addTask(newTask: Task) {
    const docRef = await this.allTasks.add(newTask);
    console.log('Added new task!');

    return docRef.id;
  }

  delete(task: Task) {
    const taskToDelete = this.afs.doc(`Tasks/${task.id}`);
    taskToDelete.delete().then(() => console.log('Deleted a task!'));
  }

  done(task: Task) {
    const taskToUpdate = this.afs.doc(`Tasks/${task.id}`);
    taskToUpdate.update({
      isDone: true,
      doneDate: new Date(),
    }).then(() => console.log('done'));
  }

  undone(task: Task) {
    const taskToUpdate = this.afs.doc(`Tasks/${task.id}`);
    console.log(taskToUpdate);
    taskToUpdate.update({
      isDone: false,
      doneDate: null,
    }).then(() => console.log('undone'));
  }

  getTasks(): Observable<Task[]> {
    return this.allTasks.snapshotChanges().pipe(
      map(actions => {
        return actions.map(mapToTask);
    }));
  }
}
