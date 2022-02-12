import axios from 'axios';
import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {Button, Gap, Header, ItemListFood, ItemValue} from '../../components';
import {setLoading} from '../../redux/action';
import {showMessage} from '../../utils';
import {
  ENDPOINT_API_SMART_CANTEEN,
  ENDPOINT_SMART_CANTEEN,
} from '../../utils/API/httpClient';

const OrderDetail = ({ navigation, route }) => {

  const dispatch = useDispatch();
  const params = route.params;
  console.log(route.params.id);

  useEffect(() => {fai
    axios.get(`http://27.112.78.169/api/transactions/user/detail?id_transaksi=${route.params}`).then(res => {
      console.log('testing data', res)
    }).catch(err => {
      console.log('err',err)
    })
  },[])

  const onCancel = async () => {
    const status = {
      status: 'CANCEL ORDER',
    };
    dispatch(setLoading(true));
    const dataSubmit = await axios({
      method: 'POST',
      url: `${ENDPOINT_API_SMART_CANTEEN}transactions/user/updateStatus/${route.params.id}`,
      headers: {
        'Content-Type': 'application/json',
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

  
  console.log('daad', params);
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
            <ItemListFood
              type="product"
              items={params.quantity}
              canteen={params.method}
              totalOrder={params.menu.price}
              name={params.menu.name}
              ingredients={params.menu.ingredients}
              status={params.status}
              urlPhoto={params.menu.picturePath}
            />
          </View>
          <View style={styles.detailCard}>
            <Text style={styles.text}>Detail Transaction</Text>

            <ItemValue
              title={`Total Price ${params.quantity} Item`}
              colorValue
              value={params.total}
            />
            <Gap height={15} />
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.detailCard}>
            <Text style={styles.text}>Order Status</Text>
            <Gap height={15} />
            <ItemValue
              title={`Kode Transaksi:  ${params.kode_transaksi}`}
              colorValue
              name={params.status}
            />
            <Gap height={15} />
          </View>
        </View>

        <View style={styles.detailCard}>
          {params.status === 'PENDING' && (
            <Button
              label="Cancel My Order"
              color="#8D92A3"
              onPress={onCancel}
            />
          )}
          {params.status === 'FEEDBACK' && (
            <Button
              label="Rate Your Order"
              color="red"
              onPress={() => navigation.navigate('FeedbackPage', params)}
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
    marginTop: 15,
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
