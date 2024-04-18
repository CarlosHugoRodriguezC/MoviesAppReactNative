import React from 'react';
import {Cast} from '../../../core/entities/cast.entity';
import {Image, StyleSheet, Text, View} from 'react-native';

interface Props {
  cast: Cast;
}

export const CastActor = ({cast}: Props) => {
  return (
    <View style={styles.container}>
      <Image
        source={{uri: cast.avatar}}
        style={{width: 100, height: 150, borderRadius: 20}}
      />
      <View style={styles.actorInfo}>
        <Text>{cast.name}</Text>
        <Text>{cast.character}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
    paddingLeft: 10,
    display: 'flex',
    flexDirection: 'column',
    width: 100,
  },
  actorInfo: {
    marginLeft: 10,
    marginTop: 5,
  },
});
