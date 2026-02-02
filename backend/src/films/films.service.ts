import { Injectable, NotFoundException } from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';
import {
  GetFilmDto,
  GetFilmsResponseDto,
  GetScheduleDto,
  GetScheduleResponseDto,
} from '../films/dto/films.dto';
import { IFilm, IShedule } from './schema/filmSchema';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

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
      schedule: filmDocument.schedule.map((s) => this.mapToScheduleDto(s)), // ← тоже маппим!
    };
  }
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
    const films = await this.filmsRepository.findAll();

    const items = films.map((film) => this.mapToFilmDto(film));
    return {
      total: films.length,
      items: items,
    };
  }

  async getFilmSchedule(id: string): Promise<GetScheduleResponseDto> {
    const film = await this.filmsRepository.findById(id);

    if (!film) {
      throw new NotFoundException(`Фильм с ID ${id} не найден`);
    }

    const items = film.schedule.map((schedule) =>
      this.mapToScheduleDto(schedule),
    );
    return {
      total: items.length,
      items: items,
    };
  }
}
