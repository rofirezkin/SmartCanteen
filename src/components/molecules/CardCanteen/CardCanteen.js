import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const CardCanteen = ({onPress, avatar, name}) => {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <View style={styles.container}>
        <Image source={avatar} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.subTitle}>
            Menyediakan Makanan yang sehat dan higenis pada {name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardCanteen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: 200,
    height: 300,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 14,
    borderRadius: 18,
    marginTop: 20,
    marginRight: 20,
  },
  image: {
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    width: 200,
    height: 110,
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
