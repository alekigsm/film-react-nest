import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { NotFoundException } from '@nestjs/common';

describe('FilmsController', () => {
  let controller: FilmsController;

  const mockFilmsService = {
    getAllFilms: jest.fn(),
    getFilmSchedule: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: mockFilmsService,
        },
      ],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllFilms', () => {
    it('should return all films', async () => {
      const expectedResult = {
        total: 2,
        items: [
          { id: '1', title: 'Film 1' },
          { id: '2', title: 'Film 2' },
        ],
      };

      mockFilmsService.getAllFilms.mockResolvedValue(expectedResult);

      const result = await controller.getAllFilms();

      expect(result).toEqual(expectedResult);

      expect(mockFilmsService.getAllFilms).toHaveBeenCalledTimes(1);
      expect(mockFilmsService.getAllFilms).toHaveBeenCalledWith(); // без аргументов
    });

    it('should handle errors from service', async () => {
      mockFilmsService.getAllFilms.mockRejectedValue(
        new Error('Service error'),
      );
      await expect(controller.getAllFilms()).rejects.toThrow('Service error');
    });
  });

  describe('getFilmSchedule', () => {
    it('should return schedule for film', async () => {
      const filmId = 'film-123';
      const expectedResult = {
        total: 2,
        items: [
          { id: 's1', time: '12:00' },
          { id: 's2', time: '15:00' },
        ],
      };

      mockFilmsService.getFilmSchedule.mockResolvedValue(expectedResult);

      const result = await controller.getFilmSchedule(filmId);

      expect(result).toEqual(expectedResult);
      expect(mockFilmsService.getFilmSchedule).toHaveBeenCalledWith(filmId);
      expect(mockFilmsService.getFilmSchedule).toHaveBeenCalledTimes(1);
    });

    it('should handle film not found', async () => {
      const filmId = 'non-existent';

      mockFilmsService.getFilmSchedule.mockRejectedValue(
        new NotFoundException(`Фильм с ID ${filmId} не найден`),
      );

      await expect(controller.getFilmSchedule(filmId)).rejects.toThrow(
        NotFoundException,
      );

      expect(mockFilmsService.getFilmSchedule).toHaveBeenCalledWith(filmId);
    });
  });
});
