import { CreateOrderDto } from '../order/dto/order.dto';

export default interface IOrdersRepository {
  createOrder(createOrderDto: CreateOrderDto): Promise<boolean>;
}
