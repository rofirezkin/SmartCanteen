import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Header, NotificationSection} from '../../components';

const Notification = ({navigation}) => {
  return (
    <View style={styles.page}>
      <Header
        title="Notification"
        subtTitle="information about order status"
        onBack
        onPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <View style={styles.date}>
          <Text>Wednesday, 17 Nov</Text>
        </View>
        <NotificationSection />
        <NotificationSection />
        <NotificationSection />
      </View>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    backgroundColor: 'white',
    marginTop: 10,
    paddingTop: 10,

    flex: 1,
  },
  date: {
    paddingHorizontal: 19,
  },
});
