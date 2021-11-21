import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Header, OrderList} from '../../components';

const MyCart = ({navigation}) => {
  return (
    <View style={styles.page}>
      <Header
        title="My Order List"
        subtTitle="contains your shopping cart"
        onBack
        onPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <OrderList />
        <OrderList />
      </View>
    </View>
  );
};

export default MyCart;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    marginTop: 15,
    paddingVertical: 20,

    flex: 1,
    backgroundColor: 'white',
  },
});
