import { Module } from '@nestjs/common';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { FilmsRepository } from '../repository/films.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Films } from './entity/Films';
import { Schedules } from './entity/Schedule';

@Module({
  imports: [TypeOrmModule.forFeature([Films, Schedules])],
  controllers: [FilmsController],
  providers: [FilmsService, FilmsRepository],
  exports: [FilmsRepository],
})
export class FilmsModule {}
