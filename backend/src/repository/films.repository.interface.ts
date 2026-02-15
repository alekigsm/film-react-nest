import { IFilm } from '../films/schema/filmSchema';

interface IFilmsRepository {
  findAll(): Promise<IFilm[]>;

  findById(id: string): Promise<IFilm | null>;
  checkFilmAndScheduleExists(
    filmId: string,
    scheduleId: string,
  ): Promise<boolean>;

  reserveSeat(
    filmId: string,
    scheduleId: string,
    seatKey: string,
  ): Promise<boolean>;
}

export default IFilmsRepository;
