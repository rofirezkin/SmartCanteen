import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {IcBackFoodCourt, ILFoodCourt} from '../../assets';
import {DetailFoodCourt, Gap, Header, SearchInput} from '../../components';
import {ENDPOINT_API_SMART_CANTEEN} from '../../utils/API/httpClient';

const FoodCourt = ({navigation, route}) => {
  const params = route.params;
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const getItems = async () => {
    setIsLoading(true);
    await axios
      .get(
        `${ENDPOINT_API_SMART_CANTEEN}tenant/fetch/several?page=${currentPage}&lokasi_kantin=${params}`,
      )
      .then(res => {
        setItems([...items, ...res.data.data.data]);
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err.message);
      });
  };

  const renderItem = ({item}) => {
    const nameCanteen = `${item.nama_tenant}`;
    var length = 60;
    if (nameCanteen.length > 60) {
      var trimmedString = nameCanteen.substring(0, length);
      var result = `${trimmedString}...`;
    } else {
      var result = `${item.nama_tenant}`;
    }
    console.log('itemmss', item);

    return (
      <>
        <DetailFoodCourt
          status={item.status}
          image={item.profile_photo_path}
          nameCanteen={result}
          desc={item.desc_kantin}
          rating={item.rating}
          onPress={() => navigation.navigate('ChooseFood', item)}
        />
      </>
    );
  };

  const loadMoreItem = () => {
    if (items.length < 5) {
      console.log('halooooo');
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  console.log('item', items);

  const renderLoader = () => {
    return isLoading ? (
      <View style={{marginVertical: 16, alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    ) : null;
  };

  useEffect(() => {
    getItems();
  }, [currentPage]);

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <View style={styles.page}>
        <Image source={ILFoodCourt} style={styles.illustration} />
        <View style={styles.back}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.5}>
            <IcBackFoodCourt />
          </TouchableOpacity>
        </View>
        <Gap height={20} />
        <View style={styles.container}>
          <SearchInput onPress={() => navigation.navigate('Maintenance')} />
          <Gap height={10} />
          <Text style={styles.title}>Welcome to Canteen {params}!</Text>
        </View>
        <View style={styles.listFoodcourt}>
          <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={items => items.id}
            ListFooterComponent={renderLoader}
            onEndReached={loadMoreItem}
            onEndReachedThreshold={0}
          />
          {items.length == 0 && (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text>Data is Empty !</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default FoodCourt;

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    flex: 1,
  },
  illustration: {
    height: 142,
    width: '100%',
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: 'black',
  },
  container: {
    paddingHorizontal: 18,
  },
  back: {
    position: 'absolute',
    padding: 18,
  },
  listFoodcourt: {
    paddingHorizontal: 10,
  },
});
