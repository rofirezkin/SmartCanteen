import axios from 'axios';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {ILSuccessOrder} from '../../assets';
import {Button, Gap, Header} from '../../components';
import NotifService from '../../utils/notification/NotifService';
import Number from '../../utils/Number/Number';

const SuccessOrder = ({navigation, route}) => {
  const dataOrder = route.params;
  console.log('data order', dataOrder.detailData);

  const onNotif = notif => {
    Alert.alert(notif.title, notif.message);
    navigation.replace('MainApp', {screen: 'Transaction'});
  };
  const notif = new NotifService(onNotif);

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Image source={ILSuccessOrder} style={styles.icon} />
        <Gap height={15} />
        <View>
          <Gap height={10} />
          <Text style={{fontSize: 20, textAlign: 'center'}}>
            You’ve Made Order
          </Text>
          {dataOrder.methodPayment == 'Cash' && (
            <Text style={{fontSize: 16, textAlign: 'center'}}>
              Please pay {` `}
              <Number number={dataOrder.total} /> {` `}
              to the tenant. View my order for more information
            </Text>
          )}

          <Gap height={20} />

          <Gap height={20} />
        </View>
        <Gap height={15} />
        <View>
          <Gap height={20} />
          <Button
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [
                  {name: 'OrderDetail', params: dataOrder.detailData[0]},
                ],
              })
            }
            label="View My Order"
          />
        </View>
      </View>
    </View>
  );
};

export default SuccessOrder;

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    justifyContent: 'center',
    flex: 1,
    padding: 21,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
  },
  subtitle: {
    textAlign: 'center',
    color: '#8D92A3',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  icon: {
    width: 145,
    height: 209,
  },
  container: {
    alignItems: 'center',
  },
});
