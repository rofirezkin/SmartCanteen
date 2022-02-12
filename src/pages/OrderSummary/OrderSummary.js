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
import {listData, method, paymentMethod} from '../../utils/ListData';
import useForm from '../../utils/useForm';

import {useDispatch, useSelector} from 'react-redux';
import {getChatTime, getUidTime, showMessage} from '../../utils';
import {setLoading} from '../../redux/action';
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
  const dispatch = useDispatch();
  const {cartItems, optionReducer} = useSelector(state => state);
  const methodUser = optionReducer;
  const allCart = cartItems.allCart;
  const [getKodeTransaksi, setGetKodeTransaksi] = useState('');
  const [showWarningOpen, SetshowWarningOpen] = useState(false);
  const [midtransUrl, setMidtransUrl] = React.useState('');
  const [userApk, setUserApk] = useState('');
  const [token, setToken] = useState('');
  const [orderId, setOrderId] = React.useState('');
  let arrayData = {};
  let namaTenant = '';
  let lokasiTenant = '';
  if (params.status) {
    arrayData = params.data.data;
    namaTenant = params.data.nama_tenant;
    lokasiTenant = params.data.lokasi_kantin;
  } else {
    arrayData = params.data;
    namaTenant = params.nama_tenant;
    lokasiTenant = params.lokasi_kantin;
  }

  useEffect(() => {
    user();
    getData('token').then(resToken => {
      console.log('userToken', resToken.value);
      setToken(resToken.value);
      axios
        .get(`${ENDPOINT_API_SMART_CANTEEN}transactions/getKode`, {
          headers: {
            Authorization: `Bearer ${resToken.value}`,
          },
        })
        .then(res => {
          console.log('resss data kode', res.data.data);
          setGetKodeTransaksi(res.data.data);
          getData('userApk').then(res => {
            console.log('user nihh', res.value);
            setUserApk(res.value);
          });
        })
        .catch(err => {
          console.log('test', err.response);
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
    paymentMethod: 'Cash',
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

    const totalPrice = dataNilai + 2000 + 100;
    if (condition == 'item') {
      return totalItem;
    } else if (condition == 'total') {
      return totalPrice;
    } else if (condition == 'order') {
      return dataNilai;
    }
  };

  // //midtrans setting
  // const SubmitTopUp = async () => {
  //   axios
  //     .post(`https://emoneydti.basicteknologi.co.id/index.php/api/snap/token`, {
  //       id_user: profile.numberId,
  //       nominal_topup: sumData('total'),
  //     })
  //     .then(function (response) {
  //       console.log('bugr', response.data.data);
  //       setMidtransUrl(response.data.data.redirect_url);
  //       setOrderId(response.data.data.order_id);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  //end midtrans

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
  console.log('testing ', dateForTransaction);

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
      phoneNumber: profile.phone,
      is_cash: form.paymentMethod,
      total: arrayData[i].totalOrder,
    };
    sendData.push(data);
  }

  // useEffect(() => {

  // }, []);

  const apiSubmit = async () => {
    dispatch(setLoading(true));
    const dataSubmit = await axios({
      method: 'POST',
      url: `${ENDPOINT_API_SMART_CANTEEN}transactions/add`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: sendData,
    })
      .then(res => {
        notif.localNotif();
        dispatch(setLoading(false));
        const dataOrder = {
          methodPayment: form.paymentMethod,
          total: sendData[0].total,
        };
        if (paymentMethod == 'Online Payment') {
          navigation.reset({
            index: 0,
            routes: [{name: 'SuccessOrder', params: dataOrder}],
          });
        } else {
          navigation.reset({
            index: 0,
            routes: [{name: 'SuccessOrder', params: dataOrder}],
          });
        }
      })
      .catch(err => {
        dispatch(setLoading(false));
        console.log(err.response);
      });

    return Promise.resolve(dataSubmit);
  };
  const apiSubmitCart = async () => {
    dispatch(setLoading(true));
    const dataSubmit = await axios({
      method: 'POST',
      url: `${ENDPOINT_API_SMART_CANTEEN}transactions/add`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: sendData,
    })
      .then(res => {
        notif.localNotif();
        delete allCart[arrayData[0].id_tenant];

        const dataOrder = {
          methodPayment: form.paymentMethod,
          total: sendData.total,
        };
        storeData('dataCart', allCart);
        dispatch(setLoading(false));
        if (paymentMethod == 'Online Payment') {
          navigation.reset({
            index: 0,
            routes: [{name: 'SuccessOrder', params: dataOrder}],
          });
        } else {
          navigation.reset({
            index: 0,
            routes: [{name: 'SuccessOrder', params: dataOrder}],
          });
        }
      })
      .catch(err => {
        dispatch(setLoading(false));

        console.log(err.response);
      });

    return Promise.resolve(dataSubmit);
  };

  const onSubmit = async () => {
    if (form.paymentMethod == 'Online Payment') {
      // SubmitTopUp();
      showMessage('Saat Ini tidak bisa melakukan online Payment');
    } else {
      apiSubmit();
    }
  };

  const onSubmitDeleteCart = async () => {
    if (form.paymentMethod == 'Online Payment') {
      showMessage('Saat Ini tidak bisa melakukan online Payment');
      // SubmitTopUp();
    } else {
      apiSubmitCart();
    }
  };

  if (midtransUrl != '') {
    return (
      <>
        <Header
          title="Online Payment"
          onBack
          onPress={() => setMidtransUrl('')}
        />
        <WebView
          source={{uri: midtransUrl}}
          onNavigationStateChange={navState => {
            if (navState.url.search('basicteknologi.co.id') > 0) {
              // navigation.navigate('TopUpSuccess', {
              //   orderId: orderId,
              // });

              if (params.status) {
                apiSubmit(orderId);
              } else {
                apiSubmitCart(orderId);
              }
            }
          }}
        />
      </>
    );
  }

  console.log('userr pkc', userApk.id);
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
              return (
                <View style={styles.content}>
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
                      Jumlah pesanan: {res.totalItem}x
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
            <ItemValue title="Tax 10%" value={1000} />
            <ItemValue title="Services Price" value={2000} />
            <ItemValue
              title="Total Price"
              colorValue
              value={sumData('total')}
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
