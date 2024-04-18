import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useMovies} from '../../hooks/useMovies';
import {ScrollView} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {PosterCarousel} from '../../components/movies/PosterCarousel';
import {HorizontalCarousel} from '../../components/movies/HorizontalCarousel';
import {FullScreenLoader} from '../../components/loaders/FullScreenLoader';

export const HomeScreen = () => {
  const {top} = useSafeAreaInsets();
  const {
    isLoading,
    nowPlaying,
    popular,
    topRated,
    upcoming,
    popularNextPage,
    topRatedNextPage,
    upcomingNextPage,
  } = useMovies();

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <ScrollView>
      <View
        style={{
          marginTop: top + 20,
          paddingBottom: 30,
        }}>
        <PosterCarousel movies={nowPlaying} />
        <HorizontalCarousel
          loadNextPage={popularNextPage}
          movies={popular}
          title="Popular"
        />
        <HorizontalCarousel
          loadNextPage={topRatedNextPage}
          movies={topRated}
          title="Top Rated"
        />
        <HorizontalCarousel
          loadNextPage={upcomingNextPage}
          movies={upcoming}
          title="Upcoming"
        />
      </View>
    </ScrollView>
  );
};
