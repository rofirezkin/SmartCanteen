import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Decision = () => {
  return (
    <View style={styles.container}>
      <View style={styles.change}>
        <View style={styles.buttonChange}>
          <Text style={styles.text}>Change</Text>
        </View>
      </View>
    </View>
  );
};

export default Decision;

const styles = StyleSheet.create({
  change: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#D2D2D2',
    alignItems: 'flex-start',
    paddingHorizontal: 13,
    paddingVertical: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonChange: {
    borderRadius: 15,
    borderWidth: 1,
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: '#5CBE77',
  },
  text: {
    color: '#5CBE77',
  },
});
