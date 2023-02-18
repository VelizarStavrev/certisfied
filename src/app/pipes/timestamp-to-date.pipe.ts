import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timestampToDate'
})
export class TimestampToDatePipe implements PipeTransform {
  private addZeroForTwoDigits(value: number): number | string {
    return value < 10 ? '0' + value : value;
  }

  transform(timestamp: number): string {
    const dateInitial: Date = new Date(timestamp * 1000);
    
    const day = this.addZeroForTwoDigits(dateInitial.getDate());
    const month = this.addZeroForTwoDigits(dateInitial.getMonth() + 1);
    const year = this.addZeroForTwoDigits(dateInitial.getFullYear());
    const date: string = day + '/' + month + '/' + year;
    
    const hours = this.addZeroForTwoDigits(dateInitial.getHours());
    const minutes = this.addZeroForTwoDigits(dateInitial.getMinutes());
    const time: string = hours + ':' + minutes;
    
    const dateFinal: string = date + ' - ' + time;
    return dateFinal;
  }

}
