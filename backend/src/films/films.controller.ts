import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async findAll(): Promise<any> {
    return this.filmsService.getAllFilms();
  }

  @Get(':id/schedule')
  async findSchedule(@Param('id') id: string): Promise<any> {
    return this.filmsService.getFilmSchedule(id);
  }
}
