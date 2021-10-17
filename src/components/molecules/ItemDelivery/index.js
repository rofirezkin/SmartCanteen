import * as React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {RadioButton, Text} from 'react-native-paper';

const ItemDelivery = () => {
  const [value, setValue] = React.useState('');

  return (
    <View>
      <Text>tes</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radio: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#909090',
  },
  input: {
    width: 70,
  },
});

export default ItemDelivery;
