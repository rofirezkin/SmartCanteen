import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Gap} from '../..';
import {IcDelivery, IcDineIn, IcQuickOrder, IcTakeAway} from '../../../assets';
import { normalizeFont } from '../../../utils/normalizeFont';

const OptionUser = ({
  iconData,
  data,
  color = '#ED212B',
  onPress,
  profileFood,
}) => {
  const Icon = () => {
    if (iconData === 'delivery') {
      return <IcDelivery />;
    } else if (iconData === 'dineIn') {
      return <IcDineIn />;
    } else if (iconData === 'takeAway') {
      return <IcTakeAway />;
    } else if (iconData === 'quickOrder') {
      return <IcQuickOrder />;
    }
    return <IcDelivery />;
  };
  if (profileFood) {
    return (
      <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
        <View style={styles.contentProfile}>
          <View style={styles.container(color)}>
            <Icon />
          </View>
          <Gap height={8} />
          <Text style={styles.textProfile}>{data}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <View style={styles.content}>
        <View style={styles.container(color)}>
          <Icon />
        </View>
        <Gap height={8} />
        <Text style={styles.text}>{data}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default OptionUser;

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
  },
  container: color => ({
    width: 52,
    height: 52,
    backgroundColor: color,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  }),

  text: {
    fontSize: normalizeFont(12),
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
  contentProfile: {
    flexDirection: 'row',
  },
  textProfile: {
    fontSize: normalizeFont(15),
    fontFamily: 'Poppins-Medium',
    textAlignVertical: 'center',
    marginLeft: 14,
  },
});
