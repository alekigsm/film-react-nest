import { Films } from '../films/entity/Films';

interface IFilmsRepository {
  findAll(): Promise<Films[]>;

  findById(id: string): Promise<Films | null>;
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
