import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IcSearch} from '../../../assets';

const SearchInput = ({onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View style={styles.container}>
        <IcSearch />
        <Text style={styles.text}>Find Food or Place</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CFCCCC',
    backgroundColor: '#F5F5F5',
    flexDirection: 'row',
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    marginLeft: 13,
    color: '#A2A2A2',
  },
});
