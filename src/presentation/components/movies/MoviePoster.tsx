import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {Movie} from '../../../core/entities/movie.entity';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../../navigation/StackNavigation';

interface Props {
  movie: Movie;
  height?: number;
  width?: number;
}

export const MoviePoster = ({movie, width = 300, height = 420}: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  return (
    <Pressable
      onPress={() => navigation.navigate('Details', {id: movie.id})}
      style={({pressed}) => ({
        ...styles.container,
        width,
        height,
        opacity: pressed ? 0.9 : 1,
      })}>
      <View style={{...styles.imageContainer, height, width}}>
        <Image source={{uri: movie.poster}} style={styles.image} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    borderRadius: 18,
  },
  imageContainer: {
    flex: 1,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.24,
    shadowRadius: 7,
    elevation: 10,
  },
  container: {
    marginHorizontal: 5,
    paddingVertical: 20,
    paddingHorizontal: 5,
  },
});
