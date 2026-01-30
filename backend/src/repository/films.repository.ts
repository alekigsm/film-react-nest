import { Injectable } from '@nestjs/common';
import {
  GetFilmDto,
  GetFilmsResponseDto,
  GetScheduleDto,
  GetScheduleResponseDto,
} from 'src/films/dto/films.dto';
import FilmModel from 'src/films/schema/filmSchema';

@Injectable()
export class FilmsRepository {
  // Маппер фильма
  private mapToFilmDto(filmDocument: any): GetFilmDto {
    return {
      id: filmDocument.id,
      rating: filmDocument.rating,
      director: filmDocument.director,
      tags: filmDocument.tags,
      title: filmDocument.title,
      about: filmDocument.about,
      description: filmDocument.description,
      image: filmDocument.image,
      cover: filmDocument.cover,
    };
  }

  // Маппер расписания
  private mapToScheduleDto(scheduleItem: any): GetScheduleDto {
    return {
      id: scheduleItem.id,
      daytime: scheduleItem.daytime,
      hall: scheduleItem.hall.toString(),
      rows: scheduleItem.rows,
      seats: scheduleItem.seats,
      price: scheduleItem.price,
      taken: scheduleItem.taken || [],
    };
  }

  async getFilms(): Promise<GetFilmsResponseDto> {
    console.log('=== DEBUG getFilms ===');

    try {
      const items = await FilmModel.find().exec();
      console.log(`Found ${items.length} films`);

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

      console.log('Mapped items:', mappedItems);

      const total = await FilmModel.countDocuments().exec();

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
    const film = await FilmModel.findOne(
      { id },
      { schedule: 1, title: 1, _id: 0 },
    ).exec();

    if (!film) return null;

    return {
      total: film.schedule.length,
      items: film.schedule.map((item) => this.mapToScheduleDto(item)),
    };
  }
}
