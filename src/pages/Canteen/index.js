import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {DummyCanteen, DummyFood2} from '../../assets';
import {DetailCanteen, Gap, Header} from '../../components';

const Canteen = ({navigation}) => {

  var nameCanteen = ''
  return (
    <ScrollView>
      <View style={styles.page}>
        <Header
          onBack
          title="Canteen"
          subtTitle="Pick your canteen location"
          onPress={() => navigation.goBack()}
        />
        <Gap height={15} />
        <View style={styles.container}>
          <Text style={styles.titleCanteen}>
            Welcome to Tel-U Canteen, pick your location
          </Text>
          <DetailCanteen
            name="Kantin Fakultas Ilmu Terapan"
            avatar={DummyFood2}
            onPress={
              // type === 'dine-in'
              //   ? () => navigation.navigate('Reservation')
              //   : type === 'take-away'
              //   ? () => navigation.navigate('FoodCourt')
              //   : () => navigation.navigate('Reservation')
              () => navigation.navigate('FoodCourt', nameCanteen="Fakultas Ilmu Terapan")
            }
          />
          <DetailCanteen 
              avatar={DummyCanteen}
              onPress={
                 () => navigation.navigate('FoodCourt', nameCanteen="Fakultas Ilmu Terapanzzz")
              }
               />
          <DetailCanteen avatar={DummyFood2} />
        </View>
        <Gap height={20} />
      </View>
    </ScrollView>
  );
};

export default Canteen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 20,
    backgroundColor: 'white',
    paddingTop: 13,
    flex: 1,
  },
  titleCanteen: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#8D92A3',
  },
});
