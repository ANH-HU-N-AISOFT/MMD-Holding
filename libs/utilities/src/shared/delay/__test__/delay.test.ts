import { delay } from '../src/delay';

describe('delay', () => {
  it('waits for the specified time', async () => {
    const delayTime = 500; // 500 milliseconds
    const startTime = Date.now();
    await delay(delayTime);
    const endTime = Date.now();
    const elapsedTime = endTime - startTime;
    expect(elapsedTime).toBeGreaterThanOrEqual(delayTime);
  });

  it('default behavior when no time is specified', async () => {
    const startTime = Date.now();
    await delay();
    const endTime = Date.now();
    const elapsedTime = endTime - startTime;
    // As no time is specified, it should be very quick (near instant), but we allow a small buffer
    expect(elapsedTime).toBeLessThan(20);
  });
});
