import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const DetailCanteen = ({onPress, name, avatar}) => {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <View style={styles.container}>
        <Image source={avatar} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.subTitle}>
            Menyediakan Makanan yang higenis dan sehat pada {name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DetailCanteen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 14,
    borderRadius: 18,
    marginTop: 20,
  },
  image: {
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    width: '100%',
    height: 110,
    resizeMode: 'cover',
  },
  textContainer: {
    padding: 13,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: 'black',
  },
  subTitle: {
    color: '#8D92A3',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
});
