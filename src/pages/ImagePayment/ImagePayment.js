import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Header} from '../../components';

const ImagePayment = ({navigation, route}) => {
  const imageProofPayment = route.params;
  console.log('testing proof payment', imageProofPayment);
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.page}>
        <Header
          title="Proof of payment"
          onBack
          subtTitle="You deserve better meal"
          onPress={() => navigation.goBack()}
        />
        <View style={styles.container}>
          <Image
            source={{uri: imageProofPayment}}
            style={{width: '100%', height: '100%', resizeMode: 'contain'}}
          />
        </View>
      </View>
    </ScrollView>
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
