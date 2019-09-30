import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'modify'
})
export class ModifyPipe implements PipeTransform {

  transform(value: string, ...args: string[]): any {
    return value.charAt(0).toUpperCase() + value.substr(1) + args;
  }

}
