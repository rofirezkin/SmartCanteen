import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Counter, Gap, Like, Price} from '../..';
import {DummyFoodCourt2} from '../../../assets';

const ListFoodCourt = ({type}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Chicken Katsu</Text>
          <Text style={styles.statusFood}>Available</Text>
        </View>
        <Text style={styles.description}>
          Nasi, Telur, Ayam, sambal dan jeruk
        </Text>
        <Price />
        <View>
          {type ? (
            <View style={styles.subBox}>
              <Text style={styles.description}>FoodCourt A</Text>
              <Gap width={10} />
              <Like />
            </View>
          ) : (
            <>
              <Like />
            </>
          )}
        </View>
      </View>
      <View>
        <Image source={DummyFoodCourt2} style={styles.image} />
        <View>
          <Counter onPress={() => navigation.navigate('Payment')} />
        </View>
      </View>
    </View>
  );
};

export default ListFoodCourt;

const styles = StyleSheet.create({
  image: {
    width: 73,
    height: 60,
    resizeMode: 'cover',
    borderRadius: 13,
  },
  titleContainer: {
    flexDirection: 'row',
  },
  title: {
    fontFamily: 'Poppins-Medium',
    color: 'black',
    fontSize: 16,
    marginRight: 10,
  },
  statusFood: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#2B9F61',
    textAlignVertical: 'center',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 21,
    paddingVertical: 12,
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 1,
  },
  description: {
    color: '#8D92A3',
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
  },
  subBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
});
