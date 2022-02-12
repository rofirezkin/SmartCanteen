import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Router from './router';
import {Provider, useSelector} from 'react-redux';
import store from './redux/store';
import {LogBox, AppRegistry} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import {Loading} from './components';
import messaging from '@react-native-firebase/messaging';

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
