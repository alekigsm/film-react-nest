import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/order.dto';
import { BadRequestException } from '@nestjs/common';

describe('OrderController', () => {
  let controller: OrderController;

  const mockOrderService = {
    createOrder: jest.fn(),
  };

  // Тестовые данные
  const createOrderDto: CreateOrderDto = {
    email: 'test@test.com',
    phone: '89991234567',
    tickets: [
      {
        film: 'film-id',
        session: 'session-id',
        daytime: '2024-01-01T12:00:00Z',
        row: 5,
        seat: 10,
        price: 350,
      },
    ],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: mockOrderService,
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createOrder', () => {
    it('should create an order and return result', async () => {
      // Arrange
      const expectedResult = {
        total: 350,
        items: [
          {
            ...createOrderDto.tickets[0],
            id: 'ticket-1234567890-0',
          },
        ],
      };

      mockOrderService.createOrder.mockResolvedValue(expectedResult);

      // Act
      const result = await controller.createOrder(createOrderDto);

      // Assert
      expect(result).toEqual(expectedResult);
      expect(mockOrderService.createOrder).toHaveBeenCalledWith(createOrderDto);
      expect(mockOrderService.createOrder).toHaveBeenCalledTimes(1);
    });

    it('should handle errors from service', async () => {
      // Arrange
      mockOrderService.createOrder.mockRejectedValue(
        new BadRequestException('Invalid email'),
      );

      // Act & Assert
      await expect(controller.createOrder(createOrderDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(mockOrderService.createOrder).toHaveBeenCalledWith(createOrderDto);
    });

    it('should pass through different DTOs', async () => {
      const anotherDto: CreateOrderDto = {
        ...createOrderDto,
        email: 'another@test.com',
        tickets: [
          ...createOrderDto.tickets,
          {
            film: 'film-2',
            session: 'session-2',
            daytime: '2024-01-01T15:00:00Z',
            row: 3,
            seat: 7,
            price: 500,
          },
        ],
      };

      const expectedResult = {
        total: 850,
        items: [
          { ...anotherDto.tickets[0], id: 'ticket-1' },
          { ...anotherDto.tickets[1], id: 'ticket-2' },
        ],
      };

      mockOrderService.createOrder.mockResolvedValue(expectedResult);

      const result = await controller.createOrder(anotherDto);

      expect(result).toEqual(expectedResult);
      expect(mockOrderService.createOrder).toHaveBeenCalledWith(anotherDto);
    });
  });
});
