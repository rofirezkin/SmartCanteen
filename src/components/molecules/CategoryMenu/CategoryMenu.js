import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Rating} from '..';
import {ENDPOINT_SMART_CANTEEN} from '../../../utils/API/httpClient';
import {normalizeFont} from '../../../utils/normalizeFont';
import CardCategoryMenu from '../CardCategoryMenu/CardCategoryMenu';

const CategoryMenu = ({
  isActive,
  categoryName,
  status,
  onPress,
  name,
  canteen,
  images,
  rating,
}) => {
  var string = `${name}`;
  var length = 25;
  if (string.length > 25) {
    var trimmedString = string.substring(0, length);
    var result = `${trimmedString}...`;
  } else {
    var result = `${name}`;
  }

  if (status == 'inactive' || isActive == 'Tidak Tersedia') {
    return (
      <View style={{flexDirection: 'row'}}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{paddingVertical: 15}}>
          <View style={styles.containerCard(status, isActive)}>
            <Image
              style={styles.image}
              source={{uri: `${ENDPOINT_SMART_CANTEEN}/storage/${images}`}}
            />
            <View style={styles.content}>
              <Text style={styles.text}>{result} </Text>
              <Text style={styles.subTitle}>{canteen}</Text>
              <Rating number={rating} />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={{flexDirection: 'row'}}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{paddingVertical: 15}}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onPress}
          style={styles.containerCard(status)}>
          <Image
            style={styles.image}
            source={{uri: `${ENDPOINT_SMART_CANTEEN}/storage/${images}`}}
          />
          <View style={styles.content}>
            <Text style={styles.text}>{result} </Text>
            <Text style={styles.subTitle}>{canteen}</Text>
            <Rating number={rating} />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default CategoryMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
  },
  title: {
    fontSize: normalizeFont(14),
    fontFamily: 'Poppins-SemiBold',
  },
  desc: {
    fontSize: normalizeFont(12),
    fontFamily: 'Poppins-Light',
  },
  containerCard: (status, isActive) => ({
    width: 150,
    backgroundColor: 'white',
    borderRadius: 8,
    opacity: status == 'inactive' || isActive == 'Tidak Tersedia' ? 0.5 : 1,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 12,
    overflow: 'hidden',
    marginRight: 12,
    marginBottom: 10,
    marginLeft: 10,
    marginTop: 5,
  }),
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
});
