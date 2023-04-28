import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'extractId'
})
export class ExtractIdPipe implements PipeTransform {

  transform(url: string): number {
    const matches: RegExpMatchArray | null = url.match(/\/(\d+)$/);
    return matches ? parseInt(matches[1], 10) : 0;
  }

}
