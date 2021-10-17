import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {IcStartOff, IcStartOn} from '../../../assets';

const Rating = ({ratingCard}) => {
  if (ratingCard) {
    return (
      <View style={styles.ratingContainer}>
        <View style={styles.startContainer}>
          <IcStartOn />
        </View>
        <Text>4.5</Text>
      </View>
    );
  }
  return (
    <View style={styles.ratingContainer}>
      <View style={styles.startContainer}>
        <IcStartOn />
        <IcStartOn />
        <IcStartOn />
        <IcStartOn />
        <IcStartOff />
      </View>
      <Text>4.5</Text>
    </View>
  );
};

export default Rating;

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: 'row',
  },
  startContainer: {
    flexDirection: 'row',
  },
});
