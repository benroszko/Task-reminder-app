import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../model/task';


@Pipe({
  name: 'sortByDate'
})
export class SortByDatePipe implements PipeTransform {

  transform(value: Task[], ...args: any[]): any {
    const byCreation = !Boolean(value[0].doneDate);

    if (byCreation) {
      return value.sort((a, b) => {
        return a.creationDate > b.creationDate ? 1 : -1;
      });
    } else {
      return value.sort((a, b) => {
        return a.doneDate > b.doneDate ? 1 : -1;
      });
    }
  }

}
