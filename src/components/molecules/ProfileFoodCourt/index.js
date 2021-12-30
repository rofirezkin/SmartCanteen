import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {DummyFoodCourt} from '../../../assets';
import {ENDPOINT_SMART_CANTEEN} from '../../../utils/API/httpClient';
import Rating from '../Rating';

const ProfileFoodCourt = ({nameCanteen, ingredients, number, image}) => {
  return (
    <View style={styles.container}>
      <Image
        source={{uri: `${ENDPOINT_SMART_CANTEEN}/storage/${image}`}}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{nameCanteen}</Text>
        <Text style={styles.description}>{ingredients}</Text>
        <Rating number={number} />
      </View>
    </View>
  );
};

export default ProfileFoodCourt;

const styles = StyleSheet.create({
  image: {
    width: 81,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  container: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: 'black',
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: '#8D92A3',
    width: '95%',
  },
  textContainer: {
    marginLeft: 14,
    flex: 1,
  },
  statusText: {
    color: '#1CBD49',
    fontSize: 14,
  },
});
