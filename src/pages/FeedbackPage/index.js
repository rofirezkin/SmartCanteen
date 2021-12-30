import axios from 'axios';
import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  Button,
  DetailFoodCourt,
  Gap,
  Header,
  RatingFeedback,
} from '../../components';
import {setLoading} from '../../redux/action';

import {showMessage} from '../../utils';
import {ENDPOINT_API_SMART_CANTEEN} from '../../utils/API/httpClient';

const FeedbackPage = ({navigation, route}) => {
  const dispatch = useDispatch();
  const dataParams = route.params;
  console.log(dataParams);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  const [defaultRating, setDefaultRating] = useState(2);
  const id_tenant = dataParams.id_tenant;

  // Perhitungan Rating inputan user
  const perhitungan = defaultRating * dataParams.quantity;

  // Perhitungan Akhir Database
  var perhitunganAkhirTotal = dataParams.tenant.perhitungan_akhir;
  if (perhitunganAkhirTotal == null) {
    perhitunganAkhirTotal = 0;
  }

  // Perhitungan Jumlah Order
  var totalJumlahOrder = dataParams.tenant.total_jumlah_order;

  if (totalJumlahOrder == null) {
    totalJumlahOrder = 0;
  }

  // ini input database
  var pembagiJumlahOrder = dataParams.quantity + totalJumlahOrder;

  // Perhitungan Akhir
  const a = perhitunganAkhirTotal + perhitungan;
  var b = 0;

  if (totalJumlahOrder == 0) {
    b = a / dataParams.quantity;
  }
  if (totalJumlahOrder > 0) {
    b = a / pembagiJumlahOrder;
  }

  const data1 = {
    rating: b,
  };

  const datab = {
    perhitungan_akhir: a,
  };

  const datac = {
    total_jumlah_order: pembagiJumlahOrder,
  };

  const onSubmit = () => {
    dispatch(setLoading(true));
    const status = {
      status: 'DELIVERED',
    };

    axios.all([
      axios.post(
        `${ENDPOINT_API_SMART_CANTEEN}tenant/rating/${id_tenant}`,
        data1,
      ),
      axios.post(
        `${ENDPOINT_API_SMART_CANTEEN}tenant/updatePerhitunganAkhir/${id_tenant}`,
        datab,
      ),
      axios.post(
        `${ENDPOINT_API_SMART_CANTEEN}tenant/updateTotalJumlahOrder/${id_tenant}`,
        datac,
      ),
      axios
        .post(
          `${ENDPOINT_API_SMART_CANTEEN}transactions/user/updateStatus/${route.params.id}`,
          status,
        )
        .then(
          axios.spread((res1, res2, res3) => {
            dispatch(setLoading(false));
            showMessage(
              'Thankyou for your compliment we are waiting for the next order',
              'success',
            );
            navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
          }),
        )
        .catch(err => {
          dispatch(setLoading(false));
          showMessage('gagal memberikan rating');
          console.log(err.response);
        }),
    ]);
  };

  const starImgFilled =
    'https://github.com/tranhonghan/images/blob/main/star_filled.png?raw=true';
  const startImgCorner =
    'https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png';

  const CusomRatingBar = () => {
    return (
      <View style={styles.customRatingStyle}>
        {maxRating.map((item, key) => {
          return (
            <TouchableOpacity key={item} onPress={() => setDefaultRating(item)}>
              <Image
                style={styles.starImgStyle}
                source={
                  item <= defaultRating
                    ? {uri: starImgFilled}
                    : {uri: startImgCorner}
                }
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.page}>
      <Header
        subtTitle={dataParams.tenant.nama_tenant}
        title="Feedback for Canteen"
        onBack
        onPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <DetailFoodCourt
          nameCanteen={dataParams.tenant.nama_tenant}
          desc={dataParams.tenant.desc_kantin}
          locKantin={dataParams.tenant.lokasi_kantin}
          image={dataParams.tenant.profile_photo_path}
          rating={dataParams.tenant.rating}
          type
        />
        <Gap height={20} />
        <View style={styles.rating}>
          <CusomRatingBar />
          <View style={{alignItems: 'center', marginTop: 20}}>
            <Text style={{fontFamily: 'Poppins-Medium', fontSize: 15}}>
              {defaultRating + '/' + maxRating.length}
            </Text>
          </View>
        </View>
        <Gap height={15} />
        {/* <TextInput
          style={styles.textArea}
          underlineColorAndroid="transparent"
          placeholder="Isi Feedback anda disini"
          placeholderTextColor="grey"
          numberOfLines={5}
          multiline={true}
          //   onChangeText={value => setDescription(value)}
          //   value={description}
        /> */}

        <Gap height={15} />
        <Button label="Submit" onPress={onSubmit} />
      </View>
    </View>
  );
};

export default FeedbackPage;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    marginTop: 15,
    paddingHorizontal: 19,
    paddingTop: 15,
    flex: 1,
    backgroundColor: 'white',
  },
  rating: {
    backgroundColor: '#F3F4F8',
    padding: 15,
    alignSelf: 'center',
  },
  textArea: {
    borderRadius: 8,
    height: 100,
    padding: 10,
    backgroundColor: '#F3F3F3',
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
  },
  customRatingStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  starImgStyle: {
    width: 25,
    height: 25,
    resizeMode: 'cover',
  },
});
