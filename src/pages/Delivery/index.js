import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button, DropOffLocation, Gap, Header} from '../../components';

const Delivery = ({navigation}) => {
  return (
    <ScrollView>
      <View style={styles.page}>
        <Header
          title="Drop Off Location"
          subtTitle="Select your drop off location"
          onBack
          onPress={() => navigation.goBack()}
        />

        <View style={styles.container}>
          <DropOffLocation label="Gedung Kuliah Umum (GKU)" />
          <DropOffLocation label="Fakultas Ilmu Terapan (FIT)" />
          <DropOffLocation label="Fakultas Ekonomi dan Bisnis (FEB)" />
          <DropOffLocation label="Fakultas Ekonomi dan Bisnis (FIK)" />
          <DropOffLocation label="Fakultas Teknik (FT)" />
          <DropOffLocation label="Gedung Asrama Putra" />
          <DropOffLocation label="Gedung Asrama Putri" />
          <Gap height={15} />
          <Button
            label="Confirm Your Location"
            onPress={() => navigation.navigate('Canteen')}
          />
          <Gap height={15} />
        </View>
      </View>
    </ScrollView>
  );
};

export default Delivery;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    marginTop: 15,
    paddingHorizontal: 19,
    flex: 1,
    backgroundColor: 'white',
  },
  button: {
    paddingHorizontal: 19,
  },
});
