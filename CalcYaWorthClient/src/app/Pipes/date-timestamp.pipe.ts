import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTimestamp'
})
export class DateTimestampPipe implements PipeTransform {

  transform(milliseconds: number): any {
    const date = new Date(milliseconds);
    return date.toLocaleString();
  }

}
