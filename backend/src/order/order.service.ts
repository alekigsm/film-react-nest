import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateOrderDto, CreateOrderResponseDto } from './dto/order.dto';
import { OrdersRepository } from '../repository/order.repository';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrdersRepository) {}

  async createOrder(
    createOrderDto: CreateOrderDto,
  ): Promise<CreateOrderResponseDto> {
    console.log(createOrderDto);
    if (!createOrderDto.email || !createOrderDto.email.includes('@')) {
      throw new BadRequestException('Invalid email');
    }

    const success = await this.orderRepository.createOrder(createOrderDto);

    if (!success) {
      throw new BadRequestException('Failed to create order');
    }

    return {
      total: createOrderDto.tickets.reduce(
        (sum, ticket) => sum + ticket.price,
        0,
      ),
      items: createOrderDto.tickets.map((ticket, index) => ({
        ...ticket,
        id: `ticket-${Date.now()}-${index}`,
      })),
    };
  }
}
