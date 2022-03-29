import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {ICCart} from '../../assets';
import {
  Button,
  CustomTab,
  DecisionUser,
  Gap,
  Header,
  ListFoodCourt,
  ProfileFoodCourt,
  ShoppingCart,
} from '../../components';

const ChooseFood = ({navigation, route}) => {
  const {allCart} = useSelector(state => state.cartItems);
  const params = route.params;
  const idTenant = params.id;
  console.log('iniii tuh di cohoho', params);
  console.log('data allcart chose', allCart);

  const calculationData = type => {
    if (allCart[idTenant]) {
      let sumDataTotalOrder = 0;
      let sumDataTotalItem = 0;
      const dataTotal = allCart[idTenant].data;
      for (let i = 0; i < dataTotal.length; i++) {
        sumDataTotalOrder += dataTotal[i].totalOrder;
        sumDataTotalItem += dataTotal[i].totalItem;
      }
      if (type == 'totalOrder') {
        return sumDataTotalOrder;
      } else if (type == 'totalItem') {
        return sumDataTotalItem;
      }
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView>
        <View style={styles.page}>
          <Header
            onPress={() => navigation.goBack()}
            title="Choose Food"
            subtTitle={`Canteen ${params.lokasi_kantin}`}
            onBack
          />
          <View style={styles.container}>
            <ProfileFoodCourt
              image={params.profile_photo_path}
              nameCanteen={params.nama_tenant}
              ingredients={params.desc_kantin}
              number={params.rating}
            />

            {/* <DecisionUser /> */}
          </View>
          <View style={styles.tabContainer}>
            {/* <TabViewFoodCourt /> */}
            {/* <CustomTab id_tenant={idTenant} /> */}
          </View>
        </View>
        <View style={{flex: 1}}>
          <View style={styles.tabContainer}>
            {/* <TabViewFoodCourt /> */}
            <CustomTab
              nama_tenant={params.nama_tenant}
              lokasi_kantin={params.lokasi_kantin}
              qr_string={params.qr_string}
              id_tenant={idTenant}
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.button}>
        {allCart[idTenant] && (
          <ShoppingCart
            onPress={() =>
              navigation.navigate('OrderSummary', allCart[idTenant])
            }
            TotalOrder={calculationData('totalOrder')}
            totalItem={calculationData('totalItem')}
          />
        )}
      </View>
    </View>
  );
};

export default ChooseFood;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 18,
    paddingTop: 20,
  },
  tabContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 45,
    height: '100%',
  },
  button: {
    position: 'absolute',
    bottom: 19,
    width: '100%',
  },
  buttonTab: {
    backgroundColor: '#2FAD24',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  textButton: {
    textAlignVertical: 'center',
    color: 'white',
    fontFamily: 'Poppins-Regular',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});
