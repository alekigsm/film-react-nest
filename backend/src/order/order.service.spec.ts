import { Test, TestingModule } from '@nestjs/testing';
import { CreateOrderDto } from './dto/order.dto';
import { OrderService } from './order.service';
import { OrdersRepository } from '../repository/order.repository';
import { BadRequestException } from '@nestjs/common';

describe('OrderService', () => {
  let service: OrderService;
  const mockOrdersRepository = {
    createOrder: jest.fn(),
  };

  let createOrderDto: CreateOrderDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: OrdersRepository,
          useValue: mockOrdersRepository,
        },
      ],
    }).compile();
    createOrderDto = {
      email: 'ya@ya.ru',
      phone: '89999999999',
      tickets: [
        {
          film: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
          session: 'f2e429b0-685d-41f8-a8cd-1d8cb63b99ce',
          daytime: '2024-06-28T10:00:53+03:00',
          row: 0,
          seat: 5,
          price: 350,
        },
      ],
    };
    service = module.get<OrderService>(OrderService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createOrder', () => {
    it('should successfully create an order and return total and items', async () => {
      // Arrange
      mockOrdersRepository.createOrder.mockResolvedValue(true);

      // Act
      const result = await service.createOrder(createOrderDto);

      // Assert
      expect(result).toEqual({
        total: 350,
        items: [
          {
            ...createOrderDto.tickets[0],
            id: expect.stringMatching(/^ticket-\d+-\d+$/),
          },
        ],
      });
      expect(mockOrdersRepository.createOrder).toHaveBeenCalledWith(
        createOrderDto,
      );
      expect(mockOrdersRepository.createOrder).toHaveBeenCalledTimes(1);
    });

    it('should throw BadRequestException if email is invalid', async () => {
      // Arrange
      const invalidDto = { ...createOrderDto, email: 'invalid-email' };

      // Act & Assert
      await expect(service.createOrder(invalidDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(mockOrdersRepository.createOrder).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException if email does not contain @', async () => {
      // Arrange
      const invalidDto = { ...createOrderDto, email: 'emailwithoutat.com' };

      // Act & Assert
      await expect(service.createOrder(invalidDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(mockOrdersRepository.createOrder).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException if repository fails to create order', async () => {
      // Arrange
      mockOrdersRepository.createOrder.mockResolvedValue(false);

      // Act & Assert
      await expect(service.createOrder(createOrderDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(mockOrdersRepository.createOrder).toHaveBeenCalledWith(
        createOrderDto,
      );
    });

    it('should calculate total correctly for multiple tickets', async () => {
      // Arrange
      const multiTicketDto: CreateOrderDto = {
        ...createOrderDto,
        tickets: [
          ...createOrderDto.tickets,
          {
            film: 'film-2',
            session: 'session-2',
            daytime: '2024-06-28T14:00:00+03:00',
            row: 1,
            seat: 10,
            price: 500,
          },
        ],
      };
      mockOrdersRepository.createOrder.mockResolvedValue(true);

      // Act
      const result = await service.createOrder(multiTicketDto);

      // Assert
      expect(result.total).toBe(850); // 350 + 500
      expect(result.items).toHaveLength(2);
    });
  });
});
