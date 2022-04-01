import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

const Loading = ({order}) => {
  if (order) {
    return (
      <View style={styles.container(order)}>
        <ActivityIndicator size="large" color="red" />
        <Text style={styles.text(order)}>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container(order)}>
      <ActivityIndicator size="large" color="#1ABC9C" />
      <Text style={styles.text(order)}>Loading...</Text>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: order => ({
    position: 'absolute',
    flex: 1,
    backgroundColor: order ? 'rgba(0, 1, 0, 0.1)' : 'rgba(0, 0, 0, 0.4)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  text: order => ({
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    marginTop: 12,
    color: order ? 'red' : 'white',
  }),
});
