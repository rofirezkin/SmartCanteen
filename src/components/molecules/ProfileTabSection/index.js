import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Image, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {deleteUser} from '../../../utils/AsyncStoreServices';

import {ItemListMenu} from '..';
import {useSelector} from 'react-redux';

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={styles.indicatorStyle}
    style={styles.barTop}
    tabStyle={styles.tabStyle}
    renderLabel={({route, focused, color}) => (
      <Text style={styles.tabText(focused)}>{route.title}</Text>
    )}
  />
);

const Account = () => {
  const navigation = useNavigation();
  const {globalReducer} = useSelector(state => state);
  const signOut = async () => {
    await deleteUser();
    await AsyncStorage.removeItem('dataCart');
    navigation.replace('SignIn');
  };
  return (
    <View>
      <ItemListMenu
        icon="edit-profile"
        name="Data Akun anda"
        desc="Lihat dan edit akun anda"
        onPress={() => navigation.navigate('UserProfile', globalReducer)}
      />
      <ItemListMenu
        name="Bantuan Admin"
        icon="tutup-buka"
        desc="Hubungi admin jika ada masalah"
        icon="bantuan"
        onPress={() => navigation.navigate('HelpCenter')}
      />
      <ItemListMenu
        label="Log Out"
        name="Log Out"
        desc="Keluar dari akun anda"
        icon="logout"
        onPress={signOut}
      />
    </View>
  );
};

const SmartCanteen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <ItemListMenu
        icon="edit-profile"
        name="Tentang SmartCanteen"
        desc="Lihat Profile SmartCanten"
      />
      <ItemListMenu
        name="Bantuan Admin"
        icon="tutup-buka"
        desc="Hubungi admin jika ada masalah"
        icon="bantuan"
      />
    </View>
  );
};

const renderScene = SceneMap({
  1: Account,
  // 2: SmartCanteen,
});
const ProfileTabSection = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: '1', title: 'Account'},
    // {key: '2', title: 'SmartCanteen'},
  ]);
  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      style={styles.tabView}
    />
  );
};

export default ProfileTabSection;

const styles = StyleSheet.create({
  tabView: {backgroundColor: 'white'},
  barTop: {
    backgroundColor: 'white',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomColor: '#F2F2F2',
    borderBottomWidth: 1,
    paddingLeft: 10,
  },
  indicatorStyle: {
    backgroundColor: '#020202',
    marginLeft: 10,
  },
  tabStyle: {width: 'auto'},
  tabText: focused => ({
    fontFamily: 'Poppins-Medium',
    color: focused ? '#020202' : '#8D92A3',
  }),
});
