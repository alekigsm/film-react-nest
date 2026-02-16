import { Allow } from 'class-validator';

export class TicketDto {
  film: string;
  session: string;
  daytime: string;
  row: number;
  seat: number;
  price: number;
}

export class CreateOrderDto {
  @Allow()
  email: string;
  phone: string;
  tickets: TicketDto[];
}

export class TicketResponseDto {
  film: string;
  session: string;
  daytime: string;
  row: number;
  seat: number;
  price: number;
  id: string;
}

export class CreateOrderResponseDto {
  total: number;
  items: TicketResponseDto[];
}
