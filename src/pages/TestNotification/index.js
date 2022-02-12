/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

// import messaging from '@react-native-firebase/messaging';
import React, {useEffect, useState} from 'react';
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
  Button,
} from 'react-native';
import NotifService from '../../utils/notification/NotifService';

const TestNotification = ({navigation}) => {
  const [registerToken, setRegisterToken] = useState('');
  const [fcmRegistered, setFcmRegistered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState('Home');

  const onRegister = token => {
    setRegisterToken(token.token);
    setFcmRegistered(true);
  };
  const onNotif = notif => {
    Alert.alert(notif.title, notif.message);
    navigation.navigate('Transaction');
  };

  const notif = new NotifService(onRegister, onNotif);
  const handlePerm = perms => {
    Alert.alert('permission', JSON.stringify(perms));
  };

  // useEffect(() => {
  //   // Assume a message-notification contains a "type" property in the data payload of the screen to open

  //   messaging().onNotificationOpenedApp(remoteMessage => {
  //     console.log(
  //       'Notification caused app to open from background state:',
  //       remoteMessage.data,
  //     );
  //     navigation.navigate(remoteMessage.data.type);
  //   });

  //   // Check whether an initial notification is available
  //   messaging()
  //     .getInitialNotification()
  //     .then(remoteMessage => {
  //       if (remoteMessage) {
  //         console.log(
  //           'Notification caused app to open from quit state:',
  //           remoteMessage.notification,
  //         );
  //         navigation.navigate(remoteMessage.data.type);
  //         setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
  //       }
  //       setLoading(false);
  //     });
  // }, []);

  // if (loading) {
  //   return null;
  // }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        Example app react-native-push-notification
      </Text>
      <View style={styles.spacer}></View>
      <TextInput
        style={styles.textField}
        value={registerToken}
        placeholder="Register token"
      />
      <View style={styles.spacer}></View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          notif.localNotif();
        }}>
        <Text>Local Notification (now)</Text>
      </TouchableOpacity>

      {/* {fcmRegistered && <Text>FCM Configured !</Text>} */}

      <View style={styles.spacer}></View>
    </ScrollView>
  );
};

export default TestNotification;
const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: '#000000',
    margin: 5,
    padding: 5,
    width: '70%',
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
  },
  textField: {
    borderWidth: 1,
    borderColor: '#AAAAAA',
    margin: 5,
    padding: 5,
    width: '70%',
  },
  spacer: {
    height: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
});
