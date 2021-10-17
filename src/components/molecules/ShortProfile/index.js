import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {IcNotif, UserDummy} from '../../../assets';

const ShortProfile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.boxProfile}>
        <Image source={UserDummy} style={styles.avatar} />
        <View style={styles.textBox}>
          <Text style={styles.name}>Rita Hutami</Text>
          <Text style={styles.status}>Student</Text>
        </View>
      </View>
      <View>
        <IcNotif />
      </View>
    </View>
  );
};

export default ShortProfile;

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    alignItems: 'center',
  },
  boxProfile: {
    flexDirection: 'row',
  },
  textBox: {
    marginLeft: 12,
  },
  name: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
  },
  status: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
});
