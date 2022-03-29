import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import {useDispatch, useSelector} from 'react-redux';
import {
  Button,
  Gap,
  Header,
  ItemListFood,
  ItemValue,
  Link,
  UploadProofPayment,
} from '../../components';
import {getDetailProgress, setLoading} from '../../redux/action';
import {showMessage} from '../../utils';
import {ENDPOINT_API_SMART_CANTEEN} from '../../utils/API/httpClient';
import {getData} from '../../utils/AsyncStoreServices';

const OrderDetail = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [detailData, setDetailData] = useState([]);
  const [token, setToken] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [dataPhoto, setDataPhoto] = useState('');
  const [fileSelected, setFileSelected] = useState(false);
  const [errorGetData, setErrorGetData] = useState(false);

  const params = route.params;
  console.log(route.params);
  console.log('detail progress', params);

  useEffect(() => {
    dispatch(setLoading(true));
    getData('token').then(resToken => {
      setToken(resToken.value);
      axios
        .get(
          `${ENDPOINT_API_SMART_CANTEEN}transactions/user/detail?kode_transaksi=${params.kode_transaksi}&nim=${params.numberId}&status=${params.status}`,
          {
            headers: {
              Authorization: `Bearer ${resToken.value}`,
            },
          },
        )
        .then(res => {
          console.log('ressssss ini detail', res);
          const dataOrder = res.data.data;

          setPaymentMethod(dataOrder[0].is_cash);
          setDetailData(res.data.data);
          dispatch(setLoading(false));
        })
        .catch(err => {
          dispatch(setLoading(false));
          console.log('eror pada detail order data', err);
          setErrorGetData(true);
          Alert.alert('Error!', 'Error Get Data');
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

  const addPhoto = () => {
    launchImageLibrary(
      {
        quality: 1,
      },
      response => {
        if (response.didCancel || response.error) {
          showMessage('Anda tidak memilih photo');
        } else {
          console.log('reessspone image', response.assets[0].uri);
          const source = {uri: response.assets[0].uri};
          const dataImage = {
            uri: response.assets[0].uri,
            type: response.assets[0].type,
            name: response.assets[0].fileName,
          };
          console.log('urri', response.assets[0]);
          setDataPhoto(dataImage);
          setFileSelected(true);
        }
      },
    );
  };

  const uploadProofPayment = () => {
    const photoForUpload = new FormData();
    photoForUpload.append('file', dataPhoto);

    console.log('param id', photoForUpload);
    dispatch(setLoading(true));
    axios
      .post(
        `${ENDPOINT_API_SMART_CANTEEN}transactions/user/upload-bukti-bayar/${params.id}`,
        photoForUpload,
        {
          headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      .then(res => {
        console.log('rees data upload ', res);
      })
      .catch(err => {
        dispatch(setLoading(false));
        showMessage('error upload bukti pembayaran, hubungi admin ');
        console.log('resss', err);
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
        {!errorGetData && (
          <>
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
                <ItemValue
                  title={`Lokasi Kantin`}
                  name={params.lokasi_kantin}
                />
                <ItemValue
                  title={`Total Price ${params.quantity} Item`}
                  value={totalItem}
                />
                <ItemValue title={`Tax`} value="1.000" />
                <ItemValue title={`Services Price`} value="2.000" />
                <ItemValue title={`Total`} colorValue value={totalPrice} />
                <Link
                  title="Show QRIS Tenant"
                  linkPayment
                  onPress={() => navigation.navigate('QRCodeGenerator')}
                />
                <Gap height={15} />
              </View>
            </View>
            {paymentMethod == 0 && (
              <UploadProofPayment
                addPhoto={addPhoto}
                onPress={uploadProofPayment}
                fileSelected={fileSelected}
              />
            )}
            <View style={styles.container}>
              <View style={styles.detailCard}>
                <Link
                  title="Lihat Bukti Pembayaran"
                  linkPayment
                  onPress={() => navigation.navigate('ImagePayment')}
                />
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
                  name={paymentMethod == 1 ? 'Cash' : 'QRIS Payment'}
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
          </>
        )}
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
