import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { normalizeFont } from '../../../utils/normalizeFont';
import Rating from '../Rating';


const CardCategoryMenu = ({avatar, onPress, name}) => {

    var string = `${name}`;
    var length = 25;
    if(string.length > 25)
    {
        var trimmedString = string.substring(0, length);
        var result = `${trimmedString}...`
    }else{
        var result = `${name}`
    }

    return (
        <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={styles.container} >
                <Image style={styles.image} source={avatar} />
                <View style={styles.content}>
                <Text style={styles.text}>{result} </Text>
                <Text style={styles.subTitle}>Kantin Fak. Teknik</Text>
                <Rating />
            </View>
        </TouchableOpacity>
    )
}

export default CardCategoryMenu

const styles = StyleSheet.create({
    container: {
    width: 150,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 14,
    overflow: 'hidden',
    marginRight: 18,
    marginBottom: 10
  },
  content: {
    padding: 12,
  },
  image: {width: 150, height: 120, resizeMode: 'cover'},
  text: {
    fontSize: normalizeFont(13),
    fontFamily: 'Poppins-Regular',
    color: '#020202',
  },
  subTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: '#8D92A3',
  },
})
