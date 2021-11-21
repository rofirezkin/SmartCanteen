import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const Button = ({
  disabled = false,
  label,
  color = '#ED212B',
  onPress,
  double,
  textColor = 'white',
}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} disabled={disabled}>
      <View style={styles.container(color, double)}>
        <Text style={styles.text(textColor)}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: (color, double) => ({
    backgroundColor: color,
    padding: 12,
    paddingHorizontal: double ? 25 : 12,
    borderRadius: 8,
    borderWidth: color === 'white' ? 1 : 0,
    borderColor: '#ED212B',
  }),
  text: textColor => ({
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: textColor,
    textAlign: 'center',
  }),
});
