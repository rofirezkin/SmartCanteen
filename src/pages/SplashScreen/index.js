import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {LogoSmartCanteen} from '../../assets';
import {getData, getUser} from '../../utils/AsyncStoreServices';
import NotifService from '../../utils/notification/NotifService';

const SplashScreen = ({navigation}) => {
  const checkAuth = async () => {
    getData('token').then(res => {
      console.log('token', res);
      if (res) {
        navigation.reset({
          index: 0,
          routes: [{name: 'MainApp'}],
        });
      } else {
        navigation.reset({index: 0, routes: [{name: 'SignIn'}]});
      }
    });
  };

  useEffect(() => {
    setTimeout(() => {
      checkAuth();
    }, 3000);
  }, []);

  return (
    <View style={styles.page}>
      <Image source={LogoSmartCanteen} style={styles.logo} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ED212B',
  },
  text: {
    color: 'white',
    fontSize: 23,
    fontFamily: 'Poppins-Medium',
  },
  logo: {
    width: 215,
    height: 86,
  },
});
