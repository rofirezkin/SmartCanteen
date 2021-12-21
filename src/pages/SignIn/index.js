import React, {useState} from 'react';
import {useEffect} from 'react';
import {Alert, BackHandler, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Gap, Header, TextInput} from '../../components';
import {setLoading} from '../../redux/action';
import {
  ENDPOINT,
  ENDPOINT_PROFILE,
  ENDPOINT_ROLE,
  useRequestLogin,
  useRequestWithToken,
} from '../../utils/API/httpClient';
import {setUser} from '../../utils/AsyncStoreServices';
import useForm from '../../utils/useForm';

const SignIn = ({navigation}) => {
  const [form, setForm] = useForm({
    username: '',
    password: '',
  });
  const dispatch = useDispatch();
  const {isLoading} = useSelector(state => state.globalReducer);

  const onSubmit = async () => {
    dispatch(setLoading(true));

    const payload = JSON.stringify({
      username: form.username,
      password: form.password,
    });

    const result = await useRequestLogin(ENDPOINT, 'post', payload); // without token

    if (result.hasOwnProperty('message')) {
      // Handing Error
      dispatch(setLoading(false));
      Alert.alert('Oops!', result.message);
    } else {
      // Handling Success

      const resToken = await result.token;
      const issueProfile = await useRequestWithToken(
        ENDPOINT_PROFILE,
        resToken,
        'get',
      );
      const resultRole = await useRequestWithToken(
        ENDPOINT_ROLE,
        resToken,
        'get',
      );

      await setUser({
        token: resToken,
        token_expired: result.expired,
        role: resultRole[0].role,
        fullName: issueProfile.fullname,
        numberId: issueProfile.numberid,
        studyProgram: issueProfile.studyprogram,
        faculty: issueProfile.faculty,
        studentClass: issueProfile.studentclass,
        photo: issueProfile.photo,
        phone: issueProfile.phone,
        authenticated: true,
      });
      dispatch(setLoading(false));
      navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
    }
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
        <Button
          label={isLoading ? 'Loading...' : 'Sign In'}
          onPress={onSubmit}
          disabled={isLoading ? true : false}
        />
        <Gap height={13} />
        <Button
          label="Create New Account"
          color="#8D92A3"
          onPress={() => navigation.navigate('SignUp')}
        />
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
