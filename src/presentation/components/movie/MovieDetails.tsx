import React from 'react';
import {Text, View} from 'react-native';
import {FullMovie} from '../../../core/entities/movie.entity';
import {Formatter} from '../../../config/helpers/formatter';
import {Cast} from '../../../core/entities/cast.entity';
import {FlatList} from 'react-native-gesture-handler';
import {CastActor} from '../cast/CastActor';

interface Props {
  movie: FullMovie;
  cast: Cast[];
}

export const MovieDetails = ({movie, cast}: Props) => {
  return (
    <>
      <View style={{marginHorizontal: 20}}>
        <View style={{flexDirection: 'row'}}>
          <Text>{movie.rating}</Text>
          <Text style={{marginLeft: 5}}>- {movie.genres.join(', ')}</Text>
        </View>
        {/* Overview */}
        <Text style={{fontSize: 23, marginTop: 10, fontWeight: 'bold'}}>
          Overview
        </Text>
        <Text style={{fontSize: 16}}>{movie.description}</Text>
        {/* Budget */}
        <Text style={{fontSize: 23, marginTop: 10, fontWeight: 'bold'}}>
          Budget
        </Text>
        <Text style={{fontSize: 18}}>{Formatter.currency(movie.budget)}</Text>
      </View>
      {/* Casting */}
      <View style={{marginTop: 10, marginBottom: 100}}>
        <Text
          style={{
            fontSize: 23,
            marginVertical: 10,
            marginHorizontal: 20,
            fontWeight: 'bold',
          }}>
          Actors
        </Text>
        <FlatList
          data={cast}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={({item}) => <CastActor cast={item} />}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
      </View>
    </>
  );
};
