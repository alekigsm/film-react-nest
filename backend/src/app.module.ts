import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';
import { MongooseModule } from '@nestjs/mongoose'; // импорт

import { configProvider } from './app.config.provider';
import { FilmsController } from './films/films.controller';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { FilmsService } from './films/films.service';
import { FilmsRepository } from './repository/films.repository';
import { FilmSchema } from './films/schema/filmSchema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/afisha'), // ← ДОБАВЬТЕ ЭТО!

    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public'),
      serveRoot: '/content/afisha',
    }),

    MongooseModule.forFeature([{ name: 'Film', schema: FilmSchema }]),
  ],
  controllers: [FilmsController, OrderController],
  providers: [configProvider, OrderService, FilmsService, FilmsRepository],
})
export class AppModule {}
