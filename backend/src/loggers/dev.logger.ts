import { Injectable, ConsoleLogger } from '@nestjs/common';

@Injectable()
export class DevLogger extends ConsoleLogger {
  log(message: any, context?: string) {
    const requestId = 123123; // ваша цифра
    super.log(`[${requestId}] ${message}`, context);
  }
}
