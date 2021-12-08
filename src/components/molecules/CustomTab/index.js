import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, Text, View} from 'react-native';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {ListFoodCourt} from '..';
import {Button} from '../..';
import { getAllMenuUsers } from '../../../redux/action/menuAction';
import { ENDPOINT_API_SMART_CANTEEN } from '../../../utils/API/httpClient';

const CustomTab = ({id_tenant}) => {
  const [foodMenu, setFoodMenu] = useState('all');
  const [all, setAll] = useState('red');
  const [food, setFood] = useState('#909090');
  const [baverages, setBaverages] = useState('#909090');

  const [items,setItems] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch();

  const getItems = async () => {
      setIsLoading(true)
        await axios.get(`${ENDPOINT_API_SMART_CANTEEN}users/menu/fetch/byTenant?id_tenant=${id_tenant}`)
            .then(res => {
              setItems([...items, ...res.data.data.data])
              setIsLoading(false)
            }).catch(err => {
                console.log(err.message)
            })
  }

  const renderItem = ({item}) => {
    return(
          <ListFoodCourt
                name={item.name}
                ingredients={item.ingredients}
                price={item.price}
                status={item.is_active}
                imagePath={item.picturePath}
          />
    )

  }

  const renderLoader = () => {
      return (
          isLoading ? 
          <View style={{ marginVertical: 16, alignItems: 'center' }}>
              <ActivityIndicator size="large" color="#aaa" />
          </View> : null
          )
  }

  const loadMoreItem = () => {
      
  }

  const {allMenu, foodMenuUsers, beveragesMenu} = useSelector(state => state.menuReducer)

  useEffect(() => {
    if (foodMenu === 'all') {
      setAll('red');
      setFood('#909090');
      setBaverages('#909090');
      getItems()
    } else if (foodMenu === 'food') {
      setAll('#909090');
      setFood('red');
      setBaverages('#909090');
    } else if (foodMenu === 'baverages') {
      setAll('#909090');
      setFood('#909090');
      setBaverages('red');
    }
  }, [foodMenu]);

  const getFoodData = value => {
    setFoodMenu(value);
  };

  const AllFood = () => {
    if (foodMenu === 'all') {
      return (
          <FlatList 
              data={items} 
              renderItem={renderItem}
              keyExtractor={items => items.id}
              ListFooterComponent={renderLoader}
              onEndReachedThreshold={0}
          />
      );
    } else if (foodMenu === 'food') {
      return (
        <View>
          <ListFoodCourt />
          <ListFoodCourt />
        </View>
      );
    } else if (foodMenu === 'baverages') {
      return (
        <View>
          <ListFoodCourt />
        </View>
      );
    }
  };

  return (
    <View>
      <View style={styles.buttonSection}>
        <Button
          color={all}
          costumerOrder
          label="All"
          onPress={() => getFoodData('all')}
        />
        <Button
          color={food}
          costumerOrder
          label="Food"
          onPress={() => getFoodData('food')}
        />
        <Button
          color={baverages}
          costumerOrder
          onPress={() => getFoodData('baverages')}
          label="Baverages"
        />
      </View>
      <AllFood />
    </View>
  );
};

export default CustomTab;

const styles = StyleSheet.create({
  buttonSection: {
    marginTop: 10,
    paddingHorizontal: 19,
    flexDirection: 'row',
  },
});
