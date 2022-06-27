import React, {useEffect, useState} from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import ItemListFood from '../ItemListFood';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  getFeedbackOrder,
  getInProgress,
  getPastOrders,
} from '../../../redux/action';
import {ILNodata} from '../../../assets';
import Gap from '../../atoms/Gap';
import Loading from '../Loading';

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={styles.indicatorStyle}
    style={styles.topBar}
    contentContainerStyle={{
      justifyContent: 'space-around',
    }}
    tabStyle={styles.tabStyle}
    renderLabel={({route, focused, color}) => (
      <Text style={styles.tabText(focused)}>{route.title}</Text>
    )}
  />
);

const InProgress = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {inProgress} = useSelector(state => state.transactionsReducer);
  const {loadingSkeleton} = useSelector(state => state.loadingReducer);
  const [refreshing, setRefreshing] = useState(false);
  const {numberId} = useSelector(state => state.globalReducer);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getInProgress(numberId));
    });
    return unsubscribe;
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getInProgress(numberId));
    setRefreshing(false);
  };

  console.log('inprogress', inProgress);
  return (
    <>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {inProgress.map(order => {
          order.nim = numberId;
          return (
            <ItemListFood
              urlPhoto={order.profile_photo_path}
              name={order.nama_tenant}
              key={order.id}
              kodeTransaksi={order.kode_transaksi}
              status={order.status}
              location={order.lokasi_kantin}
              orderDate={order.created_at}
              type="in-progress"
              items={order.quantity}
              // totalOrder={order.total}
              onPress={() => navigation.navigate('OrderDetail', order)}
            />
          );
        })}
        {inProgress.length == 0 && !loadingSkeleton && (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ILNodata />
            <Gap height={10} />
            <Text>No data Order</Text>
          </View>
        )}
      </ScrollView>
      {loadingSkeleton && <Loading order />}
    </>
  );
};

const Feedback = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {feedback} = useSelector(state => state.transactionsReducer);
  const [refreshing, setRefreshing] = useState(false);
  const {loadingSkeleton} = useSelector(state => state.loadingReducer);
  const {numberId} = useSelector(state => state.globalReducer);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getFeedbackOrder(numberId));
    });
    return unsubscribe;
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getFeedbackOrder(numberId));
    setRefreshing(false);
  };
  console.log('inprogress', feedback);
  return (
    <>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {feedback.map(order => {
          order.nim = numberId;
          return (
            <ItemListFood
              urlPhoto={order.profile_photo_path}
              name={order.nama_tenant}
              key={order.id}
              kodeTransaksi={order.kode_transaksi}
              status={order.status}
              location={order.lokasi_kantin}
              orderDate={order.created_at}
              type="past-orders"
              items={order.quantity}
              totalOrder={order.total}
              onPress={() => navigation.navigate('OrderDetail', order)}
            />
          );
        })}
        {feedback.length == 0 && !loadingSkeleton && (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ILNodata />
            <Gap height={10} />
            <Text>No data Order</Text>
          </View>
        )}
      </ScrollView>
      {loadingSkeleton && <Loading order />}
    </>
  );
};

const PastOrder = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {pastOrder} = useSelector(state => state.transactionsReducer);
  const {loadingSkeleton} = useSelector(state => state.loadingReducer);
  const [refreshing, setRefreshing] = useState(false);
  const {numberId} = useSelector(state => state.globalReducer);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getPastOrders(numberId));
    });
    return unsubscribe;
  }, [navigation]);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getPastOrders(numberId));
    setRefreshing(false);
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {pastOrder.map(order => {
          order.nim = numberId;
          return (
            <ItemListFood
              urlPhoto={order.profile_photo_path}
              name={order.nama_tenant}
              key={order.id}
              kodeTransaksi={order.kode_transaksi}
              status={order.status}
              location={order.lokasi_kantin}
              orderDate={order.created_at}
              type="past-orders"
              items={order.quantity}
              totalOrder={order.total}
              onPress={() => navigation.navigate('OrderDetail', order)}
            />
          );
        })}
        {pastOrder.length == 0 && !loadingSkeleton && (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ILNodata />
            <Gap height={10} />
            <Text>No data Order</Text>
          </View>
        )}
      </ScrollView>
      {loadingSkeleton && <Loading order />}
    </>
  );
};

const renderScene = SceneMap({
  1: InProgress,
  2: Feedback,
  3: PastOrder,
});
const TabViewFoodCourt = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: '1', title: 'In Progress'},
    {key: '2', title: 'Feedback Canteen'},
    {key: '3', title: 'Past Order'},
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
  topBar: {
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
  tabStyle: {elevation: 0},
  tabText: focused => ({
    fontFamily: 'Poppins-Medium',
    color: focused ? '#020202' : '#8D92A3',
  }),
});
