import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Image, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';

import {ItemListMenu} from '..';

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
  return (
    <View>
      <ItemListMenu
        label="Edit Profile"
        onPress={() => navigation.navigate('EditProfile')}
      />
      <ItemListMenu label="Home Address" />
      <ItemListMenu label="Log Out" />
    </View>
  );
};

const SmartCanteen = () => {
  return (
    <View>
      <ItemListMenu label="Rate App" />
      <ItemListMenu label="Help Center" />
      <ItemListMenu label="Term & Condition" />
    </View>
  );
};

const renderScene = SceneMap({
  1: Account,
  2: SmartCanteen,
});
const ProfileTabSection = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: '1', title: 'Account'},
    {key: '2', title: 'SmartCanteen'},
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
