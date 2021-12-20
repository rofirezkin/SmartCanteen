import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {DummyFood1} from '../../../assets';
import {fonts} from '../../../utils';
import {ENDPOINT_SMART_CANTEEN} from '../../../utils/API/httpClient';

const OrderList = ({namaTenant, lokasiTenant, totalMenu, onPress, image}) => {
  const navigation = useNavigation();
  let dataLokasiTenant = '';
  switch (lokasiTenant) {
    case 'Fakultas Ilmu Terapan':
      dataLokasiTenant = 'FIT';
      break;
    case 'Fakultas Teknik':
      dataLokasiTenant = 'FT';
      break;
    case 'Fakultas Ekonomi dan Bisnis':
      dataLokasiTenant = 'FEB';
      break;
    case 'Gedung Kuliah Umum':
      dataLokasiTenant = 'GKU';
      break;
    default:
      dataLokasiTenant = lokasiTenant;
    // code block
  }
  // {
  //   id: 1,
  //   label: 'Fakultas Ilmu Terapan',
  //   value: 'Fakultas Ilmu Terapan',
  // },
  // {
  //   id: 2,
  //   label: 'Fakultas Teknik',
  //   value: 'Fakultas Teknik',
  // },
  // {
  //   id: 3,
  //   label: 'Fakultas Ekonomi dan Bisnis',
  //   value: 'Fakultas Ekonomi dan Bisnis',
  // },
  // {
  //   id: 4,
  //   label: 'Asrama Putra',
  //   value: 'Asrama Putra',
  // },
  // {
  //   id: 5,
  //   label: 'Asrama Putri',
  //   value: 'Asrama Putri',
  // },
  // {
  //   id: 6,
  //   label: 'Gedung Kuliah Umum',
  //   value: 'Gedung Kuliah Umum',
  // },
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.card}>
        <View>
          <Text style={styles.title}>
            {namaTenant} - {dataLokasiTenant}
          </Text>
          <Text style={styles.subtitle}>{totalMenu} Menu - Dine In </Text>
        </View>
        <Image
          source={{uri: `${ENDPOINT_SMART_CANTEEN}/storage/${image}`}}
          style={styles.avatar}
        />
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
