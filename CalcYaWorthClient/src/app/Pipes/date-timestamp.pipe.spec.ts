import { DateTimestampPipe } from './date-timestamp.pipe';

describe('DateTimestampPipe', () => {
  it('create an instance', () => {
    const pipe = new DateTimestampPipe();
    expect(pipe).toBeTruthy();
  });
});
