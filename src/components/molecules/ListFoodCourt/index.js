import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Gap from '../../atoms/Gap';
import Like from '../../atoms/Like';
import Price from '../../atoms/Price';
import {ENDPOINT_SMART_CANTEEN} from '../../../utils/API/httpClient';

const ListFoodCourt = ({
  id,
  onPress,
  idTenant,
  type,
  name,
  ingredients,
  price,
  status,
  textColor = '#2B9F61',
  imagePath,
}) => {
  const [item, setItem] = useState();
  const [value, setValue] = useState();

  const onValueParsing = value => {
    const formData = {
      id_menu: id,
      id_tenant: idTenant,
      quantity: value,
    };

    value != 0 ? console.log(formData) : null;
  };

  useEffect(() => {}, []);

  const renderMenu = () => {
    if (status === 'Tersedia') {
      return (
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.6}
          style={styles.container}>
          <View>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{name}</Text>
              <Text style={styles.statusFood(textColor)}>Available</Text>
            </View>
            <Text style={styles.description}>{ingredients}</Text>
            <Price price={price} />
            <View style={{flexDirection: 'row'}}>
              <View>
                {type ? (
                  <View style={styles.subBox}>
                    <Text style={styles.description}>FoodCourt A</Text>
                    <Gap width={10} />
                    <Like />
                  </View>
                ) : (
                  <>{/* <Like /> */}</>
                )}
              </View>
              {/* <View>
                      <Counter addItem order onValueChange={onValueParsing} />
                    </View> */}
            </View>
          </View>
          <View>
            <Image
              source={{uri: `${ENDPOINT_SMART_CANTEEN}/storage/${imagePath}`}}
              style={styles.image}
            />
            <View style={{alignSelf: 'center'}}>
              <Like />
            </View>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <View style={styles.containerDisable}>
          <View>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{name}</Text>
              <Text style={styles.statusFood((textColor = 'red'))}>
                Inactive
              </Text>
            </View>
            <Text style={styles.description}>{ingredients}</Text>
            <Price price={price} />
            <View>
              {/* {type ? (
                <View style={styles.subBox}>
                  <Text style={styles.description}>FoodCourt A</Text>
                  <Gap width={10} />
                  <Like />
                </View>
              ) : (
                <>
                  <Like />
                </>
              )} */}
            </View>
          </View>
          <View>
            <Image
              source={{uri: `${ENDPOINT_SMART_CANTEEN}/storage/${imagePath}`}}
              style={styles.image}
            />
            <View style={{alignSelf: 'center'}}>
              <Like />
            </View>
          </View>
        </View>
      );
    }
  };

  return <>{renderMenu()}</>;
};

export default ListFoodCourt;

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 80,
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
    width: 170,
  },
  statusFood: textColor => ({
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: textColor,
    marginRight: 5,
    textAlignVertical: 'center',
  }),
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 1,
  },
  containerDisable: {
    opacity: 0.3,
    borderBottomColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 1,
  },
  description: {
    color: '#8D92A3',
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    width: 200,
  },
  subBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
});
