import { JsonLogger } from './json.logger';

describe('JsonLogger', () => {
  let logger: JsonLogger;
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    logger = new JsonLogger();
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  const levels = ['log', 'error', 'warn', 'debug', 'verbose', 'fatal'];

  levels.forEach((level) => {
    it(`should format ${level} message correctly`, () => {
      logger[level]('тестовое сообщение', 'param1', 'param2');
      expect(consoleSpy).toHaveBeenCalledTimes(1);
      const outputString = consoleSpy.mock.calls[0][0];
      const parsedOutput = JSON.parse(outputString);
      expect(parsedOutput).toEqual({
        level: level,
        message: 'тестовое сообщение',
        optionalParams: [['param1', 'param2']],
      });
    });
  });
});
