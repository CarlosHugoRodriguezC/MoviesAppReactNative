import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {RootStackParams} from '../../navigation/StackNavigation';
import {useMovie} from '../../hooks/useMovie';
import {MovieHeader} from '../../components/movie/MovieHeader';
import {MovieDetails} from '../../components/movie/MovieDetails';
import {FullScreenLoader} from '../../components/loaders/FullScreenLoader';

interface Props extends StackScreenProps<RootStackParams, 'Details'> {}

export const DetailsScreen = ({route}: Props) => {
  const {id} = route.params;

  const {movie, cast, isLoading} = useMovie(id);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  if (!movie) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Movie not found</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <MovieHeader
        title={movie.title}
        subtitle={movie.originalTitle}
        poster={movie.poster}
      />
      <MovieDetails movie={movie} cast={cast} />
    </ScrollView>
  );
};
