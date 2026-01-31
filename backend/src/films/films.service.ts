import { Injectable } from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';
import { GetFilmsResponseDto, GetScheduleResponseDto } from './dto/films.dto';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async getAllFilms(): Promise<GetFilmsResponseDto> {
    return this.filmsRepository.getAllFilms();
  }

  async getFilmSchedule(id: string): Promise<GetScheduleResponseDto> {
    return this.filmsRepository.getFilmSchedule(id);
  }
}
