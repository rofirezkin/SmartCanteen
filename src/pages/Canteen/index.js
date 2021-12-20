import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {DummyCanteen, DummyFood2} from '../../assets';
import {DetailCanteen, Gap, Header} from '../../components';

const Canteen = ({navigation, route}) => {
  const dispatch = useDispatch();
  var nameCanteen = '';
  const method = {
    method: route.params,
  };

  dispatch({type: 'SET_OPTION_USER', value: method});
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
            onPress={() =>
              navigation.navigate(
                'FoodCourt',
                (nameCanteen = 'Fakultas Ilmu Terapan'),
              )
            }
          />
          <DetailCanteen
            avatar={DummyCanteen}
            name="Fakultas Teknik"
            onPress={() =>
              navigation.navigate(
                'FoodCourt',
                (nameCanteen = 'Fakultas Teknik'),
              )
            }
          />
          <DetailCanteen
            avatar={DummyFood2}
            name="Fakultas Ekonomi dan Bisnis"
            onPress={() =>
              navigation.navigate(
                'FoodCourt',
                (nameCanteen = 'Fakultas Ekonomi dan Bisnis'),
              )
            }
          />
          <DetailCanteen
            avatar={DummyCanteen}
            name="Asrama Putra"
            onPress={() =>
              navigation.navigate('FoodCourt', (nameCanteen = 'Asrama Putra'))
            }
          />
          <DetailCanteen
            avatar={DummyCanteen}
            name="Asrama Putri"
            onPress={() =>
              navigation.navigate('FoodCourt', (nameCanteen = 'Asrama Putri'))
            }
          />
          <DetailCanteen
            avatar={DummyCanteen}
            name="Gedung Kuliah Umum"
            onPress={() =>
              navigation.navigate(
                'FoodCourt',
                (nameCanteen = 'Gedung Kuliah Umum'),
              )
            }
          />
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
