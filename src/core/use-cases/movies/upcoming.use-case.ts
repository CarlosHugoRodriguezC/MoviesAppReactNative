import type {Movie} from '../../entities/movie.entity';
import type {UpcomingResponse} from '../../../infrastructure/interfaces/movie-db.responses';
import {HttpAdapter} from '../../../config/adapters/http/http.adapter';
import {MovieMapper} from '../../../infrastructure/mappers/movie.mapper';

interface Options {
  page?: number;
  limit?: number;
}

export const moviesUpcomingUseCase = async (
  fetcher: HttpAdapter,
  options?: Options,
): Promise<Movie[]> => {
  try {
    const {page = 1, limit = 10} = options || {};

    const upcoming = await fetcher.get<UpcomingResponse>('/upcoming', {
      params: {
        page,
        limit,
      },
    });

    return upcoming.results.map(MovieMapper.fromMovieDBResultToEntity);
  } catch (error) {
    console.log(error);
    throw new Error('Error fetching upcoming movies');
  }
};
