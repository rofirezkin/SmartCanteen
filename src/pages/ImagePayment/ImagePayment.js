import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Header} from '../../components';

const ImagePayment = ({navigation}) => {
  return (
    <View style={styles.page}>
      <Header
        title="Proof of payment"
        onBack
        subtTitle="You deserve better meal"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <Text>ImagePayment</Text>
      </View>
    </View>
  );
};

export default ImagePayment;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    marginTop: 15,
    paddingHorizontal: 20,
  },
});
