import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Number from '../../../utils/Number/Number';

const ItemValue = ({title, value, colorValue, name}) => {

  const renderValue = () => {
    if(name)
    {
      return(
        <Text style={styles.value(colorValue)}>{name}</Text>
      )
      
    }else{
      return(
        <Text style={styles.value(colorValue)}><Number number={value} /></Text>
      )
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {renderValue()}
    </View>
  );
};

export default ItemValue;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#8D92A3',
  },
  value: colorValue => ({
    fontSize: 13,
    color: colorValue ? '#1ABC9C' : 'black',
    fontFamily: 'Poppins-Regular',
    fontWeight: '600',
  }),
});
