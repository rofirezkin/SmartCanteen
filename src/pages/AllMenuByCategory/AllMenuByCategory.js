import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {IcBackFoodCourt, IcLocation, ILBannerRec} from '../../assets';
import {Gap, Rating} from '../../components';
import {
  ENDPOINT_API_SMART_CANTEEN,
  ENDPOINT_SMART_CANTEEN,
} from '../../utils/API/httpClient';
import {normalizeFont} from '../../utils/normalizeFont';

const AllMenuByCategory = ({route, navigation}) => {
  const title = route.params;

  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const getItems = async () => {
    setIsLoading(true);
    await axios
      .get(
        `${ENDPOINT_API_SMART_CANTEEN}users/menu/fetch?page=${currentPage}&category_menu=${title[1]}`,
      )
      .then(res => {
        console.log('dadssddsss ini ambil string', res.data.data);
        setItems([...items, ...res.data.data.data]);
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err.message);
      });
  };

  const renderItem = ({item}) => {
    console.log('ssdssdsds', item.qr_string);
    const nameCanteen = `${item.name} - ${item.nama_tenant}`;
    var length = 60;
    if (nameCanteen.length > 60) {
      var trimmedString = nameCanteen.substring(0, length);
      var result = `${trimmedString}...`;
    } else {
      var result = `${item.name} - ${item.nama_tenant}`;
    }
    console.log('item', item.is_active);
    if (item.status == 'inactive' || item.is_active == 'Tidak Tersedia') {
      return (
        <View style={styles.wrapperItem2}>
          <Image
            style={styles.imageItems}
            source={{
              uri: `${ENDPOINT_SMART_CANTEEN}/storage/${item.picturePath}`,
            }}
          />
          <View style={styles.itemContent}>
            <Text style={styles.titleConten}>{result}</Text>
            <Text style={styles.descConten}>{item.category}</Text>
            <View style={{flexDirection: 'row', flex: 1}}>
              <IcLocation style={{marginRight: 5, marginTop: 2}} />
              <Text style={styles.descContenlokasi}>{item.lokasi_kantin}</Text>
            </View>
            <Rating number={item.rating} />
          </View>
        </View>
      );
    }

    return (
      <TouchableOpacity
        style={styles.wrapperItem}
        onPress={() => navigation.navigate('DetailFoodItem', item)}>
        <Image
          style={styles.imageItems}
          source={{
            uri: `${ENDPOINT_SMART_CANTEEN}/storage/${item.picturePath}`,
          }}
        />
        <View style={styles.itemContent}>
          <Text style={styles.titleConten}>{result}</Text>
          <Text style={styles.descConten}>{item.category}</Text>
          <View style={{flexDirection: 'row', flex: 1}}>
            <IcLocation style={{marginRight: 5, marginTop: 2}} />
            <Text style={styles.descContenlokasi}>{item.lokasi_kantin}</Text>
          </View>
          <Rating number={item.rating} />
        </View>
      </TouchableOpacity>
    );
  };

  const renderLoader = () => {
    return isLoading ? (
      <View style={{marginVertical: 16, alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    ) : null;
  };

  const loadMoreItem = () => {
    if (items.length > 5) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    getItems();
  }, [currentPage]);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={ILBannerRec}
        style={{
          width: '100%',
          height: 120,
          resizeMode: 'cover',
          backgroundColor: '#ED212B',
        }}>
        <View style={styles.back}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.5}>
            <IcBackFoodCourt />
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <Gap height={10} />
      <View style={styles.title}>
        <Text style={styles.textTitle}>{title[0]}</Text>
        <Text style={styles.desc}>
          Pilih menu favorite kamu dibawah ini, semua tersaji secara higenis dan
          terasa nikmat
        </Text>
      </View>
      <View style={styles.content}>
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={items => items.kode_menu}
          ListFooterComponent={renderLoader}
          onEndReached={loadMoreItem}
          onEndReachedThreshold={0}
        />
      </View>
    </View>
  );
};

export default AllMenuByCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
  },
  back: {
    position: 'absolute',
    padding: 18,
  },
  desc: {
    fontSize: normalizeFont(12),
    fontFamily: 'Poppins-Regular',
    color: '#8D92A3',
  },
  textTitle: {
    fontSize: normalizeFont(15),
    fontFamily: 'Poppins-Regular',
  },
  wrapperItem: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  wrapperItem2: {
    opacity: 0.5,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  imageItems: {
    borderRadius: 10,
    width: 90,
    height: 90,
    marginRight: 16,
    resizeMode: 'cover',
  },
  itemContent: {
    flex: 1,
    justifyContent: 'center',
  },
  titleConten: {
    fontSize: normalizeFont(13),
    fontFamily: 'Poppins-SemiBold',
  },
  descConten: {
    fontSize: normalizeFont(11),
    fontFamily: 'Poppins-Regular',
    color: '#8D92A3',
  },
  descContenlokasi: {
    fontSize: normalizeFont(11),
    fontFamily: 'Poppins-Regular',
    color: '#8D92A3',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
