import { Injectable } from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async getAllFilms() {
    return this.filmsRepository.getFilms();
  }

  async getFilmSchedule(id: string) {
    return this.filmsRepository.getFilmSchedule(id);
  }
}
