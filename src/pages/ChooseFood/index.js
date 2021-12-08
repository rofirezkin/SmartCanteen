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
        {/* <TouchableOpacity
          style={styles.buttonTab}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Payment')}>
          <View style={{flexDirection: 'row'}}>
            <ICCart />
            <Text style={styles.textButton}>3 Items Rp20.000</Text>
          </View>
          <Text style={styles.textButton}>Order Now</Text>
        </TouchableOpacity> */}
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
    paddingBottom: 20,
    height: '100%',
  },
  button: {
    bottom: 20,
    paddingHorizontal: 19,
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
