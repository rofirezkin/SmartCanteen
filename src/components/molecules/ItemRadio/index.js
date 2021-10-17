import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {RadioButton, Text} from 'react-native-paper';

const ItemRadio = ({type}) => {
  const [value, setValue] = React.useState('first');

  return (
    <RadioButton.Group
      onValueChange={newValue => setValue(newValue)}
      value={value}>
      <View style={styles.radio}>
        <RadioButton value="first" />
        <Text style={styles.text}>Cash</Text>
      </View>
      <View style={styles.radio}>
        <RadioButton value="second" />
        <Text style={styles.text}>Online Payment</Text>
      </View>
    </RadioButton.Group>
  );
};
const styles = StyleSheet.create({
  radio: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#909090',
  },
});

export default ItemRadio;
