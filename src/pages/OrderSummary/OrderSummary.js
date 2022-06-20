import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
} from 'react-native';
import {IcStore} from '../../assets';
import {Button, Gap, Header, ItemValue, Modals, Select} from '../../components';
import {
  ENDPOINT_API_SMART_CANTEEN,
  ENDPOINT_SMART_CANTEEN,
} from '../../utils/API/httpClient';
import {getData, getUser, storeData} from '../../utils/AsyncStoreServices';
import Number from '../../utils/Number/Number';
import {listData, method, noMeja, paymentMethod} from '../../utils/ListData';
import useForm from '../../utils/useForm';

import {useDispatch, useSelector} from 'react-redux';
import {getUidTime, showMessage} from '../../utils';
import {
  postTransaction,
  postTransactionCart,
  setLoading,
} from '../../redux/action';
import WebView from 'react-native-webview';
import NotifService from '../../utils/notification/NotifService';
import axios from 'axios';

const OrderSummary = ({navigation, route}) => {
  const onNotif = notif => {
    Alert.alert(notif.title, notif.message);
    navigation.replace('MainApp', {screen: 'Transaction'});
  };
  const notif = new NotifService(onNotif);
  const params = route.params;
  const deviceToken = params.data.device_token;
  const dispatch = useDispatch();
  const {cartItems, optionReducer, globalReducer} = useSelector(state => state);

  const methodUser = optionReducer;
  const allCart = cartItems.allCart;
  const [getKodeTransaksi, setGetKodeTransaksi] = useState('');
  const [showWarningOpen, SetshowWarningOpen] = useState(false);
  const [kodeUnik, setKodeUnik] = useState('');

  const [userApk, setUserApk] = useState('');
  const [token, setToken] = useState('');

  let arrayData = {};
  let namaTenant = '';
  let lokasiTenant = '';
  let qrString = '';

  if (params.status) {
    arrayData = params.data.data;
    namaTenant = params.data.nama_tenant;
    lokasiTenant = params.data.lokasi_kantin;
    qrString = params.data.qr_string;
  } else {
    arrayData = params.data;
    namaTenant = params.nama_tenant;
    lokasiTenant = params.lokasi_kantin;
    qrString = params.qr_string;
  }

  useEffect(() => {
    dispatch(setLoading(true));
    user();
    getData('token').then(resToken => {
      setToken(resToken.value);
      axios
        .get(
          `${ENDPOINT_API_SMART_CANTEEN}transactions/getKode?nim=${globalReducer.numberId}`,
          {
            headers: {
              Authorization: `Bearer ${resToken.value}`,
            },
          },
        )
        .then(res => {
          dispatch(setLoading(false));
          console.log('res dataa --- kode ', res.data.data);
          setGetKodeTransaksi(res.data.data);

          axios
            .get(
              `${ENDPOINT_API_SMART_CANTEEN}transactions/getUniqCost?nim=${globalReducer.numberId}`,
            )
            .then(res => {
              setKodeUnik(res.data.data);
            });
          getData('userApk').then(res => {
            setUserApk(res.value);
          });
        })
        .catch(err => {
          dispatch(setLoading(false));
          showMessage('Error pada get kode transaksi, hubungi admin');
        });
    });
  }, []);

  const [text, onChangeText] = React.useState('');

  const [form, setForm] = useForm({
    methodUser: methodUser.method,
    location:
      methodUser.method == 'Delivery'
        ? methodUser.location
        : 'Fakultas Ilmu Terapan',
    detailLocation:
      methodUser.method == 'Delivery' ? methodUser.speclocation : '',
    paymentMethod: 'QRIS Payment',
    noTable: '1',
  });
  const [profile, setProfile] = useState({
    fullName: '',
    numberId: '',
    studyProgram: '',
    faculty: '',
    studentClass: '',
    role: '',
    phone: '',
  });

  const sumData = condition => {
    let dataNilai = 0;
    let totalItem = 0;
    for (let i = 0; i < arrayData.length; i++) {
      dataNilai += arrayData[i].totalOrder;
      totalItem += arrayData[i].totalItem;
    }

    const taxPersentase = (11 / 100) * dataNilai;
    const totalPrice = dataNilai + taxPersentase;
    if (condition == 'item') {
      return totalItem;
    } else if (condition == 'total') {
      return totalPrice;
    } else if (condition == 'order') {
      return dataNilai;
    } else if (condition == 'tax') {
      return taxPersentase;
    }
  };

  const user = async () => {
    const dataUser = await getUser();

    setProfile({
      fullName: dataUser.fullName,
      numberId: dataUser.numberId,
      role: dataUser.role,
      phone: dataUser.phone,
    });
  };

  const sendData = [];
  const today = new Date();
  const dateForTransaction = getUidTime(today);

  for (let i = 0; i < arrayData.length; i++) {
    const data = {
      kode_transaksi: getKodeTransaksi,
      id_user: userApk.id,
      nama_pelanggan: profile.fullName,
      nim: profile.numberId,
      id_menu: arrayData[i].id,
      id_tenant: arrayData[i].id_tenant,
      status: 'PENDING',
      method:
        form.methodUser == 'Delivery'
          ? `${form.methodUser}, location : ${form.location}, detail location : ${form.detailLocation}`
          : form.methodUser,
      quantity: arrayData[i].totalItem,
      created_at: dateForTransaction,
      catatan: text == '' ? 'tidak ada' : text,
      phoneNumber:
        profile.phone == undefined
          ? 'tidak ada no Hp'
          : profile.phone == ''
          ? 'tidak ada no Hp'
          : profile.phone,
      is_cash: form.paymentMethod == 'Cash' ? 1 : 0,
      total: arrayData[i].totalOrder,
      no_table: form.noTable,
      kode_uniq: kodeUnik,
      total_order: sumData('total') + kodeUnik,
      tax: sumData('tax'),
    };
    sendData.push(data);
  }

  const apiSubmit = async () => {
    const notifData = {
      to: deviceToken,
      collapse_key: 'type_a',
      notification: {
        android: {
          sound: 'default',
        },
        android_channel_id: 'default-channel-id',
        title: 'Order Pesanan',
        body: 'Pelanggan Memesan Menu Anda',
      },
    };
    const notifJSON = JSON.stringify(notifData);

    dispatch(
      postTransaction(
        sendData,
        notif,
        form,
        navigation,
        paymentMethod,
        notifJSON,
        sumData('total') + kodeUnik,
        token,
        qrString,
        namaTenant,
        lokasiTenant,
        deviceToken,
      ),
    );
  };
  const apiSubmitCart = async () => {
    const notifData = {
      to: params.device_token,
      collapse_key: 'type_a',
      notification: {
        android: {
          sound: 'default',
        },
        android_channel_id: 'default-channel-id',
        title: 'Order Pesanan',
        body: 'Pelanggan Memesan Menu Anda',
      },
    };
    const notifJSON = JSON.stringify(notifData);
    console.log('send data nomor ', sendData);
    dispatch(
      postTransactionCart(
        sendData,
        notif,
        form,
        navigation,
        paymentMethod,
        allCart,
        notifJSON,
        arrayData,
        sumData('total') + kodeUnik,
        token,
        qrString,
        namaTenant,
        lokasiTenant,
        deviceToken,
      ),
    );
  };

  const onSubmit = async () => {
    apiSubmit();
  };

  const onSubmitDeleteCart = async () => {
    apiSubmitCart();
  };

  return (
    <ScrollView>
      <Header
        title="Confirmation Order"
        onBack
        subtTitle="Check your order for confirmation"
        onPress={() => navigation.goBack()}
      />
      <Modals
        type="buka"
        visible={showWarningOpen}
        onRequestClose={() => SetshowWarningOpen(false)}
        showWarningFalse={() => SetshowWarningOpen(false)}
      />
      <View style={styles.page}>
        <View style={styles.container}>
          <View style={styles.header}>
            <IcStore />
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                fontSize: 13,
                marginLeft: 5,
              }}>{`${namaTenant} - ${lokasiTenant}`}</Text>
          </View>
          <View>
            <Gap height={30} />
            {arrayData.map(res => {
              console.log('ressssss', res);
              return (
                <View key={res.id} style={styles.content}>
                  <Image
                    source={{
                      uri: `${ENDPOINT_SMART_CANTEEN}/storage/${res.picturePath}`,
                    }}
                    style={{width: 90, height: 90, borderRadius: 10}}
                  />
                  <View style={{marginLeft: 10, flex: 1}}>
                    <Text style={{fontFamily: 'Poppins-Regular'}}>
                      {res.name}
                    </Text>
                    <Text
                      style={{fontFamily: 'Poppins-Regular', color: '#8D92A3'}}>
                      Jumlah Pesanan: {res.totalItem}x
                    </Text>
                    <Text
                      style={{fontFamily: 'Poppins-Regular', color: '#8D92A3'}}>
                      <Number number={res.totalOrder} />
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
          <View style={styles.detailCardCatatan}>
            <Text style={{fontFamily: 'Poppins-Regular'}}>Catatan: </Text>
            <TextInput
              style={{fontSize: 12, textAlign: 'right'}}
              placeholder="Mohon meninggalkan catatan..."
              onChangeText={onChangeText}
              value={text}
            />
          </View>

          <View style={styles.detailCard}>
            <Text style={styles.text}>Detail Customer</Text>
            <Gap height={10} />
            <ItemValue title={`Customer Name`} name={profile.fullName} />
            <ItemValue title="NIM" name={profile.numberId} />
            <ItemValue title="Status" name={profile.role} />
            <ItemValue title="Phone Number" name={profile.phone} />
            <Gap height={15} />
          </View>
        </View>

        <View style={styles.container}>
          <View style={{paddingVertical: 16}}>
            <Select
              order
              label="Method"
              value={form.methodUser}
              onValueChange={value => setForm('methodUser', value)}
              selectItem={method}
            />
            <Gap height={10} />
            {form.methodUser === 'Dine In' && (
              <View>
                <Gap height={10} />
                <Select
                  order
                  label="No. Table"
                  value={form.noTable}
                  onValueChange={value => setForm('noTable', value)}
                  selectItem={noMeja()}
                />
              </View>
            )}
            {form.methodUser === 'Delivery' && (
              <View>
                <Select
                  order
                  label="Location"
                  value={form.location}
                  onValueChange={value => setForm('location', value)}
                  selectItem={listData}
                />
                <Gap height={10} />
                <TextInput
                  value={form.detailLocation}
                  onChangeText={value => setForm('detailLocation', value)}
                  style={styles.textInput}
                  underlineColorAndroid="transparent"
                  placeholder="input Detail Location"
                />
              </View>
            )}
          </View>
        </View>

        <View style={styles.container}>
          <View style={{paddingVertical: 16}}>
            <Select
              order
              label="Payment Method"
              value={form.paymentMethod}
              onValueChange={value => setForm('paymentMethod', value)}
              selectItem={paymentMethod}
            />
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.detailCard}>
            <Text style={styles.text}>Detail Transaction</Text>
            <Gap height={10} />
            <ItemValue
              title={`Subtotal Item (${sumData('item')} Item)`}
              value={sumData('order')}
            />
            <ItemValue title="Tax 11%" value={sumData('tax')} />
            <ItemValue title="Uniq Code" name={kodeUnik} />

            <ItemValue title="Total Price" value={sumData('total')} />
            <ItemValue
              title="Total to be paid + Uniq Code"
              colorValue
              value={sumData('total') + kodeUnik}
            />

            <Gap height={15} />
          </View>
        </View>
        <Gap height={18} />
        <View style={styles.onSubmit}>
          {getKodeTransaksi != '' && (
            <View>
              {params.status ? (
                <Button label="Order Now" onPress={onSubmit} />
              ) : (
                <Button label="Order Now" onPress={onSubmitDeleteCart} />
              )}
            </View>
          )}
        </View>
        <Gap height={18} />
      </View>
    </ScrollView>
  );
};

export default OrderSummary;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  detailCardCatatan: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#8D92A3',
  },
  detailCard: {
    marginTop: 15,
  },
  content: {
    justifyContent: 'space-between',
    marginTop: 10,
    flexDirection: 'row',
  },
  container: {
    backgroundColor: 'white',
    marginTop: 15,
    paddingHorizontal: 19,
  },
  text: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    paddingTop: 17,
  },
  onSubmit: {
    paddingHorizontal: 19,
  },
  textInput: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
});
