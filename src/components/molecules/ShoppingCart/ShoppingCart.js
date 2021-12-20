import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ICCart} from '../../../assets';
import {connect} from 'react-redux';

const ShoppingCart = ({onPress, totalItem, TotalOrder}) => {
  return (
    <TouchableOpacity
      style={styles.buttonTab}
      activeOpacity={0.8}
      onPress={onPress}>
      <View style={{flexDirection: 'row'}}>
        <ICCart />
        <Text style={styles.textButton}>
          {totalItem} Items - Rp{TotalOrder}
        </Text>
      </View>
      <Text style={styles.textButton}>Order Now</Text>
    </TouchableOpacity>
  );
};

const mapStateToProps = state => {
  return {
    cartItems: state,
  };
};

export default ShoppingCart;

const styles = StyleSheet.create({
  buttonTab: {
    marginHorizontal: 19,
    borderRadius: 10,
    backgroundColor: '#2FAD24',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  textButton: {
    textAlignVertical: 'center',
    color: 'white',
    fontFamily: 'Poppins-Regular',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});
