import React from 'react';
import {Image, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';

import ItemListFood from '../ItemListFood';
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
  />
);

const NewTaste = () => {
  const navigation = useNavigation();
  return (
    <View>
      <ItemListFood
        type="in-progress"
        date="Jun 12, 14:00"
        items={3}
        totalOrder="3.000.000"
        onPress={() => navigation.navigate('OrderDetail')}
      />
    </View>
  );
};

const Popular = () => {
  const navigation = useNavigation();
  return (
    <View>
      <ItemListFood
        type="in-progress"
        date="Jun 12, 14:00"
        items={3}
        totalOrder="3.000.000"
        onPress={() => navigation.navigate('OrderDetail')}
      />
    </View>
  );
};
const Recommended = () => {
  const navigation = useNavigation();
  return (
    <View>
      <ItemListFood
        type="in-progress"
        date="Jun 12, 14:00"
        items={3}
        totalOrder="3.000.000"
        onPress={() => navigation.navigate('OrderDetail')}
      />
    </View>
  );
};

const renderScene = SceneMap({
  1: NewTaste,
  2: Popular,
  3: Recommended,
});
const TabViewFoodCourt = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: '1', title: 'All'},
    {key: '2', title: 'Food'},
    {key: '3', title: 'Beverages'},
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

export default TabViewFoodCourt;

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
