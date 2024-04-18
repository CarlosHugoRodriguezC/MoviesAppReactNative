import {useEffect, useState} from 'react';
import * as UseCases from '../../core/use-cases';
import {movieDBFetcher} from '../../config/adapters/movieDb.adapter';
import type {FullMovie} from '../../core/entities/movie.entity';
import {Cast} from '../../core/entities/cast.entity';

export const useMovie = (movieId: number) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState<FullMovie | null>(null);
  const [cast, setCast] = useState<Cast[]>([]);

  useEffect(() => {
    console.log('useMovie', movieId);
    loadMovie();
  }, [movieId]);

  const loadMovie = async () => {
    setIsLoading(true);
    const moviePromise = UseCases.getMovieByIdUseCase(movieDBFetcher, movieId);
    const castPromise = UseCases.getMovieCastUseCase(movieDBFetcher, movieId);

    const [movie, cast] = await Promise.all([moviePromise, castPromise]);

    setMovie(movie);
    setCast(cast);

    setIsLoading(false);
  };

  return {
    movie,
    cast,
    isLoading,

    // methods
    reload: loadMovie,
  };
};
