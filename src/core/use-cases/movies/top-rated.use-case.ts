import type {TopRatedResponse} from '../../../infrastructure/interfaces/movie-db.responses';
import type {Movie} from '../../entities/movie.entity';
import {HttpAdapter} from '../../../config/adapters/http/http.adapter';
import {MovieMapper} from '../../../infrastructure/mappers/movie.mapper';

interface Options {
  page?: number;
  limit?: number;
}

export const moviesTopRatedUseCase = async (
  fetcher: HttpAdapter,
  options?: Options,
): Promise<Movie[]> => {
  try {
    const {page = 1, limit = 10} = options || {};

    const topRated = await fetcher.get<TopRatedResponse>('/top_rated', {
      params: {
        page,
        limit,
      },
    });

    return topRated.results.map(MovieMapper.fromMovieDBResultToEntity);
  } catch (error) {
    console.log(error);
    throw new Error('Error fetching top rated movies');
  }
};
