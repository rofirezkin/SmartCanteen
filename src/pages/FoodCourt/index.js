import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {IcBackFoodCourt, ILFoodCourt} from '../../assets';
import {DetailFoodCourt, Gap, Header, SearchInput} from '../../components';

const FoodCourt = ({navigation}) => {
  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <View style={styles.page}>
        <Image source={ILFoodCourt} style={styles.illustration} />
        <View style={styles.back}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.5}>
            <IcBackFoodCourt />
          </TouchableOpacity>
        </View>
        <Gap height={20} />
        <View style={styles.container}>
          <SearchInput />
          <Gap height={10} />
          <Text style={styles.title}>Welcome to A-Canteen Food Court!</Text>
        </View>
        <View style={styles.listFoodcourt}>
          <DetailFoodCourt onPress={() => navigation.navigate('ChooseFood')} />
          <DetailFoodCourt />
          <DetailFoodCourt />
          <DetailFoodCourt />
        </View>
      </View>
    </ScrollView>
  );
};

export default FoodCourt;

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    flex: 1,
  },
  illustration: {
    height: 142,
    width: '100%',
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: 'black',
  },
  container: {
    paddingHorizontal: 18,
  },
  back: {
    position: 'absolute',
    padding: 18,
  },
});
