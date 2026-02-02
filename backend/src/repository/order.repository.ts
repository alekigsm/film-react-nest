import { Injectable } from '@nestjs/common';
import { FilmsRepository } from './films.repository';
import { CreateOrderDto } from 'src/order/dto/order.dto';

@Injectable()
export class OrdersRepository {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<boolean> {
    const { tickets } = createOrderDto;

    for (const ticket of tickets) {
      const seatKey = `${ticket.row}:${ticket.seat}`;

      const success = await this.filmsRepository.reserveSeat(
        ticket.film,
        ticket.session,
        seatKey,
      );

      if (!success) return false;
    }

    return true;
  }
}
