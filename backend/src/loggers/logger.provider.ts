import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DevLogger } from './dev.logger';
import { JsonLogger } from './json.logger';
import { TskvLogger } from './tskv.logger';

export const loggerProvider: Provider = {
  provide: 'LOGGER',
  useFactory: (configService: ConfigService) => {
    const type = configService.get<string>('LOGGER_TYPE', 'dev');
    console.log(` Выбран логгер типа: ${type}`);

    switch (type) {
      case 'json':
        return new JsonLogger();
      case 'tskv':
        return new TskvLogger();
      case 'dev':
      default:
        return new DevLogger();
    }
  },
  inject: [ConfigService],
};
