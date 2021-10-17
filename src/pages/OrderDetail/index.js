import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button, Gap, Header, ItemListFood, ItemValue} from '../../components';

const OrderDetail = ({navigation}) => {
  return (
    <ScrollView>
      <View style={styles.page}>
        <Header
          title="Payment"
          onBack
          subtTitle="You deserve better meal"
          onPress={() => navigation.goBack()}
        />
        <View style={styles.container}>
          <View>
            <ItemListFood type="product" items={3} totalOrder="20.000" />
          </View>
          <View style={styles.detailCard}>
            <Text style={styles.text}>Detail Transaction</Text>
            <ItemValue title="Subtotal" value="Rp18.00" />
            <ItemValue title="Tax 10%" value="Rp1.000" />
            <ItemValue title="Total Price" colorValue value="Rp19.000" />
            <Gap height={15} />
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.detailCard}>
            <Text style={styles.text}>Order Status</Text>
            <Gap height={15} />
            <ItemValue title="#68FLLWW" colorValue="#1ABC9C" value="Paid" />
            <Gap height={15} />
          </View>
        </View>

        <View style={styles.detailCard}>
          <Button
            label="Cancel My Order"
            color="#8D92A3"
            onPress={() => navigation.navigate('SecureCheckout')}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default OrderDetail;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  detailCard: {
    paddingHorizontal: 19,
    marginTop: 15,
  },
  container: {
    backgroundColor: 'white',
    marginTop: 15,
  },
  text: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    fontWeight: 'bold',
  },
});
