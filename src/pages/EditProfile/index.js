import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {ICAddPhoto} from '../../assets';
import {Button, Gap, Header, TextInput} from '../../components';

const EditProfile = ({navigation}) => {
  return (
    <ScrollView>
      <View style={styles.page}>
        <Header
          title="Edit Profile"
          onBack
          subtTitle="Edit and Save"
          onPress={() => navigation.goBack()}
        />
        <View style={styles.container}>
          <View style={styles.photo}>
            <View style={styles.borderPhoto}>
              <View style={styles.photoContainer}>
                <Text style={styles.addPhoto}>Add Photo</Text>
              </View>
              <View style={styles.icAddPhoto}>
                <ICAddPhoto />
              </View>
            </View>
          </View>
          <View>
            <TextInput label="Full Name" placeholder="type your full name" />
            <Gap height={20} />
            <TextInput
              label="Email Address"
              placeholder="Type your email address"
            />
            <Gap height={20} />
            <TextInput label="Status" placeholder="Type your email address" />
            <Gap height={20} />
            <TextInput label="Your Password" placeholder="Type your password" />
            <Gap height={20} />
            <TextInput
              label="New Password"
              placeholder="Type your new password"
            />
            <Gap height={20} />
            <TextInput
              label="Confirmation Password"
              placeholder="Type your confirmation password"
            />
            <Gap height={20} />
            <Button
              label="Save Profile"
              onPress={() =>
                navigation.reset({
                  index: 0,
                  routes: [{name: 'MainApp'}],
                })
              }
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    marginTop: 15,
    paddingVertical: 15,
    paddingHorizontal: 19,
    backgroundColor: 'white',
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
  photoContainer: {
    width: 90,
    height: 90,
    borderRadius: 90,
    backgroundColor: '#F0F0F0',
    padding: 24,
  },
  icAddPhoto: {position: 'absolute', bottom: 8, right: 1},
});
