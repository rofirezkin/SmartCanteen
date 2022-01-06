import axios from 'axios';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {ILSuccessOrder} from '../../assets';
import {Button, Gap, Header} from '../../components';

const SuccessOrder = ({navigation, route}) => {
  const orderId = route.params;
  const [nominalTopUp, setNominalTopUp] = React.useState('');
  const [transactionTime, setTransactionTime] = React.useState('');
  const [bank, setBank] = React.useState('');
  const [vaNumber, setVaNumber] = React.useState('');
  const [transactionStatus, setTransactionStatus] = React.useState('');
  console.log('route', orderId);
  React.useEffect(() => {
    axios
      .get(
        `https://emoneydti.basicteknologi.co.id/index.php/api/snap/transactionstatus?order_id=${orderId}`,
      )
      .then(res => {
        console.log(res.data);
        setNominalTopUp(res.data.data.nominal_topup);
        setTransactionTime(res.data.data.transaction_time);
        setBank(res.data.data.bank);
        setVaNumber(res.data.data.va_number);
        setTransactionStatus(res.data.data.transaction_status);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Image source={ILSuccessOrder} style={styles.icon} />
        <Gap height={15} />
        <View>
          <Gap height={30} />
          <Text style={{fontSize: 20, textAlign: 'center'}}>
            Your Order Success
          </Text>
          <Text style={{fontSize: 20, textAlign: 'center'}}>
            Rp. {nominalTopUp}
          </Text>
          <Gap height={20} />
          <View
            style={{backgroundColor: '#4982C1', padding: 20, borderRadius: 13}}>
            <Text style={{color: 'white'}}>
              Tanggal Transaksi : {transactionTime}
            </Text>
            <Text style={{color: 'white'}}>Tujuan Pengiriman : {bank}</Text>
            <Text style={{color: 'white'}}>VA Number : {vaNumber}</Text>
            <Text style={{color: 'white'}}>
              Transaction Status : {transactionStatus}
            </Text>
          </View>
          <Gap height={20} />
        </View>
        <Gap height={15} />
        <View>
          <Button
            label="Order Other Food"
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [{name: 'MainApp'}],
              })
            }
          />
          <Gap height={20} />
          <Button
            onPress={() => navigation.replace('MainApp', {screen: 'Order'})}
            label="View My Order"
            color="#8D92A3"
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
