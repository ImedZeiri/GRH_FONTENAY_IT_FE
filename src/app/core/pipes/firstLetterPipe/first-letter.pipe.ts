import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstLetter'
})
export class FirstLetterPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return value[1].toUpperCase();
  }

}
