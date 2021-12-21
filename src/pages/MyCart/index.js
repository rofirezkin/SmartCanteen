import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Header, OrderList} from '../../components';
import {getData} from '../../utils/AsyncStoreServices';

const MyCart = ({navigation}) => {
  const dispatch = useDispatch();
  const {allCart} = useSelector(state => state.cartItems);

  console.log('my car', allCart);
  const convertData = () => {
    if (allCart) {
      const data = [];
      Object.keys(allCart).map(key => {
        data.push({
          id: key,
          data: allCart[key],
        });
      });
      return data;
    }
  };

  return (
    <View style={styles.page}>
      <Header
        title="My Order List"
        subtTitle="contains your shopping cart"
        onBack
        onPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        {convertData().map(res => {
          return (
            <OrderList
              status={res.data.data[0].status}
              image={res.data.picturePath}
              onPress={() => navigation.navigate('OrderSummary', res.data)}
              key={res.id}
              namaTenant={res.data.nama_tenant}
              lokasiTenant={res.data.lokasi_kantin}
              totalMenu={res.data.data.length}
            />
          );
        })}
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
