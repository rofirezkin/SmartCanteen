import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import Gap from '../../atoms/Gap';
import {ICCArtHome, ICCartShopping, IcNotif, UserDummy} from '../../../assets';
import {normalizeFont} from '../../../utils/normalizeFont';

const ShortProfile = ({fullName, role, url}) => {
  const navigation = useNavigation();

  const {allCart} = useSelector(state => state.cartItems);

  const convertData = () => {
    if (allCart) {
      const data = [];
      Object.keys(allCart).map(key => {
        data.push({
          id: key,
          data: allCart[key],
        });
      });
      return data;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.boxProfile}>
        <Image source={{uri: url}} style={styles.avatar} />
        <View style={styles.textBox}>
          <Text style={styles.name}>{fullName}</Text>
          <Text style={styles.status}>{role}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 7,
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('MyCart')}>
          <Image source={ICCArtHome} style={styles.carthome} />
          {convertData() !== undefined && (
            <>
              {convertData().length > 0 && (
                <View
                  style={{
                    width: 13,
                    height: 13,
                    backgroundColor: '#FEA34F',
                    position: 'absolute',
                    borderRadius: 13 / 2,
                    bottom: 2,
                  }}
                />
              )}
            </>
          )}
        </TouchableOpacity>
        <Gap width={20} />
        {/* <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
          <IcNotif />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default ShortProfile;

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    alignItems: 'center',
  },
  boxProfile: {
    flexDirection: 'row',
  },
  textBox: {
    marginLeft: 12,
  },
  name: {
    fontFamily: 'Poppins-Medium',
    fontSize: normalizeFont(12),
    width: 200,
  },
  status: {
    fontSize: normalizeFont(11),
    fontFamily: 'Poppins-Bold',
  },
  carthome: {
    width: 25,
    height: 25,
  },
});
