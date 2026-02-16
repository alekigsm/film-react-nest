import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Schedules } from './Schedule';

@Entity()
export class Films {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  rating: number;
  @Column()
  director: string;
  @Column('simple-array')
  tags: string[];
  @Column()
  image: string;
  @Column()
  cover: string;
  @Column()
  title: string;
  @Column()
  about: string;
  @Column()
  description: string;
  @OneToMany(() => Schedules, (schedule) => schedule.film)
  schedule: Schedules[];
}
