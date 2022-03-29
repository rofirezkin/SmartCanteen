import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const Link = ({title, size, align, linkPayment, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.text(size, align, linkPayment)}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Link;

const styles = StyleSheet.create({
  text: (size, align, linkPayment) => ({
    fontSize: size,
    color: linkPayment ? 'green' : '#9E9E9E',
    fontFamily: 'Poppins-Regular',
    textDecorationLine: 'underline',
    textAlign: align,
  }),
});
