import React, { useEffect, useState } from 'react';
import {ScrollView, StyleSheet, Text, View, Image, TextInput} from 'react-native';
import { IcStore } from '../../assets';
import {Button, Gap, Header, ItemListFood, ItemValue} from '../../components';
import { ENDPOINT_SMART_CANTEEN } from '../../utils/API/httpClient';
import { getUser } from '../../utils/AsyncStoreServices';
import Number from '../../utils/Number/Number';

const OrderSummary = ({navigation, route}) => {

  const params = route.params;
  const [text, onChangeText] = React.useState('');
  const [profile, setProfile] = useState({
    fullName: '',
    numberId: '',
    studyProgram: '',
    faculty: '',
    studentClass: '',
    role: '',
    phone: ''
  });



  const totalPrice = params.totalOrder + 1000 + 2000

  const user = async () => {
    const dataUser = await getUser();

    setProfile({
      fullName: dataUser.fullName,
      numberId: dataUser.numberId,
      role: dataUser.role,
      phone: dataUser.phone
    });
  };

  const dataSubmitOrder = {
      id_menu
  }

  const onSubmit =  () => {
      
  }

  useEffect(() => {
    user()
  },[])

  console.log(params)
  return (
    <ScrollView>
        <Header
          title="Confirmation Order"
          onBack
          subtTitle="Check your order for confirmation"
          onPress={() => navigation.goBack()}
        />
      <View style={styles.page}>
        <View style={styles.container}>
          <View style={styles.header}>
             <IcStore />
            <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 13, marginLeft: 5 }}>{`${params.nama_tenant} - ${params.lokasi_kantin}`}</Text>
          </View>
          <View style={styles.content}>
                <Gap height={30} />
                <Image source={{ uri: `${ENDPOINT_SMART_CANTEEN}/storage/${params.picturePath}` }} style={{ width: 90, height: 90, borderRadius: 10 }} />
                <View style={{ marginLeft: 10 }}>
                    <Text style={{ fontFamily: 'Poppins-Regular', width:250 }}>{params.name}</Text>
                    <Text style={{ fontFamily: 'Poppins-Regular', width:250, color:'#8D92A3' }}>Jumlah pesanan: {params.totalItem}x</Text>
                    <Text style={{ fontFamily: 'Poppins-Regular', width:250, color:'#8D92A3' }}><Number number={params.totalOrder} /></Text>
                </View>
          </View>
          <View style={styles.detailCardCatatan}>
            <Text style={{ fontFamily: 'Poppins-Regular'}}>Catatan: </Text>
            <TextInput 
                style={{ fontSize: 12, textAlign: 'right' }}  
                placeholder="Mohon meninggalkan catatan..." 
                onChangeText={onChangeText}
                value={text}
                />
          </View>

         <View style={styles.detailCard}>
            <Text style={styles.text}>Detail Customer</Text>
            <Gap height={10} />
            <ItemValue title={`Customer Name`} name={profile.fullName}/>
            <ItemValue title="NIM" name={profile.numberId} />
            <ItemValue title="Status" name={profile.role} />
            <ItemValue title="Phone Number" name={profile.phone} />
            <Gap height={15} />
          </View>

          <View style={styles.detailCard}>
            <Text style={styles.text}>Detail Transaction</Text>
            <Gap height={10} />
            <ItemValue title={`Subtotal Item (${params.totalItem} Item)`} value={params.totalOrder} />
            <ItemValue title="Tax 10%" value={1000} />
            <ItemValue title="Services Price" value={2000} />
            <ItemValue title="Total Price" colorValue value={totalPrice} />
            <Gap height={15} />
          </View>
        </View>

        <View style={styles.detailCard}>
          <Button
            label="Order Now"
            // onPress={() => navigation.navigate('SecureCheckout')}
            onPress={onSubmit}
          />
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
    paddingHorizontal: 19
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
  content:{
    flexDirection: 'row',
    marginTop: 10
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
  header:{

      flexDirection: 'row'
  }
});
