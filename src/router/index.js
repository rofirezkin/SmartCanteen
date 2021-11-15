import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {BottomNavigator} from '../components';
import {
  Canteen,
  Cash,
  ChooseFood,
  Delivery,
  EditProfile,
  FoodCourt,
  GetStarted,
  Home,
  Order,
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
} from '../pages';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator tabBar={props => <BottomNavigator {...props} />}>
      <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Tab.Screen
        name="Order"
        component={Order}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
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
        name="OrderDetail"
        component={OrderDetail}
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
        name="Delivery"
        component={Delivery}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SuccessSignUp"
        component={SuccessSignUp}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
