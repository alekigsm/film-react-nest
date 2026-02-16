import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Films } from './Films';

@Entity()
export class Schedules {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  daytime: string;
  @Column()
  hall: number;
  @Column()
  rows: number;
  @Column()
  seats: number;
  @Column()
  price: number;
  @Column('simple-array')
  taken: string[];
  @ManyToOne(() => Films, (film) => film.schedule)
  film: Films;
}
