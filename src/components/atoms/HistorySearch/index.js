import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const HistorySearch = ({item}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{item}</Text>
    </View>
  );
};

export default HistorySearch;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    marginBottom: 10,
    padding: 7,
    marginRight: 10,
    backgroundColor: '#EFEFEF',
  },
  text: {
    color: '#ED212B',
  },
});
