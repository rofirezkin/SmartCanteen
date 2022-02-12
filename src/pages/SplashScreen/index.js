import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {LogoSmartCanteen} from '../../assets';
import {getUser} from '../../utils/AsyncStoreServices';
import NotifService from '../../utils/notification/NotifService';

const SplashScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [registerToken, setRegisterToken] = useState('');
  const [fcmRegistered, setFcmRegistered] = useState(false);

  const onRegister = token => {
    setRegisterToken(token.token);
    setFcmRegistered(true);
  };
  const onNotif = notif => {
    Alert.alert(notif.title, notif.message);
  };

  const notif = new NotifService(onRegister, onNotif);
  const handlePerm = perms => {
    Alert.alert('permission', JSON.stringify(perms));
  };

  console.log('device token ', registerToken);

  dispatch({
    type: 'SET_DEVICE_TOKEN',
    value: registerToken,
  });
  const checkAuth = async () => {
    const user = await getUser();
    const isAuth = user.authenticated;

    return isAuth !== false
      ? navigation.reset({index: 0, routes: [{name: 'MainApp'}]})
      : navigation.replace('SignIn');
  };

  useEffect(() => {
    checkAuth();
  }, [registerToken]);

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
