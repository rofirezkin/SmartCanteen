import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {DummyList1, Next} from '../../../assets';
import Number from '../../../utils/Number/Number';
import Rating from '../Rating';

const ItemListFood = ({
  onPress,
  name,
  ingredients,
  canteen,
  date,
  price,
  statusOrder,
  type,
  items,
  totalOrder,
  urlPhoto,
  rating,
  status,
}) => {
  const renderContent = () => {
    switch (type) {
      case 'product':
        return (
          <View style={styles.container}>
            <View>
              <Text style={styles.title}>{name}</Text>
              <Text style={styles.subTitle}>{ingredients}</Text>
              <Text style={styles.subTitle}>{canteen}</Text>

              <Text style={styles.subTitle}>
                <Number style={styles.subTitle} number={totalOrder} />
              </Text>
            </View>
          </View>
        );

      case 'in-progress':
        return (
          <View style={styles.container}>
            <View style={{flex: 1}}>
              <Text style={styles.title}>{name}</Text>
              <Text style={styles.subTitle}>{ingredients}</Text>
              <Text style={styles.statusInProgress}>{status}</Text>
              <Text style={styles.subTitle}>
                {items} Item . Rp{totalOrder}
              </Text>
            </View>
            <View>
              <Next />
            </View>
          </View>
        );

      case 'past-orders':
        return (
          <View style={styles.container}>
            <View>
              <Text style={styles.title}>{name}</Text>
              <Text style={styles.subTitle}>{ingredients}</Text>

              <Text style={styles.subTitle}>
                {items} Item . Rp{totalOrder}
              </Text>
              <View>
                <Text style={styles.statusOrder(status)}>{status}</Text>
              </View>
            </View>
          </View>
        );
      default:
        return (
          <View style={styles.container}>
            <View>
              <Text style={styles.title}>{name}</Text>
              <Text style={styles.subTitle}>{ingredients}</Text>
              <Text style={styles.subTitle}>{canteen}</Text>
              <Number style={styles.subTitle} number={price} />
            </View>
            <View>
              <Rating ratingCard rating={rating} />
            </View>
          </View>
        );
      //item product
    }
  };
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View style={styles.tabview}>
        <Image source={{uri: urlPhoto}} style={styles.avatar} />
        {renderContent()}
      </View>
    </TouchableOpacity>
  );
};

export default ItemListFood;

const styles = StyleSheet.create({
  tabview: {
    backgroundColor: 'white',
    paddingHorizontal: 18,
    paddingVertical: 9,
    alignItems: 'center',
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 8,
    overflow: 'hidden',
  },
  title: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: 'black',
  },
  statusInProgress: {
    color: '#00A61B',
  },
  subTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    flex: 1,
    color: '#8D92A3',
  },
  container: {
    marginLeft: 10,

    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  statusOrder: status => ({
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: status === 'CANCEL ORDER' ? '#D9435E' : '#1ABC9C',
  }),
});
