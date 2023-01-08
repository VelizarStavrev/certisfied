import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timestampToDate'
})
export class TimestampToDatePipe implements PipeTransform {
  addZeroForTwoDigits(dateData: number | string): number | string {
    return dateData < 10 ? '0' + dateData : dateData;
  }

  transform(value: number): string {
    const dateInitial: Date = new Date(value * 1000);
    const date: string = this.addZeroForTwoDigits(dateInitial.getDate()) + '/' + this.addZeroForTwoDigits(dateInitial.getMonth() + 1) + '/' + this.addZeroForTwoDigits(dateInitial.getFullYear());
    const time: string = this.addZeroForTwoDigits(dateInitial.getHours()) + ':' + this.addZeroForTwoDigits(dateInitial.getMinutes());
    const dateFinal: string = date + ' - ' + time;
    return dateFinal;
  }

}
