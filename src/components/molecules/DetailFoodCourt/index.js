import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {DummyFoodCourt} from '../../../assets';
import Rating from '../Rating';

const DetailFoodCourt = ({onPress, type, nameCanteen, desc, locKantin, rating}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={styles.container}>
        <View style={styles.boxFoodCourt}>
          <Image source={DummyFoodCourt} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{nameCanteen}</Text>
            <Text style={styles.description}>
             {desc}
            </Text>
            {type ? (
              <View>
                <Text style={styles.description}>{locKantin}</Text>
              </View>
            ) : (
              <View>
                <Text style={styles.statusText}>Open</Text>
              </View>
            )}
            <Rating number={rating} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DetailFoodCourt;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',

    marginTop: 15,
    paddingBottom: 15,
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 1,
  },
  boxFoodCourt: {
    paddingHorizontal: 12,
    flexDirection: 'row',
  },
  image: {
    width: 96,
    height: 90,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: 'black',
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: '#8D92A3',
  },
  textContainer: {
    marginLeft: 14,
  },
  statusText: {
    color: '#1CBD49',
    fontSize: 14,
  },
});
