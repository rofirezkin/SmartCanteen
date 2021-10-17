import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';

import {DummyFood1, DummyFood2} from '../../assets';

import {
  FoodCard,
  Gap,
  OptionUser,
  PosterHome,
  ShortProfile,
  TabViewHome,
} from '../../components';

const Home = ({navigation}) => {
  return (
    <ScrollView>
      <View style={styles.page}>
        <View style={styles.container}>
          <View style={styles.cardHome}>
            <ShortProfile />
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
                  onPress={() => navigation.navigate('Canteen', 'quick order')}
                />
                <OptionUser
                  color="#21B0ED"
                  iconData="takeAway"
                  data="Take Away"
                  onPress={() => navigation.navigate('Canteen', 'take-away')}
                />
                <OptionUser
                  onPress={() => navigation.navigate('Canteen', 'dine-in')}
                  iconData="dineIn"
                  data="Dine In"
                />
              </View>
            </View>
          </View>
          <Text style={styles.textBestSeller}>Best Seller</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.foodCardContainer}>
              <Gap width={18} />
              <FoodCard avatar={DummyFood1} />
              <FoodCard avatar={DummyFood2} />
              <FoodCard avatar={DummyFood1} />
              <Gap />
            </View>
          </ScrollView>
        </View>
        <View>
          <View style={styles.tabContainer}>
            <TabViewHome />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  page: {
    flex: 1,
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
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  wrapperFeature: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tabContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  textBestSeller: {
    fontFamily: 'Poppins-Medium',
    marginLeft: 19,
    marginTop: 19,
    fontSize: 16,
  },
});
