import React from 'react';
import {ScrollView, StyleSheet, Text, View, Alert} from 'react-native';
import {
  Button,
  DropOffLocation,
  Gap,
  Header,
  Select,
  TextInput,
} from '../../components';
import {RadioButton} from 'react-native-paper';
import {ICLocation} from '../../assets';
import useForm from '../../utils/useForm';
import {listData} from '../../utils/ListData';
import {showMessage} from '../../utils';
import {useDispatch} from 'react-redux';

const Delivery = ({navigation}) => {
  const [value, setValue] = React.useState('');
  const dispatch = useDispatch();
  const [form, setForm] = useForm({
    speclocation: '',
    location: 'Fakultas Ilmu Terapan',
  });

  const onDropValue = () => {
    if (form.speclocation !== '') {
      dispatch({type: 'SET_LOCATION_USER', value: form});
      navigation.navigate('Canteen', 'Delivery');
    } else {
      showMessage('Anda belum mengisi spesifik lokasi');
    }
  };

  return (
    <ScrollView>
      <View style={styles.page}>
        <Header
          title="Drop Off Location"
          subtTitle="Select your drop off location"
          onBack
          onPress={() => navigation.goBack()}
        />

        <View style={styles.container}>
          <View style={styles.containerRadioTitle}>
            <ICLocation />
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Poppins-Regular',
                color: '#020202',
              }}>
              Pilih Lokasi Antar:{' '}
            </Text>
          </View>
          <Gap height={9} />
          <Select
            label="Pilih lokasi"
            value={form.location}
            onValueChange={value => setForm('location', value)}
            selectItem={listData}
          />
          <Gap height={12} />
          <TextInput
            longInput
            label="Spesifikasi Lokasi"
            underlineColorAndroid="transparent"
            placeholder="Isi lokasi lengkap"
            placeholderTextColor="grey"
            numberOfLines={2}
            onChangeText={value => setForm('speclocation', value)}
            value={form.speclocation}
          />
          <Gap height={15} />
          <Button label="Confirm Your Location" onPress={onDropValue} />
          <Gap height={15} />
        </View>
      </View>
    </ScrollView>
  );
};

export default Delivery;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  cardDelivery: {
    marginTop: 7,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    paddingHorizontal: 10,
  },
  container: {
    marginTop: 15,
    paddingHorizontal: 19,
    flex: 1,
    backgroundColor: 'white',
  },
  button: {
    paddingHorizontal: 19,
  },
  containerRadioTitle: {
    flexDirection: 'row',
    marginRight: 5,
  },
  containerRadio: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radio: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#909090',
  },
  input: {
    width: 70,
  },
});
