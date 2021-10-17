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
  />
);

const InProgress = () => {
  const navigation = useNavigation();
  return (
    <View>
      <ItemListFood
        onPress={() => navigation.navigate('OrderDetail')}
        items={3}
        type="in-progress"
        totalOrder="3.000.000"
      />
      <ItemListFood
        items={3}
        totalOrder="3.000.000"
        type="in-progress"
        onPress={() => navigation.navigate('OrderDetail')}
      />
      <ItemListFood
        items={3}
        totalOrder="3.000.000"
        type="in-progress"
        onPress={() => navigation.navigate('OrderDetail')}
      />
    </View>
  );
};

const PastOrder = () => {
  const navigation = useNavigation();
  return (
    <View>
      <ItemListFood
        items={3}
        totalOrder="3.000.000"
        type="past-orders"
        date="Jun 12, 14:00"
        statusOrder="Success"
        onPress={() => navigation.navigate('')}
      />
      <ItemListFood
        items={3}
        date="Jun 12, 14:00"
        totalOrder="3.000.000"
        type="past-orders"
        statusOrder="Cancelled"
        onPress={() => navigation.navigate('')}
      />
      <ItemListFood
        type="past-orders"
        date="Jun 12, 14:00"
        items={3}
        statusOrder="Cancelled"
        totalOrder="3.000.000"
        onPress={() => navigation.navigate('')}
      />
    </View>
  );
};

const renderScene = SceneMap({
  1: InProgress,
  2: PastOrder,
});
const OrderTabSection = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: '1', title: 'In Progress'},
    {key: '2', title: 'Past Order'},
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

export default OrderTabSection;

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
