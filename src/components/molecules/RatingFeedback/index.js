import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ICStartActive, ICStartNonActive} from '../../../assets';

const RatingFeedback = () => {
  return (
    <View style={styles.container}>
      <ICStartActive />
      <ICStartActive />
      <ICStartActive />
      <ICStartActive />
      <ICStartNonActive />
    </View>
  );
};

export default RatingFeedback;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
