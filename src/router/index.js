import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {BottomNavigator} from '../components';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Canteen,
  Cash,
  ChooseFood,
  Delivery,
  EditProfile,
  FoodCourt,
  GetStarted,
  Home,
  OrderDetail,
  Payment,
  Profile,
  Reservation,
  SecureCheckout,
  SignIn,
  SignUp,
  SignUpAddress,
  SplashScreen,
  SuccessOrder,
  SuccessSignUp,
  SearchSection,
  FeedbackPage,
  DetailFoodItem,
  Transaction,
  MyCart,
  Notification,
  AllMenuByCategory,
  OrderSummary,
  UserProfile,
  HelpCenter,
  Maintenance,
  TestNotification,
} from '../pages';
import {useSelector, useDispatch} from 'react-redux';
import {getInProgress, getInProgressBadges} from '../redux/action';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = ({route}) => {
  const {inProgressBadges} = useSelector(state => state.transactionsReducer);
  const {numberId} = useSelector(state => state.globalReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInProgressBadges(numberId));
  }, [numberId]);
  console.log('transaction', numberId);
  console.log('transaction kdua', inProgressBadges);
  var cntTransaction = 0;
  for (let i = 0; i < inProgressBadges.length; i++) {
    cntTransaction += +inProgressBadges[i].quantity;
  }
  // console.log('testing', cntTransaction);

  return (
    // <Tab.Navigator tabBar={props => <BottomNavigator {...props} />}>
    //   <Tab.Screen options={{headerShown: false}} name="Home" component={Home} />
    //   <Tab.Screen
    //     options={{headerShown: false, tabBarBadge: 3}}
    //     name="Order"
    //     component={Transaction}
    //   />
    //   <Tab.Screen
    //     options={{headerShown: false}}
    //     name="Profile"
    //     component={Profile}
    //   />
    // </Tab.Navigator>
    <Tab.Navigator
      barStyle={{backgroundColor: 'white'}}
      screenOptions={() => ({
        tabBarActiveTintColor: '#ED212B',
        tabBarInactiveTintColor: 'gray',
        tabBarBadgeStyle: {backgroundColor: '#FEA34F', color: 'white'},
      })}
      // tabBar={props => <BottomNavigator {...props} />}
    >
      <Tab.Screen
        name="Menu"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => <Icon name="home" color={color} size={26} />,
        }}
      />
      <Tab.Screen
        name="Transaction"
        component={Transaction}
        options={{
          tabBarBadge: cntTransaction > 0 ? cntTransaction : null,
          // tabBarBadge: dataNilai,

          headerShown: false,
          tabBarLabel: 'My Order',

          tabBarIcon: ({color}) => (
            <Icon name="shopping-cart" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => <Icon name="cog" color={color} size={26} />,
        }}
      />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChooseFood"
        component={ChooseFood}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SearchSection"
        component={SearchSection}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TestNotification"
        component={TestNotification}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OrderDetail"
        component={OrderDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyCart"
        component={MyCart}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Cash"
        component={Cash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SecureCheckout"
        component={SecureCheckout}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FoodCourt"
        component={FoodCourt}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Maintenance"
        component={Maintenance}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SuccessOrder"
        component={SuccessOrder}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Canteen"
        component={Canteen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Reservation"
        component={Reservation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GetStarted"
        component={GetStarted}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailFoodItem"
        component={DetailFoodItem}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FeedbackPage"
        component={FeedbackPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUpAddress"
        component={SignUpAddress}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HelpCenter"
        component={HelpCenter}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Delivery"
        component={Delivery}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SuccessSignUp"
        component={SuccessSignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AllMenuByCategory"
        component={AllMenuByCategory}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OrderSummary"
        component={OrderSummary}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Transaction"
        component={Transaction}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
