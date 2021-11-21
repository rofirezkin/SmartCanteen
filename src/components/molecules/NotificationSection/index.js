import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {DummyFood1} from '../../../assets';

const NotificationSection = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={DummyFood1} style={styles.avatar} />
        <View style={styles.cardText}>
          <Text>Dikonfirmasi</Text>
          <Text>menu ID-201 sedang di proses, Tunggu untuk pengirimannya </Text>
        </View>
      </View>
    </View>
  );
};

export default NotificationSection;

const styles = StyleSheet.create({
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  container: {
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  card: {
    flexDirection: 'row',
    paddingHorizontal: 19,
  },
  cardText: {
    flex: 1,
  },
});
