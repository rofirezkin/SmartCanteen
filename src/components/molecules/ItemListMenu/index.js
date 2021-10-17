import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Next} from '../../../assets';

const ItemListMenu = ({label, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{label}</Text>
      <View>
        <Next />
      </View>
    </TouchableOpacity>
  );
};

export default ItemListMenu;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    fontWeight: '600',
  },
});
