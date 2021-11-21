import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {DummyFood1} from '../../../assets';
import {fonts} from '../../../utils';

const OrderList = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('Payment')}>
      <View style={styles.card}>
        <View>
          <Text style={styles.title}>Nasi Ibu Sartika - FIT</Text>
          <Text style={styles.subtitle}>3 Menu - Dine In </Text>
        </View>
        <Image source={DummyFood1} style={styles.avatar} />
      </View>
    </TouchableOpacity>
  );
};

export default OrderList;

const styles = StyleSheet.create({
  avatar: {
    width: 66,
    height: 66,
    borderRadius: 10,
  },
  card: {
    flexDirection: 'row',
    paddingHorizontal: 19,
    justifyContent: 'space-between',
  },
  container: {
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 1,
    paddingVertical: 8,
    marginTop: 15,
  },
  title: {
    fontSize: 16,
    fontFamily: fonts.primary[500],
  },
  subtitle: {
    fontSize: 14,
    fontFamily: fonts.primary[400],
  },
});
