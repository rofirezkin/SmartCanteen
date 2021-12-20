import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {
  Button,
  Gap,
  Header,
  ItemValue,
  ProfileFoodCourt,
} from '../../components';
import {fonts, getData} from '../../utils';

const UserProfile = ({navigation, route}) => {
  console.log('data', route.params);
  const globalReducer = route.params;
  return (
    <View style={styles.page}>
      <Header
        title="Akun Anda"
        onBack
        subtTitle="Lihat detail akun anda"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
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
        <Gap height={20} />
        <Text style={styles.title}>Student Profile</Text>

        <ItemValue
          profile
          title="Full Name"
          value={`: ${globalReducer.fullName}`}
        />
        <ItemValue
          profile
          title="Number Phone"
          value={`: ${globalReducer.phone}`}
        />

        <ItemValue
          profile
          title="Study Program"
          value={`: ${globalReducer.studyProgram}`}
        />
        <ItemValue profile title="NIM" value={`: ${globalReducer.numberId}`} />
      </View>
      <View style={styles.button}>
        <Button
          label="Edit Profie"
          onPress={() => navigation.navigate('Maintenance')}
        />
      </View>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    marginTop: 15,
    paddingHorizontal: 19,
    paddingVertical: 15,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 16,
    color: 'black',
    fontFamily: fonts.primary[500],
  },
  button: {
    marginTop: 15,
    paddingHorizontal: 19,
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
