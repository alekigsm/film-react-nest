import { model, Schema } from 'mongoose';
export interface IShedule extends Document {
  id: string;
  daytime: string;
  hall: number;
  rows: number;
  seats: number;
  price: number;
  taken: string[];
}
export interface IFilm extends Document {
  id: string;
  rating: number;
  director: string;
  tags: string[];
  image: string;
  cover: string;
  title: string;
  about: string;
  description: string;
  schedule: IShedule[];
}
export const ScheduleSchema = new Schema<IShedule>({
  id: { type: String, required: true },
  daytime: { type: String, required: true },
  hall: { type: Number, required: true },
  rows: { type: Number, required: true },
  seats: { type: Number, required: true },
  price: { type: Number, required: true },
  taken: { type: [String], default: [] },
});

export const FilmSchema = new Schema<IFilm>({
  id: { type: String, required: true },
  rating: { type: Number, required: true },
  director: { type: String, required: true },
  tags: { type: [String], required: true },
  image: { type: String, required: true },
  cover: { type: String, required: true },
  title: { type: String, required: true },
  about: { type: String, required: true },
  description: { type: String, required: true },
  schedule: { type: [ScheduleSchema], required: true },
});

const FilmModel = model<IFilm>('Film', FilmSchema);
export default FilmModel;
