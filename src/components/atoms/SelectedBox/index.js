import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const SelectedBox = ({color, text}) => {
  return (
    <View style={styles.container}>
      <View style={styles.boxCheck(color)} />
      <Text style={styles.label}>{text}</Text>
    </View>
  );
};

export default SelectedBox;

const styles = StyleSheet.create({
  container: {flexDirection: 'row', marginRight: 10},
  boxCheck: color => ({
    width: 20,
    height: 20,
    backgroundColor: color,
    borderRadius: 5,
    marginRight: 5,
  }),
});
