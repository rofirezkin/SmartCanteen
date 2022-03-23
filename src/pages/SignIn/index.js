import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  BackHandler,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Gap, Header, TextInput} from '../../components';
import {setLoading, useRequestLogin} from '../../redux/action';

import {
  ENDPOINT,
  ENDPOINT_API_SMART_CANTEEN,
  ENDPOINT_PROFILE,
  ENDPOINT_ROLE,
  useRequestWithToken,
} from '../../utils/API/httpClient';
import {setUser, storeData} from '../../utils/AsyncStoreServices';

import useForm from '../../utils/useForm';

const SignIn = ({navigation, route}) => {
  const {isLoading} = useSelector(state => state.loadingReducer);
  const {device_token} = useSelector(state => state.registerReducer);
  // const deviceToken = route.params;
  console.log('testing token nih ', device_token);

  const dispatch = useDispatch();
  const [form, setForm] = useForm({
    username: '',
    password: '',
  });

  // const onSubmit = async () => {
  //   dispatch(setLoading(true));

  //   const payload = JSON.stringify({
  //     username: form.username,
  //     password: form.password,
  //   });

  //   const result = await useRequestLogin(ENDPOINT, 'post', payload); // without token

  //   if (result.hasOwnProperty('message')) {
  //     // Handing Error
  //     dispatch(setLoading(false));
  //     Alert.alert('Oops!', result.message);
  //   } else {
  //     const resToken = await result.token;
  //     const issueProfile = await useRequestWithToken(
  //       ENDPOINT_PROFILE,
  //       resToken,
  //       'get',
  //     );

  //     const resultRole = await useRequestWithToken(
  //       ENDPOINT_ROLE,
  //       resToken,
  //       'get',
  //     );
  //     dispatch(setLoading(false));
  //     await setUser({
  //       token: resToken,
  //       token_expired: result.expired,
  //       role: resultRole[0].role,
  //       fullName: issueProfile.fullname,
  //       numberId: issueProfile.numberid,
  //       studyProgram: issueProfile.studyprogram,
  //       faculty: issueProfile.faculty,
  //       studentClass: issueProfile.studentclass,
  //       photo: issueProfile.photo,
  //       phone: issueProfile.phone,
  //       authenticated: true,
  //     });
  //     const userData = {
  //       nama: form.username,
  //       is_login: '1',
  //       device_token: device_token,
  //     };
  //     console.log('user data', userData);
  //     axios
  //       .post(`${ENDPOINT_API_SMART_CANTEEN}userapk`, userData)
  //       .then(res => {
  //         storeData('token', {value: res.data.data.access_token});
  //         storeData('userApk', {value: res.data.data.user});
  //         console.log('respon user apk', res);
  //         navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
  //       })
  //       .catch(err => {
  //         showMessage('Server Error, Harap Coba lagi nanti');
  //         console.log('errorr di bagian post userAPK', err);
  //       });
  //   }
  // };

  const onSubmit = async () => {
    dispatch(setLoading(true));

    const payload = JSON.stringify({
      username: form.username,
      password: form.password,
    });

    dispatch(
      useRequestLogin(
        ENDPOINT,
        'post',
        payload,
        Alert,
        device_token,
        navigation,
      ),
    ); // without token
  };

  const backAction = () => {
    if (isLoading !== true) {
      BackHandler.exitApp();
    }
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, [isLoading]);

  return (
    <View style={styles.page}>
      <Header
        title="Sign In"
        onPress={() => navigation.goBack()}
        subtTitle="Enter Your Username SSO And Password"
      />
      <View style={styles.container}>
        <TextInput
          label="Username SSO"
          placeholder="Type your Username SSO"
          value={form.email}
          onChangeText={value => setForm('username', value)}
        />

        <Gap height={16} />
        <TextInput
          value={form.password}
          onChangeText={value => setForm('password', value)}
          label="Password"
          placeholder="Type your password"
          secureTextEntry
        />
        <Gap height={24} />
        <Button label="Sign In" onPress={onSubmit} />
        <Gap height={13} />
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 18,
    paddingVertical: 26,
    marginTop: 24,
    flex: 1,
  },
});
