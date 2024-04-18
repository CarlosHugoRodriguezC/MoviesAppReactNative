import {HttpAdapter} from '../../../config/adapters/http/http.adapter';
import { MovieDBMovie } from '../../../infrastructure/interfaces/movie-db.responses';
import {MovieMapper} from '../../../infrastructure/mappers/movie.mapper';
import {FullMovie} from '../../entities/movie.entity';

export const getMovieByIdUseCase = async (
  fetcher: HttpAdapter,
  movieId: number,
): Promise<FullMovie> => {
  try {
    const response = await fetcher.get<MovieDBMovie>(`/${movieId}`);

    return MovieMapper.fromMovieDBToEntity(response);
  } catch (error) {
    console.error(error);
    throw new Error('Error getting movie by id');
  }
};
