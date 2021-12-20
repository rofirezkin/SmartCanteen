import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Gap, Header, Select, TextInput} from '../../components';

const SignUpAddress = ({navigation}) => {
  return (
    <View style={styles.page}>
      <Header
        title="Address"
        onPress={() => navigation.goBack()}
        subtTitle="Testing Signup"
        onBack={() => {}}
      />
      <View style={styles.container}>
        <TextInput label="Phone Number" placeholder="Type your phone number" />
        <Gap height={16} />
        <TextInput label="NIM/NIP" placeholder="Type your NIM" />
        <Gap height={16} />
        <Select label="Status" value={'hali'} onValueChange={'dff'}  />
        <Gap height={24} />
        <Button
          label="Sign Up Now"
          onPress={() => navigation.replace('SuccessSignUp')}
        />
        <Gap height={13} />
      </View>
    </View>
  );
};

export default SignUpAddress;

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
