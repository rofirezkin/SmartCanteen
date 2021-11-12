import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {DummyCoverDetail, IcBackFoodCourt} from '../../assets';
import {Button, Counter, Rating} from '../../components';

const DetailFoodItem = ({navigation}) => {
  return (
    <View style={styles.page}>
      <ImageBackground source={DummyCoverDetail} style={styles.cover}>
        <View style={styles.back}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.5}>
            <IcBackFoodCourt />
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View style={styles.content}>
        <View style={styles.mainContent}>
          <View style={styles.productContainer}>
            <View>
              <Text style={styles.title}>halo item</Text>
              <Rating />
            </View>
            <Counter payment />
          </View>
          <Text style={styles.description}>
            Makanan khas bandung yang cukup sering dipesan oleh anak muda dengan
            pola yang cukup tinggi dengan mengutamakan diet yang sehat dan
            teratur
          </Text>
          <Text style={styles.label}>Ingredients : </Text>
          <Text style={styles.description}>Saledri, bawang, sambal, madu</Text>
          <View>
            <Text style={styles.label}>Tota Price</Text>
            <Text style={styles.description}>Rp20.000</Text>
          </View>
        </View>

        <View style={styles.buttonCard}>
          <View style={styles.button}>
            <Button double label="Add To Cart" color="#B7B7B7" />
          </View>
          <View style={styles.button}>
            <Button
              double
              label="Order Now"
              onPress={() => navigation.navigate('SuccessOrder')}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default DetailFoodItem;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  cover: {
    height: 330,
  },
  back: {
    position: 'absolute',
    padding: 18,
  },
  mainContent: {
    flex: 1,
  },
  content: {
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginTop: -60,
    paddingTop: 26,
    paddingHorizontal: 19,
    flex: 1,
  },
  buttonCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#020202',
  },
  productContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#8D92A3',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#020202',
    marginBottom: 4,
  },
  button: {
    width: 160,
  },
});
