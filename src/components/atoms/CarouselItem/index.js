import React from 'react';
import {View, StyleSheet, Text, Image, Dimensions} from 'react-native';
import {Gap} from '..';

const {width, height} = Dimensions.get('window');

const CarouselItem = ({item}) => {
  return (
    <View style={styles.cardView}>
      {/* <GetStartedOne /> */}
      {item.url}
      <View style={styles.textView}>
        <Gap height={20} />
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardView: {
    flex: 1,
    width: width,
    height: height / 2,

    justifyContent: 'center',
    alignItems: 'center',
  },

  itemTitle: {
    fontSize: 22,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
  itemDescription: {
    fontSize: 12,

    textAlign: 'center',
  },
});

export default CarouselItem;
