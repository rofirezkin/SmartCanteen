import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Gap, Header, ItemOrdered, ItemValue} from '../../components';

const Payment = ({navigation}) => {
  return (
    <View style={styles.page}>
      <Header
        title="Payment"
        subtTitle="You deserve better meal"
        onBack
        onPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <ItemOrdered />
        <ItemOrdered />
        <ItemOrdered />
        <View style={styles.detailCard}>
          <Text>Detail Transaction</Text>
          <ItemValue title="Subtotal" value="Rp18.00" />
          <ItemValue title="Tax 10%" value="Rp1.000" />
          <ItemValue title="Total Price" colorValue value="Rp19.000" />
          <Gap height={15} />
          <Button
            label="Checkout Now"
            onPress={() => navigation.navigate('SecureCheckout')}
          />
        </View>
      </View>
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FAFAFC',
    flex: 1,
  },
  container: {
    backgroundColor: 'white',
    marginTop: 10,
    paddingTop: 10,
  },
  detailCard: {
    paddingHorizontal: 19,
    marginTop: 15,
  },
});
