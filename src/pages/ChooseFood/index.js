import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ICCart} from '../../assets';
import {
  Button,
  CustomTab,
  DecisionUser,
  Gap,
  Header,
  ListFoodCourt,
  ProfileFoodCourt,
} from '../../components';
import ShoppingCart from '../../components/molecules/ShoppingCart/ShoppingCart';

const ChooseFood = ({navigation, route}) => {

  const params = route.params;
  const idTenant = params.id
  console.log(params)

  return (
    <View style={{flex: 1}}>
      
        <View style={styles.page}>
          <Header
            onPress={() => navigation.goBack()}
            title="Choose Food"
            subtTitle={`Canteen ${params.lokasi_kantin}`}
            onBack
          />
          <View style={styles.container}>
            <ProfileFoodCourt
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
        <View style={{ flex: 1 }}>
          <View style={styles.tabContainer}>
            {/* <TabViewFoodCourt /> */}
            <CustomTab id_tenant={idTenant} />
          </View>
        </View>
     
      <View style={styles.button}>
          <ShoppingCart />
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
