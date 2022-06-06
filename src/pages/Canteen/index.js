import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {DummyCanteen, DummyFood2} from '../../assets';
import {DetailCanteen, Gap, Header} from '../../components';
import {lokasiKantin} from '../../data';

const Canteen = ({navigation, route}) => {
  const dispatch = useDispatch();
  var nameCanteen = '';
  const method = {
    method: route.params,
  };

  console.log(lokasiKantin);

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
          {lokasiKantin.map((res, index) => {
            return (
              <DetailCanteen
                key={`${res.title}-${index}`}
                name={res.title}
                avatar={res.img}
                onPress={() =>
                  navigation.navigate('FoodCourt', (nameCanteen = res.title))
                }
              />
            );
          })}
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
