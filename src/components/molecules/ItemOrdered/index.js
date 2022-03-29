import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Counter from '../../atoms/Counter';
import {DummyFoodCourt2} from '../../../assets';

const ItemOrdered = () => {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Image source={DummyFoodCourt2} style={styles.image} />
        <View style={styles.cardText}>
          <Text style={styles.title}>Ayam Bakar + Nasi</Text>
          <Text style={styles.subtitle}>Rp10.000</Text>
        </View>
      </View>
      <View style={styles.counter}>
        <Counter payment />
      </View>
    </View>
  );
};

export default ItemOrdered;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 19,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 1,
    paddingBottom: 8,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  item: {
    flexDirection: 'row',
  },
  cardText: {
    marginLeft: 10,
  },
  counter: {
    alignSelf: 'center',
  },
  title: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: '#8D92A3',
  },
});
