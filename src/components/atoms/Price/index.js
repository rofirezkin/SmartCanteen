import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Number from '../../../utils/Number/Number';

const Price = ({price}) => {
  return (
    <View style={styles.container}>
      <Number style={styles.priceDefault} number={price}/>
      <Text style={styles.discountFee}>Rp15.000</Text>
      <View style={styles.statusPromo}>
        <Text style={styles.textPromo}>Promo</Text>
      </View>
    </View>
  );
};

export default Price;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  priceDefault: {
    color: '#535353',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    marginRight: 10,
  },
  discountFee: {
    color: 'black',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    marginRight: 10,
  },
  statusPromo: {
    backgroundColor: '#FD3333',
    paddingVertical: 2,
    paddingHorizontal: 13,
    borderRadius: 11,
  },
  textPromo: {
    color: 'white',
    fontSize: 11,
  },
});
