import { Injectable } from '@nestjs/common';
import { FilmsRepository } from 'src/repository/films.repository';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: FilmsRepository) {}
  createOrder(data) {
    return this.filmsRepository.createOrder(data);
  }
}
