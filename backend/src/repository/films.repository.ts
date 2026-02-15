import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { IFilm } from '../films/schema/filmSchema';
import { Model } from 'mongoose';
//import { Mongoose } from 'mongoose';
import IFilmsRepository from './films.repository.interface';

@Injectable()
export class FilmsRepository implements IFilmsRepository {
  constructor(
    @InjectModel('Film')
    private readonly filmModel: Model<IFilm>,
  ) {}

  findAll(): Promise<IFilm[]> {
    return this.filmModel.find({});
  }

  findById(id: string): Promise<IFilm | null> {
    return this.filmModel.findOne({ id });
  }

  async checkFilmAndScheduleExists(
    filmId: string,
    scheduleId: string,
  ): Promise<boolean> {
    try {
      const film = await this.filmModel.findOne({
        id: filmId,
        'schedule.id': scheduleId,
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
      const result = await this.filmModel.findOneAndUpdate(
        {
          id: filmId,
          'schedule.id': scheduleId,
          'schedule.taken': { $ne: seatKey },
        },
        {
          $push: { 'schedule.$.taken': seatKey },
        },
        {
          new: true,
        },
      );
      return !!result;
    } catch (error) {
      throw new InternalServerErrorException('Database error');
    }
  }
}
