import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Gap} from '../..';
import {DummyPosterHome} from '../../../assets';

const PosterHome = () => {
  return (
    <View>
      <View style={styles.wrapperScroll}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.category}>
            <Gap width={18} />
            <View>
              <View style={styles.container}>
                <Image source={DummyPosterHome} style={styles.image} />
              </View>
            </View>
            <View>
              <View style={styles.container}>
                <Image source={DummyPosterHome} style={styles.image} />
              </View>
            </View>
            <Gap width={8} />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default PosterHome;

const styles = StyleSheet.create({
  wrapperScroll: {
    marginHorizontal: -18,
  },
  category: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  image: {
    width: 294,
    height: 115,
    borderRadius: 4,
  },

  container: {
    marginRight: 10,
    marginTop: 20,
  },
});
