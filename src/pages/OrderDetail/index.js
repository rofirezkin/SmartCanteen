import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Gap, Header, ItemListFood, ItemValue} from '../../components';
import {getDetailProgress, setLoading} from '../../redux/action';
import {showMessage} from '../../utils';
import {ENDPOINT_API_SMART_CANTEEN} from '../../utils/API/httpClient';
import {getData} from '../../utils/AsyncStoreServices';

const OrderDetail = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [detailData, setDetailData] = useState([]);
  const [token, setToken] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const params = route.params;
  console.log(route.params);
  console.log('detail progress', params.id_tenant);

  useEffect(() => {
    getData('token').then(resToken => {
      setToken(resToken.value);
      axios
        .get(
          `${ENDPOINT_API_SMART_CANTEEN}transactions/user/detail?kode_transaksi=${params.kode_transaksi}&nim=6705184061&status=${params.status}`,
          {
            headers: {
              Authorization: `Bearer ${resToken.value}`,
            },
          },
        )
        .then(res => {
          console.log('ressssss', res);
          const dataOrder = res.data.data;
          console.log('dataaa', dataOrder[0].is_cash);
          setPaymentMethod(dataOrder[0].is_cash);
          setDetailData(res.data.data);
        })
        .catch(err => {
          console.log('eror pada detail order data', err);
        });
    });

    // dispatch(getDetailProgress(params.nim, params.idTenant));
  }, [params]);

  var totalPrice = 3000;
  var totalItem = 0;
  for (let i = 0; i < detailData.length; i++) {
    totalPrice += +detailData[i].total;
    totalItem += +detailData[i].total;
  }

  const onCancel = async () => {
    const status = {
      status: 'CANCEL ORDER',
    };
    dispatch(setLoading(true));
    const dataSubmit = await axios({
      method: 'POST',
      url: `${ENDPOINT_API_SMART_CANTEEN}transactions/user/updateStatus?kode_transaksi=${params.kode_transaksi}&status=CANCEL`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: status,
    })
      .then(res => {
        dispatch(setLoading(false));
        showMessage('Cancel your Order Success', 'success');
        navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
      })
      .catch(err => {
        dispatch(setLoading(false));
        console.log(err.response);
      });

    return Promise.resolve(dataSubmit);
  };

  console.log('detail data', detailData);

  const feedbackTenant = () => {
    dispatch(setLoading(true));
    axios
      .get(`${ENDPOINT_API_SMART_CANTEEN}getTenant?id=${params.id_tenant}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        const dataCanteen = res.data.data;
        const dataTenant = {
          quantity: parseInt(params.quantity),
          kode_transaksi: params.kode_transaksi,
          tenant: dataCanteen,
        };
        console.log('data canteen', dataCanteen);
        navigation.navigate('FeedbackPage', dataTenant);
        dispatch(setLoading(false));
      })
      .catch(err => {
        dispatch(setLoading(false));
        showMessage('error get data detail tenant, hubungi Admin ');
        console.log('resss', err.response);
      });
  };

  return (
    <ScrollView>
      <View style={styles.page}>
        <Header
          title="Order Detail"
          onBack
          subtTitle="You deserve better meal"
          onPress={() => navigation.goBack()}
        />
        <View style={styles.container}>
          <View>
            {detailData.map(res => {
              return (
                <>
                  <ItemListFood
                    type="product"
                    items={res.quantity}
                    canteen={res.method}
                    totalOrder={res.total}
                    name={res.name}
                    key={res.name}
                    // status={params.status}
                    urlPhoto={res.picturePath}
                  />
                </>
              );
            })}
          </View>
          <View style={styles.detailCard}>
            <Text style={styles.text}>Detail Transaction</Text>
            <ItemValue title={`Nama Kantin`} name={params.nama_tenant} />
            <ItemValue title={`Lokasi Kantin`} name={params.lokasi_kantin} />
            <ItemValue
              title={`Total Price ${params.quantity} Item`}
              value={totalItem}
            />
            <ItemValue title={`Tax`} value="1.000" />
            <ItemValue title={`Services Price`} value="2.000" />
            <ItemValue title={`Total`} colorValue value={totalPrice} />
            <Gap height={15} />
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.detailCard}>
            <Text style={styles.text}>Order Status</Text>
            <Gap height={15} />
            <ItemValue
              title={`Kode Transaksi:  ${params.kode_transaksi}`}
              colorValue={params.status}
              name={params.status}
            />
            <ItemValue
              title={`Payment Method:`}
              colorValue={params.status}
              name={paymentMethod == 0 ? 'Cash' : 'Online Payment'}
            />
            <Gap height={15} />
          </View>
        </View>

        <View style={styles.detailCard}>
          {params.status === 'PENDING' && (
            <Button
              label="Cancel My Order"
              textColor="red"
              color="white"
              onPress={onCancel}
            />
          )}
          {params.status === 'FEEDBACK' && (
            <Button
              label="Rate Your Order"
              color="red"
              onPress={feedbackTenant}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default OrderDetail;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  detailCard: {
    paddingHorizontal: 19,
    marginVertical: 15,
  },
  container: {
    backgroundColor: 'white',
    marginTop: 15,
  },
  text: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    fontWeight: 'bold',
  },
});
