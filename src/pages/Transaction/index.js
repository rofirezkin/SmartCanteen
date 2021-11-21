import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {EmptyOrder, Header, OrderTabSection} from '../../components';

const Transaction = () => {
  const [isEmpty] = useState(false);
  return (
    <View style={styles.page(isEmpty)}>
      {isEmpty ? (
        <EmptyOrder />
      ) : (
        <View style={styles.order}>
          <Header title="Your Orders" subtTitle="Wait for the best meal" />
          <View style={styles.container}>
            <OrderTabSection />
          </View>
        </View>
      )}
    </View>
  );
};

export default Transaction;

const styles = StyleSheet.create({
  page: isEmpty => ({
    flex: 1,
    justifyContent: isEmpty ? 'center' : 'flex-start',
  }),
  order: {
    flex: 1,
  },

  container: {
    marginTop: 15,

    backgroundColor: 'white',
    flex: 1,
  },
});
