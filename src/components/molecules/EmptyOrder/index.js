import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Button from '../../atoms/Button';
import Gap from '../../atoms/Gap';

import {ILSuccessOrder} from '../../../assets';

const EmptyOrder = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image source={ILSuccessOrder} style={styles.icon} />
      <Gap height={15} />
      <View>
        <Text style={styles.title}>You've Made Order</Text>
        <Text style={styles.subtitle}>Transaction Successful,</Text>
        <Text style={styles.subtitle}>We will process your order</Text>
      </View>
      <Gap height={15} />
      <View>
        <Button
          label="Order Other Food"
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{name: 'MainApp'}],
            })
          }
        />
        <Gap height={20} />
        <Button label="View My Order" color="#8D92A3" />
      </View>
    </View>
  );
};

export default EmptyOrder;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
  },
  subtitle: {
    textAlign: 'center',
    color: '#8D92A3',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  icon: {
    width: 145,
    height: 209,
  },
  container: {
    alignItems: 'center',
  },
});
