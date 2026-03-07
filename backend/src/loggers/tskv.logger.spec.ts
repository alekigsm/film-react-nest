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

  it('should format log message correctly', () => {
    logger.log('тестовое сообщение', 'param1', 'param2');

    expect(consoleSpy).toHaveBeenCalledTimes(1);

    const output = consoleSpy.mock.calls[0][0];

    // Проверяем формат
    expect(output).toContain('level=log');
    expect(output).toContain('message=тестовое сообщение');
    expect(output).toContain('\t'); // табуляция
    expect(output.endsWith('\n')).toBe(true);
  });
});
