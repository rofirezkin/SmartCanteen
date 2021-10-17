import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {ICLocation} from '../../../assets';

const DropOffLocation = ({label}) => {
  const [value, setValue] = React.useState('');
  return (
    <View>
      <View>
        <View style={styles.container}>
          <ICLocation />
          <Text>{label}</Text>
        </View>
        <View style={styles.cardDelivery}>
          <RadioButton.Group
            onValueChange={newValue => setValue(newValue)}
            value={value}>
            <View style={styles.containerRadio}>
              <View style={styles.radio}>
                <RadioButton value="first" />
                <Text style={styles.text}>Lobby</Text>
              </View>
              <View style={styles.radio}>
                <RadioButton value="second" />
                <Text style={styles.text}>Parkir</Text>
              </View>
              <View style={styles.radio}>
                <RadioButton value="three" />
                <TextInput style={styles.input} placeholder="......" />
              </View>
            </View>
          </RadioButton.Group>
        </View>
      </View>
    </View>
  );
};

export default DropOffLocation;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 15,
  },
  cardDelivery: {
    marginTop: 7,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    paddingHorizontal: 10,
  },
  containerRadio: {
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
