import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {LogoSmartCanteen} from '../../assets';
import { getUser } from '../../utils/AsyncStoreServices';

const SplashScreen = ({navigation}) => {
  const[loading,setLoading] = useState(false)
  const checkAuth = async () => {
      const user = await getUser();
      const isAuth = user.authenticated;

      return isAuth !== false ? navigation.reset({index: 0, routes:[{name: 'MainApp'}]}) : navigation.replace('SignIn')
  }

  useEffect(() => {
      checkAuth()
  },[])

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
    backgroundColor: '#F05A61',
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
