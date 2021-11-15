import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {Button, Gap, Header, TextInput} from '../../components';
import {apiUtils, useForm} from '../../utils';
import { ENDPOINT, useRequest, useRequestLogin } from '../../utils/API/httpClient';
import { setUser } from '../../utils/AsyncStoreServices';
import { skeletonSignIn } from '../../components/skeleton/skeletonSignIn';

const SignIn = ({navigation}) => {
  const [form, setForm] = useForm({
    username: '',
    password: '',
  });

  const[loading,setLoading] = useState(false);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false)
  //   },2000)
  // },[])

  const onSubmit =  async () => {
    setLoading(true)

    const payload = {
      username: form.username,
      password: form.password
    }

    const result = await useRequest(ENDPOINT,'post',payload) // without token
    console.log('res', result)

    if(result.hasOwnProperty('message')){
      // error command
      setLoading(false)
      Alert.alert('Oops!', result.message)
    }else{
      // success command
      setLoading(false)
    }
  };

  return (

    <View style={styles.page}>
      <Header
        title="Sign In"
        onBack={() => {}}
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
          label={loading ? 'Loading...' : 'Sign In'}
          onPress={onSubmit}
          disabled={loading ? true : false} 
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
