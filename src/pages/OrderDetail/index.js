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
import {launchImageLibrary} from 'react-native-image-picker';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
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
import {
  skeletonChooseFood,
  skeletonDetailFood,
  skeletonDetailTransaction,
} from '../../components/skeleton/skeletonHome';
import {setLoading, uploadPembayaranAction} from '../../redux/action';
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
  const [loadingSkeleton, setLoadingSkeleton] = useState(true);
  const [photoProofPayment, setPhotoProofPayment] = useState(null);

  const params = route.params;

  console.log('kodeee', params);
  console.log('num id', params.numberId);
  console.log('num idfsf', params.created_at);

  useEffect(() => {
    getData('token')
      .then(resToken => {
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
            console.log('ressssss ini detail', res.data);
            setLoadingSkeleton(false);
            const dataOrder = res.data.data;
            setPhotoProofPayment(res.data.data[0].photo_bukti_pembayaran);

            setPaymentMethod(dataOrder[0].is_cash);
            setDetailData(res.data.data);
          })
          .catch(err => {
            setLoadingSkeleton(false);
            console.log('eror pada detail order data', err);
            setErrorGetData(true);
            Alert.alert('Error!', 'Error Get Data');
          });
      })
      .catch(err => {
        setLoadingSkeleton(false);
        console.log('gagal get token');
      });

    // dispatch(getDetailProgress(params.nim, params.idTenant));
  }, [params]);

  var totalPrice = 3000;
  var totalItem = 0;
  for (let i = 0; i < detailData.length; i++) {
    totalPrice += +detailData[i].total;
    totalItem += +detailData[i].total;
  }
  const dataQr = {
    qrString: params.qr_string,
    total: totalPrice,
    namaTenant: params.nama_tenant,
    order: true,
  };
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
        quality: 0.5,
        includeBase64: true,
      },
      response => {
        if (response.didCancel || response.error) {
          showMessage('Anda tidak memilih photo');
        } else {
          console.log('reessspone image', response);
          const source = `data:${response.assets[0].type};base64, ${response.assets[0].base64}`;

          console.log('urri', response.assets[0]);
          setDataPhoto(source);
          setFileSelected(true);
        }
      },
    );
  };

  const uploadProofPayment = () => {
    const kodeTransaksi = params.kode_transaksi;
    const idTenant = params.id_tenant;
    dispatch(setLoading(true));
    console.log('dataaaa phh', dataPhoto);
    dispatch(
      uploadPembayaranAction(
        dataPhoto,
        token,
        kodeTransaksi,
        navigation,
        idTenant,
      ),
    );
  };

  return (
    <ScrollView>
      <Header
        title="Order Detail"
        onBack
        subtTitle="You deserve better meal"
        onPress={() => navigation.goBack()}
      />
      <SkeletonContent
        containerStyle={{flex: 1}}
        isLoading={loadingSkeleton}
        layout={skeletonDetailTransaction}>
        <View style={styles.page}>
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
                  {paymentMethod == 0 && (
                    <Link
                      title="Show QRIS Tenant"
                      linkPayment
                      onPress={() =>
                        navigation.navigate('QRCodeGenerator', dataQr)
                      }
                    />
                  )}
                  <Gap height={15} />
                </View>
              </View>
              {paymentMethod == 0 &&
                photoProofPayment == null &&
                params.status !== 'CANCEL ORDER' &&
                params.status !== 'DELIVERED' && (
                  <UploadProofPayment
                    addPhoto={addPhoto}
                    onPress={uploadProofPayment}
                    fileSelected={fileSelected}
                  />
                )}
              {photoProofPayment != null && (
                <View style={styles.container}>
                  <View style={styles.detailCard}>
                    <Link
                      title="Show Proof Payment"
                      linkPayment
                      onPress={() =>
                        navigation.navigate('ImagePayment', photoProofPayment)
                      }
                    />
                  </View>
                </View>
              )}

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
                    colorValue="DELIVERED"
                    name={paymentMethod == 1 ? 'Cash' : 'QRIS Payment'}
                  />
                  <ItemValue title={`Created at`} name={params.created_at} />
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
      </SkeletonContent>
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
