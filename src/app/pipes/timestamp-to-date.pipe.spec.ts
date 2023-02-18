import { TimestampToDatePipe } from './timestamp-to-date.pipe';

describe('TimestampToDatePipe', () => {
  let pipe: TimestampToDatePipe;

  beforeEach(() => {
    pipe = new TimestampToDatePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('#transform should receive a timestamp and return a date in the format dd/mm/yyyy - hh/mm', () => {
    const firstTimestamp = 1674071114;
    const firstTimestampExpected = '18/01/2023 - 21:45';
    const firstTimestampResult = pipe.transform(firstTimestamp);
    
    expect(firstTimestampResult).toEqual(firstTimestampExpected);
  });
});
