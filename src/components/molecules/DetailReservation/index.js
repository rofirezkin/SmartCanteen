import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Box from '../../atoms/Box';

const DetailReservation = () => {
  return (
    <View style={styles.container}>
      <View style={styles.viewText}>
        <Text style={styles.title}>food court place</Text>
      </View>
      <View />
      <View style={styles.firstBox}>
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
      </View>
      <View>
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
      </View>
    </View>
  );
};

export default DetailReservation;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  box: {
    width: 45,
    height: 45,
    backgroundColor: 'red',
    borderRadius: 10,
  },
  title: {
    transform: [{rotate: '-90deg'}],
    marginLeft: -50,
    fontSize: 20,
  },
  viewText: {
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
  },
});
