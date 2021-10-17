import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ItemValue = ({title, value, colorValue}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value(colorValue)}>{value}</Text>
    </View>
  );
};

export default ItemValue;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#8D92A3',
  },
  value: colorValue => ({
    fontSize: 14,
    color: colorValue ? '#1ABC9C' : 'black',
    fontFamily: 'Poppins-Regular',
    fontWeight: '600',
  }),
});
