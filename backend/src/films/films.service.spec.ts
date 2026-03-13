import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from './films.service';
import { FilmsRepository } from '../repository/films.repository'; // поправил путь

describe('FilmsService', () => {
  let service: FilmsService;
  const mockFilmsRepository = {
    findAll: jest.fn(),
    findById: jest.fn(),
  };

  const createTestFilm = (overrides = {}) => ({
    id: 'test-film-id',
    rating: 8,
    director: 'Тестовый Режиссер',
    tags: ['тест', 'кино'],
    title: 'Тестовый Фильм',
    about: 'О тестовом фильме',
    description: 'Полное описание тестового фильма',
    image: 'test.jpg',
    cover: 'test-cover.jpg',
    schedule: [
      {
        id: 'test-schedule-id',
        daytime: '2024-01-01T12:00:00Z',
        hall: 1,
        rows: 10,
        seats: 20,
        price: 350,
        taken: [],
      },
    ],
    ...overrides,
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmsService,
        {
          provide: FilmsRepository,
          useValue: mockFilmsRepository,
        },
      ],
    }).compile();

    service = module.get<FilmsService>(FilmsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllFilms', () => {
    it('should return all films', async () => {
      const testFilms = [
        createTestFilm({ id: 'film-1', title: 'Фильм 1' }),
        createTestFilm({ id: 'film-2', title: 'Фильм 2' }),
      ];

      mockFilmsRepository.findAll.mockResolvedValue(testFilms);

      const result = await service.getAllFilms();

      // 4. Проверяем результат
      expect(result.total).toBe(2); // количество
      expect(result.items).toHaveLength(2); // тоже количество
      expect(result.items[0].id).toBe('film-1'); // конкретный ID
      expect(result.items[0].title).toBe('Фильм 1'); // название

      // 5. Проверяем, что маппинг сработал (пути к изображениям)
      expect(result.items[0].image).toContain('/content/afisha/');

      // 6. Проверяем, что метод репозитория вызван
      expect(mockFilmsRepository.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return empty array when no films', async () => {
      mockFilmsRepository.findAll.mockResolvedValue([]);

      const result = await service.getAllFilms();

      expect(result.total).toBe(0);
      expect(result.items).toHaveLength(0);
    });
  });

  describe('getFilmSchedule', () => {
    it('should return schedule for existing film', async () => {
      const testFilm = createTestFilm({
        id: 'film-123',
        schedule: [
          {
            id: 's1',
            daytime: '12:00',
            hall: 1,
            rows: 10,
            seats: 20,
            price: 300,
            taken: [],
          },
          {
            id: 's2',
            daytime: '15:00',
            hall: 2,
            rows: 12,
            seats: 24,
            price: 400,
            taken: [1, 2, 3],
          },
        ],
      });

      mockFilmsRepository.findById.mockResolvedValue(testFilm);

      const result = await service.getFilmSchedule('film-123');

      expect(result.total).toBe(2); // 2 сеанса
      expect(result.items).toHaveLength(2);
      expect(result.items[0].id).toBe('s1');
      expect(result.items[1].price).toBe(400);

      // Проверяем, что taken массив сохранился
      expect(result.items[1].taken).toEqual([1, 2, 3]);

      expect(mockFilmsRepository.findById).toHaveBeenCalledWith('film-123');
    });

    it('should throw NotFoundException if film not found', async () => {
      mockFilmsRepository.findById.mockResolvedValue(null);

      await expect(service.getFilmSchedule('non-existent-id')).rejects.toThrow(
        'Фильм с ID non-existent-id не найден',
      );

      expect(mockFilmsRepository.findById).toHaveBeenCalledWith(
        'non-existent-id',
      );
    });
  });
});
