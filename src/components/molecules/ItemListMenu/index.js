import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {
  ICGeneral,
  ICLandmark,
  ICLogout,
  ICPhone,
  ICUserAccount,
  Next,
} from '../../../assets';
import {fonts} from '../../../utils';

const ItemListMenu = ({profile, name, desc, type, onPress, icon}) => {
  const Icon = () => {
    if (icon === 'edit-profile') {
      return <ICUserAccount />;
    }
    if (icon === 'tutup-buka') {
      return <ICGeneral />;
    }

    if (icon === 'logout') {
      return <ICLogout />;
    }

    return <ICGeneral />;
  };
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container}
      onPress={onPress}>
      <Icon />
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.desc}>{desc}</Text>
      </View>
      <Next />
    </TouchableOpacity>
  );
};

export default ItemListMenu;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',

    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {flex: 1, marginLeft: 16},
  avatar: {width: 46, height: 46, borderRadius: 46 / 2},
  name: {
    fontSize: 16,
    fontFamily: fonts.primary[400],
  },
  desc: {
    fontSize: 12,
    fontFamily: fonts.primary[300],
    textTransform: 'capitalize',
    color: '#7D8797',
  },
});
