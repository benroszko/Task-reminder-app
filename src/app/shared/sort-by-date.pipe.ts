import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../model/task';


@Pipe({
  name: 'sortByDate'
})
export class SortByDatePipe implements PipeTransform {

  transform(value: Task[], ...args: any[]): any {
    const byCreation = !Boolean(value[0].doneDate);
    console.log(args[0]);

    if (byCreation) {
      return value.sort((a, b) => {
        return a.creationDate > b.creationDate ? 1 : -1;
      });
    } else {
      const resArr = value.sort((a, b) => {
        return a.doneDate > b.doneDate ? 1 : -1;
      });

      return resArr.length <= args[0] ? resArr : resArr.slice(resArr.length - args[0]);
    }
  }

}
