import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {DummyFood1, IcStartOff, IcStartOn} from '../../../assets';
import Rating from '../Rating';

const FoodCard = ({avatar, onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <View style={styles.container}>
        <Image style={styles.image} source={avatar} />
        <View style={styles.content}>
          <Text style={styles.text}>Paket Nasi & Ayam</Text>
          <Text style={styles.subTitle}>Kantin Fak. Teknik</Text>
          <Rating />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FoodCard;

const styles = StyleSheet.create({
  container: {
    width: 200,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 14,
    overflow: 'hidden',
    marginRight: 18,
  },
  content: {
    padding: 12,
  },
  image: {width: 200, height: 140, resizeMode: 'cover'},
  text: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#020202',
  },
  subTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: '#8D92A3',
  },
});
