import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {LikeInactive} from '../../../assets';

const Like = () => {
  return (
    <View style={styles.container}>
      <LikeInactive />
      <Text style={styles.text}>Like</Text>
    </View>
  );
};

export default Like;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'baseline',
    paddingHorizontal: 13,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    marginTop: 3,
    borderColor: '#BABABA',
  },
  text: {
    textAlignVertical: 'center',
    fontSize: 12,
    marginLeft: 6,
  },
});
