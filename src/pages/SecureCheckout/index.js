import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, CardChekout, Gap, Header, ItemRadio} from '../../components';

const SecureCheckout = ({navigation}) => {
  return (
    <View style={styles.page}>
      <Header
        title="Secure Checkout"
        onBack
        onPress={() => navigation.goBack()}
        subtTitle="You deserve better meal"
      />
      <View style={styles.container}>
        <CardChekout />
        <Gap height={15} />
        <Text style={styles.text}>Payment Method</Text>
        <View>
          <ItemRadio />
        </View>
        <Gap height={15} />
        <Button label="Pay Now" onPress={() => navigation.navigate('Cash')} />
      </View>
    </View>
  );
};

export default SecureCheckout;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    paddingTop: 15,
    flex: 1,
    marginTop: 15,
    paddingHorizontal: 19,
    backgroundColor: 'white',
  },
  text: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
});
