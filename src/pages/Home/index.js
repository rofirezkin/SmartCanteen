import React, {useEffect, useState} from 'react';
import {
  Alert,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  TouchableOpacity,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {
  DummyCanteen,
  DummyFood1,
  DummyFood2,
  DummyFoodCourt,
} from '../../assets';
import {getData, getUser} from '../../utils/AsyncStoreServices';
import {useDispatch} from 'react-redux';
import {
  CategoryMenu,
  DetailCanteen,
  FoodCard,
  Gap,
  ItemListFood,
  OptionUser,
  PosterHome,
  ShortProfile,
  TabViewHome,
} from '../../components';
import {normalizeFont} from '../../utils/normalizeFont';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import {skeletonHome} from '../../components/skeleton/skeletonHome';
import {useSelector} from 'react-redux';
import {getDataMenuSeveralByTypes} from '../../redux/action/menuAction';
import CardCanteen from '../../components/molecules/CardCanteen/CardCanteen';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const Home = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const dispatch = useDispatch();
  const {menuReducer, globalReducer} = useSelector(state => state);

  const severalNewTaste = menuReducer.severalNewTaste;
  const severalRecommended = menuReducer.severalRecommended;
  const severalPopular = menuReducer.severalPopular;

  const onRefresh = React.useCallback(() => {
    setLoading(true);
    setRefresh(true);
    dispatch(getDataMenuSeveralByTypes());

    setLoading(false);
    setRefresh(false);
  }, []);

  const user = async () => {
    const dataUser = await getUser();
    setLoading(false);
    dispatch({type: 'SET_GLOBAL_USER', value: dataUser});
  };

  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    dispatch(getDataMenuSeveralByTypes());

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.data,
      );
      navigation.replace('MainApp', {screen: 'CostumerOrder'});
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          navigation.replace('MainApp', {screen: 'CostumerOrder'});
          setInitialRoute('MainApp'); // e.g. "Settings"
        }
      });

    navigation.addListener('focus', () => {
      dispatch({type: 'SET_OPTION_USER', value: {method: 'Dine In'}});
    });

    user();
    getData('dataCart').then(res => {
      if (res == null) {
        dispatch({type: 'GET_DATA_CART', value: []});
      } else {
        dispatch({type: 'GET_DATA_CART', value: res});
      }
    });

    // dispatch(getInProgressBadges(globalReducer.numberId));
    // getData('dataCart').then(res => {
    //   dispatch({type: 'GET_DATA_CART', value: res});
    // });
  }, []);
  var nameCanteen = '';

  console.log('jalan berapa kali');
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
      }>
      <SkeletonContent
        containerStyle={{flex: 1}}
        isLoading={loading}
        layout={skeletonHome}>
        <View style={styles.page}>
          <View style={styles.container}>
            <View style={styles.cardHome}>
              <ShortProfile
                fullName={globalReducer.fullName}
                role={globalReducer.role}
                url={globalReducer.photo}
              />
              <Gap height={15} />
              <PosterHome />
              <View>
                <Gap height={20} />
                <Text style={styles.textHome}>Yes, I am ready to order</Text>
                <Gap height={11} />
                <View style={styles.wrapperFeature}>
                  <OptionUser
                    iconData="delivery"
                    data="Delivery"
                    onPress={() => navigation.navigate('Delivery')}
                  />
                  <OptionUser
                    color="#FEA34F"
                    iconData="quickOrder"
                    data="Quick Order"
                    onPress={() =>
                      navigation.navigate('QRCodeGenerator', 'Quick Order')
                    }
                  />
                  <OptionUser
                    color="#21B0ED"
                    iconData="takeAway"
                    data="Take Away"
                    onPress={() => navigation.navigate('Canteen', 'Take Away')}
                  />
                  <OptionUser
                    onPress={() => navigation.navigate('Canteen', 'Dine In')}
                    iconData="dineIn"
                    data="Dine In"
                  />
                </View>
              </View>
            </View>
            <Gap height={30} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.textCanteen}>Choose Food By Canteen</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Canteen')}
                style={{
                  marginRight: 20,
                  fontFamily: 'Poppins-Regular',
                  fontSize: 13,
                }}>
                <Text>see more</Text>
              </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.foodCardContainer}>
                <Gap width={18} />
                <CardCanteen
                  avatar={DummyFoodCourt}
                  name="Kantin Fakultas Ilmu Terapan"
                  onPress={() =>
                    navigation.navigate(
                      'FoodCourt',
                      (nameCanteen = 'Fakultas Ilmu Terapan'),
                    )
                  }
                />
                <CardCanteen
                  avatar={DummyCanteen}
                  name="Kantin Fakultas Teknik"
                  onPress={() =>
                    navigation.navigate(
                      'FoodCourt',
                      (nameCanteen = 'Fakultas Teknik'),
                    )
                  }
                />

                <CardCanteen
                  avatar={DummyCanteen}
                  name="Kantin Fakultas Ekonomi Bisnis"
                  onPress={() =>
                    navigation.navigate(
                      'FoodCourt',
                      (nameCanteen = 'Fakultas Ekonomi dan Bisnis'),
                    )
                  }
                />
                <Gap />
              </View>
            </ScrollView>
          </View>
          <View style={styles.tabContainer}>
            <View style={styles.foodCardContainer}>
              <View style={styles.containerCardMenu}>
                <View style={styles.header}>
                  <View style={{alignItems: 'center'}}>
                    <Text style={styles.title}>Recommended Menu</Text>
                  </View>
                  <TouchableOpacity
                    style={{alignItems: 'center'}}
                    onPress={() =>
                      navigation.navigate('AllMenuByCategory', [
                        (titleMenu = 'Recommended Menu'),
                        (paramsQuery = 'Recommended'),
                      ])
                    }>
                    <Text style={styles.desc}>see more</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {severalRecommended.map(data => {
                      const nameCanteen = `${data.name} - ${data.nama_tenant}`;
                      var result = `${data.id}`;
                      var characters = '012345';
                      var charactersLength = characters.length;

                      for (var i = 0; i < charactersLength; i++) {
                        result += characters.charAt(
                          Math.floor(Math.random() * charactersLength),
                        );
                      }

                      return (
                        <CategoryMenu
                          isActive={data.is_active}
                          status={data.status}
                          key={result}
                          rating={data.rating}
                          avatar={DummyFood1}
                          name={nameCanteen}
                          canteen={data.lokasi_kantin}
                          images={data.picturePath}
                          onPress={() =>
                            navigation.navigate('DetailFoodItem', data)
                          }
                        />
                      );
                    })}
                  </ScrollView>
                </View>
              </View>
            </View>

            <View style={styles.foodCardContainer}>
              <View style={styles.containerCardMenu}>
                <View style={styles.header}>
                  <View style={{alignItems: 'center'}}>
                    <Text style={styles.title}>New Taste Menu</Text>
                  </View>
                  <TouchableOpacity
                    style={{alignItems: 'center'}}
                    onPress={() =>
                      navigation.navigate('AllMenuByCategory', [
                        (titleMenu = 'New Taste'),
                        (paramsQuery = 'New Taste'),
                      ])
                    }>
                    <Text style={styles.desc}>see more</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {severalNewTaste.map(data => {
                      const nameCanteen = `${data.name} - ${data.nama_tenant}`;
                      var result = `${data.id}`;
                      var characters = '012345';
                      var charactersLength = characters.length;

                      for (var i = 0; i < charactersLength; i++) {
                        result += characters.charAt(
                          Math.floor(Math.random() * charactersLength),
                        );
                      }

                      return (
                        <CategoryMenu
                          isActive={data.is_active}
                          status={data.status}
                          key={result}
                          rating={data.rating}
                          avatar={DummyFood1}
                          name={nameCanteen}
                          canteen={data.lokasi_kantin}
                          images={data.picturePath}
                          onPress={() =>
                            navigation.navigate('DetailFoodItem', data)
                          }
                        />
                      );
                    })}
                  </ScrollView>
                </View>
              </View>
            </View>

            <View style={styles.foodCardContainer}>
              <View style={styles.containerCardMenu}>
                <View style={styles.header}>
                  <View style={{alignItems: 'center'}}>
                    <Text style={styles.title}>Popular Menu</Text>
                  </View>
                  <TouchableOpacity
                    style={{alignItems: 'center'}}
                    onPress={() =>
                      navigation.navigate('AllMenuByCategory', [
                        (titleMenu = 'Popular'),
                        (paramsQuery = 'Popular'),
                      ])
                    }>
                    <Text style={styles.desc}>see more</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {severalPopular.map(data => {
                      const nameCanteen = `${data.name} - ${data.nama_tenant}`;
                      var result = `${data.id}`;
                      var characters = '012345';
                      var charactersLength = characters.length;

                      for (var i = 0; i < charactersLength; i++) {
                        result += characters.charAt(
                          Math.floor(Math.random() * charactersLength),
                        );
                      }

                      const idKey = `${data.id}001`;
                      return (
                        <CategoryMenu
                          isActive={data.is_active}
                          status={data.status}
                          key={result}
                          rating={data.rating}
                          avatar={DummyFood1}
                          name={nameCanteen}
                          canteen={data.lokasi_kantin}
                          images={data.picturePath}
                          onPress={() =>
                            navigation.navigate('DetailFoodItem', data)
                          }
                        />
                      );
                    })}
                  </ScrollView>
                </View>
              </View>
            </View>
            {/* <TabViewHome /> */}
          </View>
        </View>
      </SkeletonContent>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#ECECEC',
  },
  container: {
    marginTop: 20,
  },
  cardHome: {
    paddingHorizontal: 18,
  },
  foodCardContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  textHome: {
    fontSize: normalizeFont(16),
    fontFamily: 'Poppins-Medium',
  },
  wrapperFeature: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tabContainer: {
    flex: 1,
  },
  textBestSeller: {
    fontFamily: 'Poppins-Medium',
    marginLeft: 19,
    marginTop: 19,
    fontSize: normalizeFont(16),
  },
  textCanteen: {
    fontFamily: 'Poppins-Medium',
    marginLeft: 19,
    fontSize: normalizeFont(16),
  },
  containerCardMenu: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
  },
  title: {
    fontSize: normalizeFont(14),
    fontFamily: 'Poppins-SemiBold',
  },
  desc: {
    fontSize: normalizeFont(12),
    fontFamily: 'Poppins-Light',
  },
});
