import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';
import { GetFilmsResponseDto, GetScheduleResponseDto } from './dto/films.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  getAllFilms(): Promise<GetFilmsResponseDto> {
    return this.filmsService.getAllFilms();
  }

  @Get(':id/schedule')
  getFilmSchedule(@Param('id') id: string): Promise<GetScheduleResponseDto> {
    return this.filmsService.getFilmSchedule(id);
  }
}
