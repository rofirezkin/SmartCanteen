import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {Button, Gap, Header, TextInput} from '../../components';

const SignUp = ({navigation}) => {
  const globalState = useSelector(state => state.globalReducer);
  console.log('reducer', globalState);

  return (
    <View style={styles.page}>
      <Header
        title="Sign Up"
        onPress={() => navigation.goBack()}
        subtTitle="Testing Signup"
        onBack={() => {}}
      />
      <View style={styles.container}>
        <View style={styles.photo}>
          <View style={styles.borderPhoto}>
            <View style={styles.photoContainer}>
              <Text style={styles.addPhoto}>Add Photo</Text>
            </View>
          </View>
        </View>
        <Text>{`status error: ${globalState.isError}`}</Text>
        <TextInput label="Full Name" placeholder="Type your email address" />
        <Gap height={16} />
        <TextInput
          label="Email Address"
          placeholder="Type your Email address"
        />
        <Gap height={16} />
        <TextInput label="Password" placeholder="Type your password" />
        <Gap height={24} />
        <Button
          label="Continue"
          onPress={() => navigation.navigate('SignUpAddress')}
        />
        <Gap height={13} />
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  addPhoto: {
    fontSize: 14,
    fontFamily: 'Poppins-Light',
    color: '#8D92A3',
    textAlign: 'center',
  },
  photo: {
    alignItems: 'center',
    marginTop: 26,
    marginBottom: 16,
  },
  borderPhoto: {
    borderWidth: 1,
    borderColor: '#8D92A3',
    width: 110,
    height: 110,
    borderRadius: 110,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 18,
    paddingVertical: 26,
    marginTop: 24,
    flex: 1,
  },
  photoContainer: {
    width: 90,
    height: 90,
    borderRadius: 90,
    backgroundColor: '#F0F0F0',
    padding: 24,
  },
});
