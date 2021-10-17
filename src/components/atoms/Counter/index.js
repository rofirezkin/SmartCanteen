import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Counter1, Counter2} from '../../../assets';

const Counter = ({payment, onPress}) => {
  const addCounter = () => {
    console.log('halo');
  };
  if (payment) {
    return (
      <View style={styles.counter}>
        <TouchableOpacity onPress={addCounter} style={styles.containerCounter}>
          <Counter2 />
        </TouchableOpacity>
        <View>
          <Text>12 Items</Text>
        </View>
        <TouchableOpacity onPress={addCounter} style={styles.containerCounter}>
          <Counter1 />
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.text}>Add</Text>
    </TouchableOpacity>
  );
};

export default Counter;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFDC60',
    marginTop: 13,
    paddingVertical: 6,
    borderRadius: 15,
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerCounter: {
    padding: 5,
  },
});
