import {
  GetFilmsResponseDto,
  GetScheduleResponseDto,
} from '../films/dto/films.dto';

interface IFilmsRepository {
  getAllFilms(): Promise<GetFilmsResponseDto>;
  getFilmSchedule(id: string): Promise<GetScheduleResponseDto | null>;
}

export default IFilmsRepository;
