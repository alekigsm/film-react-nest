import { TskvLogger } from './tskv.logger';

describe('TskvLogger', () => {
  let logger: TskvLogger;
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    logger = new TskvLogger();
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  const levels = ['log', 'error', 'warn', 'debug', 'verbose', 'fatal'];

  levels.forEach((level) => {
    it(`should format ${level} message correctly`, () => {
      // Вызываем метод динамически
      logger[level]('тестовой', 'param1', 'param2');

      expect(consoleSpy).toHaveBeenCalledTimes(1);
      const output = consoleSpy.mock.calls[0][0];

      expect(output).toContain(`level=${level}`);
      expect(output).toContain('message=тестовой');
      expect(output).toContain('optionalParams=param1,param2');
      expect(output).toContain('\t');
      expect(output.endsWith('\n')).toBe(true);
    });
  });
});
