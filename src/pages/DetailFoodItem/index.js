import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {DummyCoverDetail, IcBackFoodCourt} from '../../assets';
import {Button, Counter, Rating} from '../../components';
import {ENDPOINT_SMART_CANTEEN} from '../../utils/API/httpClient';
import Number from '../../utils/Number/Number';
import {getData, removeItem, storeData} from '../../utils/AsyncStoreServices';
import {useDispatch, useSelector} from 'react-redux';

const DetailFoodItem = ({navigation, route}) => {
  const dispatch = useDispatch();
  const params = route.params;
  const id_tenant = params.id_tenant;
  const {allCart} = useSelector(state => state.cartItems);

  console.log('dataaaaa', params);

  console.log('params', allCart);
  const [totalItem, setTotalItem] = useState(1);
  const onCounterChange = value => {
    setTotalItem(value);
  };
  const totalOrder = params.price * totalItem;

  const dataOrder = {
    lokasi_kantin: params.lokasi_kantin,
    nama_tenant: params.nama_tenant,
    picturePath: params.picturePath,

    data: [
      {
        ...params,
        totalItem,
        totalOrder,
        kode_transaksi: 'AD12a3asdasds',
      },
    ],
  };
  const dataTambah = {
    ...params,
    totalItem,
    totalOrder,
    kode_transaksi: 'AD12a3asdasds',
  };

  const directOrder = {
    status: 'direcOrder',
    data: dataOrder,
  };

  const addToCart = async () => {
    if (allCart == null || allCart == '') {
      storeData('dataCart', {[id_tenant]: dataOrder});
    } else {
      if (allCart.hasOwnProperty(`${id_tenant}`)) {
        let getDataId = allCart[id_tenant].data;
        const filterDataIdMenu = () => {
          for (let i = 0; i < getDataId.length; i++) {
            if (allCart[id_tenant].data[i].id == params.id) {
              allCart[id_tenant] = dataOrder;
              storeData('dataCart', allCart);
              return true;
            }
          }
        };
        if (filterDataIdMenu() !== true) {
          allCart[id_tenant].data.push(dataTambah);
          storeData('dataCart', allCart);
        }
      } else {
        allCart[id_tenant] = dataOrder;
        storeData('dataCart', allCart);
      }
    }

    await getData('dataCart').then(res => {
      console.log('res', res);
      dispatch({type: 'GET_DATA_CART', value: res});
    });

    navigation.goBack();
  };

  return (
    <View style={styles.page}>
      <ImageBackground
        source={{
          uri: `${ENDPOINT_SMART_CANTEEN}/storage/${params.picturePath}`,
        }}
        style={styles.cover}>
        <View style={styles.back}>
          <TouchableOpacity
            onPress={
              () => navigation.goBack()
              // navigation.navigate('AllMenuByCategory', [
              //   (titleMenu = params.category_menu),
              //   (paramsQuery = params.category_menu),
              // ])
            }
            activeOpacity={0.5}>
            <IcBackFoodCourt />
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View style={styles.content}>
        <View style={styles.mainContent}>
          <View style={styles.productContainer}>
            <View style={{flex: 1}}>
              <Text style={styles.title}>{params.name}</Text>
            </View>
            <Counter payment onValueChange={onCounterChange} />
          </View>
          <Text style={styles.label}>Deskripsi Makanan</Text>
          <Text style={styles.description}>{params.ingredients}</Text>

          <View>
            <Text style={styles.label}>Harga</Text>
            <Text style={styles.description}>
              <Number number={params.price} />{' '}
            </Text>
          </View>

          <View>
            <Text style={styles.label}>Total Harga</Text>
            <Text style={styles.descriptionTotal}>
              <Number number={totalOrder} />{' '}
            </Text>
          </View>
        </View>

        <View style={styles.buttonCard}>
          <View style={styles.button}>
            <Button
              double
              onPress={addToCart}
              label="Add To Cart"
              color="#B7B7B7"
            />
          </View>
          <View style={styles.button}>
            <Button
              double
              label="Order Now"
              onPress={() => navigation.navigate('OrderSummary', directOrder)}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default DetailFoodItem;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  cover: {
    height: 330,
    resizeMode: 'cover',
  },
  back: {
    position: 'absolute',
    padding: 18,
  },
  mainContent: {
    flex: 1,
  },
  content: {
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginTop: -60,
    paddingTop: 26,
    paddingHorizontal: 19,
    flex: 1,
  },
  buttonCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#020202',
  },
  productContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#8D92A3',
    marginBottom: 10,
  },
  descriptionTotal: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#ED212B',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#020202',
    marginBottom: 4,
  },
});
