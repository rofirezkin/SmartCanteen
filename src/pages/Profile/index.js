import React, {useState} from 'react';
import {Alert, Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {PhotoProfileUser} from '../../assets';
import {Button, Gap, ProfileTabSection} from '../../components';
import {device} from '../../data';

import NotifService from '../../utils/notification/NotifService';

const Profile = () => {
  const {globalReducer} = useSelector(state => state);

  return (
    <View style={styles.page}>
      <View style={styles.profileDetail}>
        <View style={styles.photo}>
          <View style={styles.borderPhoto}>
            <Image
              source={{uri: globalReducer.photo}}
              style={styles.photoContainer}
            />
          </View>
        </View>
        <Text style={styles.name}>{globalReducer.fullName}</Text>
        <Text style={styles.status}>{globalReducer.role}</Text>
      </View>
      <Gap height={15} />
      <View style={styles.container}>
        <ProfileTabSection />

        <Gap height={20} />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  page: {
    flex: 1,
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
  profileDetail: {
    backgroundColor: 'white',
    paddingBottom: 26,
  },

  photoContainer: {
    width: 90,
    height: 90,
    borderRadius: 90,
    backgroundColor: '#F0F0F0',
    padding: 24,
  },
  container: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  status: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#8D92A3',
    textAlign: 'center',
  },
});
