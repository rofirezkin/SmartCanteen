import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IcBack} from '../../../assets';

const Header = ({title, subtTitle, onPress, onBack, detail}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {onBack && (
        <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
          <View style={styles.back}>
            <IcBack />
          </View>
        </TouchableOpacity>
      )}

      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtTitle}>{subtTitle}</Text>
      </View>
      {detail && (
        <View style={{flex: 1}}>
          <TouchableOpacity onPress={() => navigation.navigate('HelpCenter')}>
            <Text style={{textAlign: 'right', fontSize: 16, color: '#FEA34F'}}>
              Help ?
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {fontSize: 19, fontFamily: 'Poppins-Medium', color: '#020202'},
  subtTitle: {fontSize: 14, fontFamily: 'Poppins-light', color: '#8D92A3'},
  back: {
    padding: 10,
    marginRight: 16,
    marginLeft: -10,
  },
});
