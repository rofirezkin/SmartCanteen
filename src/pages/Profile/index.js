import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {PhotoProfileUser} from '../../assets';
import {Gap, ProfileTabSection} from '../../components';

const Profile = () => {
  return (
    <View style={styles.page}>
      <View style={styles.profileDetail}>
        <View style={styles.photo}>
          <View style={styles.borderPhoto}>
            <Image source={PhotoProfileUser} style={styles.photoContainer} />
          </View>
        </View>
        <Text style={styles.name}>Rita Hutami</Text>
        <Text style={styles.status}>Mahasiswa</Text>
      </View>
      <Gap height={15} />
      <View style={styles.container}>
        <ProfileTabSection />
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
