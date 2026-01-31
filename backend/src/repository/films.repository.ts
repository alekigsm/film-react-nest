import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  GetFilmDto,
  GetFilmsResponseDto,
  GetScheduleDto,
  GetScheduleResponseDto,
} from '../films/dto/films.dto';
import { IFilm, IShedule } from '../films/schema/filmSchema';
import { Model } from 'mongoose';
//import { Mongoose } from 'mongoose';
import IFilmsRepository from './films.repository.interface';

@Injectable()
export class FilmsRepository implements IFilmsRepository {
  constructor(
    @InjectModel('Film')
    private readonly filmModel: Model<IFilm>,
  ) {}
  // Маппер фильма

  private mapToFilmDto(filmDocument: IFilm): GetFilmDto {
    return {
      id: filmDocument.id,
      rating: filmDocument.rating,
      director: filmDocument.director,
      tags: filmDocument.tags,
      title: filmDocument.title,
      about: filmDocument.about,
      description: filmDocument.description,
      image: `/content/afisha/${filmDocument.image}`,
      cover: `/content/afisha/${filmDocument.cover}`,
      schedule: filmDocument.schedule,
    };
  }

  // Маппер расписания
  private mapToScheduleDto(scheduleItem: IShedule): GetScheduleDto {
    return {
      id: scheduleItem.id,
      daytime: scheduleItem.daytime,
      hall: scheduleItem.hall,
      rows: scheduleItem.rows,
      seats: scheduleItem.seats,
      price: scheduleItem.price,
      taken: scheduleItem.taken || [],
    };
  }

  async getAllFilms(): Promise<GetFilmsResponseDto> {
    try {
      const items = await this.filmModel.find({});
      // Проверяем каждый документ
      const mappedItems = items.map((item, index) => {
        console.log(`Film ${index}:`, {
          id: item.id,
          hasId: !!item.id,
          title: item.title,
          tags: item.tags,
          tagsIsArray: Array.isArray(item.tags),
          rating: item.rating,
          ratingType: typeof item.rating,
        });

        return this.mapToFilmDto(item);
      });

      const total = await this.filmModel.countDocuments({});
      return {
        total,
        items: mappedItems,
      };
    } catch (error) {
      console.error('FULL ERROR DETAILS:', error);
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      throw error;
    }
  }

  async getFilmSchedule(id: string): Promise<GetScheduleResponseDto | null> {
    const film = await this.filmModel.findOne(
      { id },
      { schedule: 1, title: 1, _id: 0 },
    );

    if (!film) return null;

    return {
      total: film.schedule.length,
      items: film.schedule.map((item) => this.mapToScheduleDto(item)),
    };
  }

  createOrder(data) {
    return;
  }
}
