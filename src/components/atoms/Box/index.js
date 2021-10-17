import React from 'react';
import {StyleSheet, View} from 'react-native';

const Box = () => {
  return (
    <View style={styles.container}>
      <View style={styles.box} />
      <View style={styles.box} />
    </View>
  );
};

export default Box;

const styles = StyleSheet.create({
  box: {
    width: 45,
    height: 45,
    borderRadius: 9,
    backgroundColor: '#C4C4C4',
    margin: 13,
  },
  container: {
    flexDirection: 'row',
  },
});
