import React from 'react';
import {Image, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {DummyList1} from '../../../assets';
import ItemListFood from '../ItemListFood';
import Rating from '../Rating';
import {useNavigation} from '@react-navigation/native';

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={styles.indicatorStyle}
    style={styles.barTop}
    tabStyle={styles.tabStyle}
    renderLabel={({route, focused, color}) => (
      <Text style={styles.tabText(focused)}>{route.title}</Text>
    )}
    tabStyle={{elevation: 0}}
  />
);

const NewTaste = () => {
  const navigation = useNavigation();
  return (
    <View>
      <ItemListFood onPress={() => navigation.navigate('')} />
      <ItemListFood onPress={() => navigation.navigate('')} />
      <ItemListFood onPress={() => navigation.navigate('')} />
    </View>
  );
};

const Popular = () => {
  const navigation = useNavigation();
  return (
    <View>
      <ItemListFood onPress={() => navigation.navigate('')} />
      <ItemListFood onPress={() => navigation.navigate('')} />
      <ItemListFood onPress={() => navigation.navigate('')} />
    </View>
  );
};
const Recommended = () => {
  const navigation = useNavigation();
  return (
    <View>
      <ItemListFood onPress={() => navigation.navigate('')} />
      <ItemListFood onPress={() => navigation.navigate('')} />
      <ItemListFood onPress={() => navigation.navigate('')} />
    </View>
  );
};

const renderScene = SceneMap({
  1: NewTaste,
  2: Popular,
  3: Recommended,
});
const TabViewHome = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: '1', title: 'New Taste'},
    {key: '2', title: 'Popular'},
    {key: '3', title: 'Recommended'},
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

export default TabViewHome;

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
