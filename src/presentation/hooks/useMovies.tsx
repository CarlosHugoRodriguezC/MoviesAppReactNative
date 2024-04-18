import {useEffect, useState} from 'react';
import {Movie} from '../../core/entities/movie.entity';
import * as UseCases from '../../core/use-cases';
import {movieDBFetcher} from '../../config/adapters/movieDb.adapter';

let popularPageNumber = 1,
  upcomingPageNumber = 1,
  topRatedPageNumber = 1;

export const useMovies = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [popular, setPopular] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [upcoming, setUpcoming] = useState<Movie[]>([]);

  useEffect(() => {
    initialLoading();
  }, []);

  const initialLoading = async () => {
    setIsLoading(true);

    const nowPlayingPromise = UseCases.moviesNowPlayingUseCase(movieDBFetcher);
    const popularPromise = UseCases.moviesPopularUseCase(movieDBFetcher);
    const topRatedPromise = UseCases.moviesTopRatedUseCase(movieDBFetcher);
    const upcomingPromise = UseCases.moviesUpcomingUseCase(movieDBFetcher);

    const [nowPlayingMovies, popularMovies, topRatedMovies, upcomingMovies] =
      await Promise.all([
        nowPlayingPromise,
        popularPromise,
        topRatedPromise,
        upcomingPromise,
      ]);

    setNowPlaying(nowPlayingMovies);
    setPopular(popularMovies);
    setTopRated(topRatedMovies);
    setUpcoming(upcomingMovies);

    setIsLoading(false);
  };

  return {
    isLoading,
    nowPlaying,
    popular,
    topRated,
    upcoming,

    //methods
    popularNextPage: async () => {
      popularPageNumber++;
      const popularMovies = await UseCases.moviesPopularUseCase(
        movieDBFetcher,
        {
          page: popularPageNumber,
        },
      );

      setPopular(prev => [...prev, ...popularMovies]);
    },
    upcomingNextPage: async () => {
      upcomingPageNumber++;
      const upcomingMovies = await UseCases.moviesUpcomingUseCase(
        movieDBFetcher,
        {
          page: upcomingPageNumber,
        },
      );

      setUpcoming(prev => [...prev, ...upcomingMovies]);
    },
    topRatedNextPage: async () => {
      topRatedPageNumber++;
      const topRatedMovies = await UseCases.moviesTopRatedUseCase(
        movieDBFetcher,
        {
          page: topRatedPageNumber,
        },
      );

      setTopRated(prev => [...prev, ...topRatedMovies]);
    },
  };
};
