import {MakeIterablePipe} from './make-iterable.pipe';

describe('MakeIterablePipe', () => {
  it('create an instance', () => {
    const pipe = new MakeIterablePipe();
    expect(pipe).toBeTruthy();
  });
});
