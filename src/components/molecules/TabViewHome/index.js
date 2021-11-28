import React, { useEffect } from 'react';
import {Image, ScrollView, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {DummyList1} from '../../../assets';
import ItemListFood from '../ItemListFood';
import Rating from '../Rating';
import {useNavigation} from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { getDataMenuByTypes } from '../../../redux/action/menuAction';
import { useSelector } from 'react-redux';
import { ENDPOINT_SMART_CANTEEN } from '../../../utils/API/httpClient';

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
  const dispatch = useDispatch()
  const {newTaste} = useSelector(state => state.menuReducer)

  useEffect(() => {
    dispatch(getDataMenuByTypes('New Taste'))
  },[])
  return (
    <View>
      <ScrollView>
        {newTaste.map(data => {
          return(
            <ItemListFood
            key={data.id} 
            name={data.name}
            ingredients={data.ingredients}
            price={data.price}
            canteen={data.lokasi_kantin}
            rating={data.rating}
            urlPhoto={{ uri: `${ENDPOINT_SMART_CANTEEN}/storage/` + data.picturePath }}
            onPress={() => navigation.navigate('DetailFoodItem')} />
            )
        })}
      </ScrollView>
    </View>
  );
};

const Popular = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const {popular} = useSelector(state => state.menuReducer)

  useEffect(() => {
    dispatch(getDataMenuByTypes('Popular'))
  },[])
  return (
    <View>
      <ScrollView>
        {popular.map(data => {
          return(
            <ItemListFood
            key={data.id} 
            name={data.name}
            ingredients={data.ingredients}
            price={data.price}
            canteen={data.lokasi_kantin}
            rating={data.rating}
            urlPhoto={{ uri: `${ENDPOINT_SMART_CANTEEN}/storage/` + data.picturePath }}
            onPress={() => navigation.navigate('DetailFoodItem')} />
            )
        })}
      </ScrollView>
    </View>
  );
};
const Recommended = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const {recommended} = useSelector(state => state.menuReducer)

  useEffect(() => {
    dispatch(getDataMenuByTypes('Recommended'))
  },[])
  return (
    <View>
      
        {recommended.map(data => {
          return(
            <ItemListFood
            key={data.id} 
            name={data.name}
            ingredients={data.ingredients}
            price={data.price}
            canteen={data.lokasi_kantin}
            rating={data.rating}
            urlPhoto={{ uri: `${ENDPOINT_SMART_CANTEEN}/storage/` + data.picturePath }}
            onPress={() => navigation.navigate('DetailFoodItem')} />
            )
        })}
      
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
