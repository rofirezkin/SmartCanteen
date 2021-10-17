import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ItemValue} from '..';

const CardChekout = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Dine In</Text>
      <View>
        <ItemValue title="Canteen Location" value="Fakultas Teknik" />
        <ItemValue title="Number Table" value="42" />
        <Text style={styles.text}>Drop of Location</Text>
      </View>
    </View>
  );
};

export default CardChekout;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderColor: '#DFDFDF',
    borderWidth: 1,
    padding: 13,
  },
  text: {
    color: '#8D92A3',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
});
