import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {IcNotif, UserDummy} from '../../../assets';
import { normalizeFont } from '../../../utils/normalizeFont';

const ShortProfile = ({fullName,role,url}) => {

  return (
    <View style={styles.container}>
      <View style={styles.boxProfile}>
        <Image source={{ uri: url }} style={styles.avatar} />
        <View style={styles.textBox}>
          <Text style={styles.name}>{fullName}</Text>
          <Text style={styles.status}>{role}</Text>
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
    fontSize: normalizeFont(12),
    width: 200,
  },
  status: {
    fontSize: normalizeFont(11),
    fontFamily: 'Poppins-Bold',
  },
});
