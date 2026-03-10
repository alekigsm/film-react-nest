import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';
//import { MongooseModule } from '@nestjs/mongoose';
import { configProvider } from './app.config.provider';
import { FilmsModule } from './films/films.module';
import { OrderModule } from './order/order.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Films } from './films/entity/Films';
import { Schedules } from './films/entity/Schedule';
import { loggerProvider } from './loggers/logger.provider';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || process.env.DATABASE_HOST || 'localhost',
      port: Number(process.env.DB_PORT || process.env.DATABASE_PORT || 5432),
      username:
        process.env.DB_USERNAME || process.env.DATABASE_USERNAME || 'postgres',
      password:
        process.env.DB_PASSWORD || process.env.DATABASE_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE || process.env.DATABASE || 'filmdb',
      entities: [Films, Schedules],
      synchronize: true,
    }),
    // MongooseModule.forRoot('mongodb://127.0.0.1:27017/afisha'),
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public'),
      serveRoot: '/content/afisha',
    }),
    FilmsModule,
    OrderModule,
  ],
  providers: [configProvider, loggerProvider],
})
export class AppModule {}
