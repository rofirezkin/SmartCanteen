import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {deleteUser, getData, setUser} from '../../../utils/AsyncStoreServices';

import ItemListMenu from '../ItemListMenu';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {ENDPOINT_API_SMART_CANTEEN} from '../../../utils/API/httpClient';
import {setLoading} from '../../../redux/action';

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
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {globalReducer} = useSelector(state => state);
  const [userName, setUserName] = useState('');
  console.log('global Reducer', globalReducer);

  useEffect(() => {
    getData('userApk').then(res => {
      setUserName(res.value);
    });
  }, []);
  const signOut = async () => {
    dispatch(setLoading(true));
    const userData = {
      nama: userName.nama,
      is_login: '0',
      device_token: userName.device_token,
    };

    await deleteUser();
    axios
      .post(`${ENDPOINT_API_SMART_CANTEEN}userapk`, userData)
      .then(res => {
        AsyncStorage.removeItem('dataCart');
        AsyncStorage.removeItem('token');
        AsyncStorage.removeItem('userApk');
        dispatch(setLoading(false));
        navigation.reset({index: 0, routes: [{name: 'SignIn'}]});
      })
      .catch(err => {
        dispatch(setLoading(false));
        console.log('errorr di bagian post userAPK', err);
      });
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
