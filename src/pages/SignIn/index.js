import {Axios} from 'axios';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Gap, Header, TextInput} from '../../components';
import {useForm} from '../../utils';

const SignIn = ({navigation}) => {
  const [form, setForm] = useForm({
    email: '',
    password: '',
  });

  const onSubmit = () => {
    console.log('email', form);
    Axios.post('//', form)
      .then(res => {
        console.log('success', res);
      })
      .catch(err => {});
  };

  return (
    <View style={styles.page}>
      <Header
        title="Sign In"
        onBack={() => {}}
        onPress={() => navigation.goBack()}
        subtTitle="Enter Your Email And Password"
      />
      <View style={styles.container}>
        <TextInput
          label="Email Address"
          placeholder="Type your email address"
          value={form.email}
          onChangeText={value => setForm('email', value)}
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
