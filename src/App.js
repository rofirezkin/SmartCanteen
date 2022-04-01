import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Router from './router';
import {Provider, useDispatch, useSelector} from 'react-redux';
import store from './redux/store';
import {LogBox, Alert, AppRegistry} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import {Loading} from './components';
import messaging from '@react-native-firebase/messaging';
import NotifService from './utils/notification/NotifService';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

function HeadlessCheck({isHeadless}) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  return <App />;
}

const MainApp = () => {
  const {isLoading} = useSelector(state => state.loadingReducer);
  const dispatch = useDispatch();
  const [registerToken, setRegisterToken] = useState('');
  const [fcmRegistered, setFcmRegistered] = useState(false);

  const onRegister = token => {
    dispatch({
      type: 'SET_DEVICE_TOKEN',
      value: token.token,
    });
    setRegisterToken(token.token);

    setFcmRegistered(true);
  };
  const onNotif = notif => {
    const notifData = new NotifService();
    notifData.localNotifForeground(notif.title, notif.message);
  };

  const notif = new NotifService(onRegister, onNotif);
  const handlePerm = perms => {
    Alert.alert('permission', JSON.stringify(perms));
  };

  return (
    <NavigationContainer>
      <Router />
      <FlashMessage position="top" />
      {isLoading && <Loading />}
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
};

export default App;
AppRegistry.registerComponent('app', () => HeadlessCheck);
