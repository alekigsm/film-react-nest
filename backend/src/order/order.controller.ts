import { Controller, Post } from '@nestjs/common';

@Controller('order')
export class OrderController {
  @Post()
  create(): string {
    return 'Это метод создания нового фильма';
  }
}
