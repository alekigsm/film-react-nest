import { Injectable, InternalServerErrorException } from '@nestjs/common';

import IFilmsRepository from './films.repository.interface';
import { Films } from '../films/entity/Films';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FilmsRepository implements IFilmsRepository {
  constructor(
    @InjectRepository(Films)
    private readonly filmModel: Repository<Films>,
  ) {}

  findAll(): Promise<Films[]> {
    return this.filmModel.find({ relations: ['schedule'] });
  }

  findById(id: string): Promise<Films | null> {
    return this.filmModel.findOne({ where: { id }, relations: ['schedule'] });
  }

  async checkFilmAndScheduleExists(
    filmId: string,
    scheduleId: string,
  ): Promise<boolean> {
    try {
      const film = await this.filmModel.findOne({
        where: {
          id: filmId,
          schedule: {
            id: scheduleId,
          },
        },
        relations: ['schedule'],
      });
      return !!film;
    } catch (error) {
      throw new InternalServerErrorException('Database error');
    }
  }

  async reserveSeat(
    filmId: string,
    scheduleId: string,
    seatKey: string,
  ): Promise<boolean> {
    try {
      const film = await this.filmModel.findOne({
        where: { id: filmId },
        relations: ['schedule'],
      });
      if (film) {
        const schedule = film.schedule.find((s) => s.id === scheduleId);
        if (schedule && !schedule.taken.includes(seatKey)) {
          schedule.taken.push(seatKey);
          const result = await this.filmModel.save(film);
          return !!result;
        }
      }
      return false;
    } catch (error) {
      throw new InternalServerErrorException('Database error');
    }
  }
}
