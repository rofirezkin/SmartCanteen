import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

import {ListFoodCourt} from '..';
import {Button} from '../..';

import {ENDPOINT_API_SMART_CANTEEN} from '../../../utils/API/httpClient';
import {skeletonChooseFood} from '../../skeleton/skeletonHome';

const CustomTab = ({id_tenant, lokasi_kantin, nama_tenant}) => {
  const navigation = useNavigation();
  const [foodMenu, setFoodMenu] = useState('all');
  const [all, setAll] = useState('red');
  const [food, setFood] = useState('#909090');
  const [baverages, setBaverages] = useState('#909090');
  const [menuBavarages, setMenuBavarages] = useState([]);
  const [menuFood, setMenuFood] = useState([]);
  const [allMenu, setAllMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get(
        `${ENDPOINT_API_SMART_CANTEEN}users/menu/fetch/byTenant?id_tenant=${id_tenant}`,
      )
      .then(res => {
        const dataFood = res.data.data;
        const foodMenu = dataFood.filter(res => res.category === 'Makanan');
        const baveragesMenu = dataFood.filter(
          res => res.category === 'Minuman',
        );
        setAllMenu(dataFood);
        setMenuBavarages(baveragesMenu);
        setMenuFood(foodMenu);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.log('error pada makanan atau minuman food', err.response);
      });

    if (foodMenu === 'all') {
      setAll('red');
      setFood('#909090');
      setBaverages('#909090');
    } else if (foodMenu === 'food') {
      setAll('#909090');
      setFood('red');
      setBaverages('#909090');
    } else if (foodMenu === 'baverages') {
      setAll('#909090');
      setFood('#909090');
      setBaverages('red');
    }
  }, [foodMenu, currentPage]);

  const getFoodData = value => {
    setFoodMenu(value);
  };

  const AllFood = () => {
    if (foodMenu === 'all') {
      return (
        <View>
          {allMenu.map(item => {
            console.log('item', item);
            const dataParam = {
              ...item,
              nama_tenant,
              lokasi_kantin,
            };

            const dataSubstring = [
              {desc: item.ingredients, value: 40},
              {desc: item.name, value: 25},
            ];
            var fixedDesc;
            var data = [];
            for (var i = 0; i < dataSubstring.length; i++) {
              if (dataSubstring[i].desc.length > dataSubstring[i].value) {
                fixedDesc =
                  dataSubstring[i].desc.substring(0, dataSubstring[i].value) +
                  '...';
              } else {
                fixedDesc = dataSubstring[i].desc;
              }
              data.push({
                key: i,
                desc: fixedDesc,
              });
            }
            return (
              <ListFoodCourt
                onPress={() => navigation.navigate('DetailFoodItem', dataParam)}
                key={item.id}
                id={item.id}
                idTenant={item.id_tenant}
                name={data[1].desc}
                ingredients={data[0].desc}
                price={item.price}
                status={item.is_active}
                imagePath={item.picturePath}
                onValue={1}
              />
            );
          })}
        </View>
      );
    } else if (foodMenu === 'food') {
      return (
        <View>
          {menuFood.map(item => {
            const dataParam = {
              ...item,
              nama_tenant,
              lokasi_kantin,
            };
            const dataSubstring = [
              {desc: item.ingredients, value: 40},
              {desc: item.name, value: 25},
            ];
            var fixedDesc;
            var data = [];
            for (var i = 0; i < dataSubstring.length; i++) {
              if (dataSubstring[i].desc.length > dataSubstring[i].value) {
                fixedDesc =
                  dataSubstring[i].desc.substring(0, dataSubstring[i].value) +
                  '...';
              } else {
                fixedDesc = dataSubstring[i].desc;
              }
              data.push({
                key: i,
                desc: fixedDesc,
              });
            }
            return (
              <ListFoodCourt
                onPress={() => navigation.navigate('DetailFoodItem', dataParam)}
                key={item.id}
                id={item.id}
                idTenant={item.id_tenant}
                name={data[1].desc}
                ingredients={data[0].desc}
                price={item.price}
                status={item.is_active}
                imagePath={item.picturePath}
                onValue={1}
              />
            );
          })}
        </View>
      );
    } else if (foodMenu === 'baverages') {
      return (
        <View>
          {menuBavarages.map(item => {
            const dataParam = {
              ...item,
              nama_tenant,
              lokasi_kantin,
            };
            const dataSubstring = [
              {desc: item.ingredients, value: 40},
              {desc: item.name, value: 25},
            ];
            var fixedDesc;
            var data = [];
            for (var i = 0; i < dataSubstring.length; i++) {
              if (dataSubstring[i].desc.length > dataSubstring[i].value) {
                fixedDesc =
                  dataSubstring[i].desc.substring(0, dataSubstring[i].value) +
                  '...';
              } else {
                fixedDesc = dataSubstring[i].desc;
              }
              data.push({
                key: i,
                desc: fixedDesc,
              });
            }
            return (
              <ListFoodCourt
                onPress={() => navigation.navigate('DetailFoodItem', dataParam)}
                key={item.id}
                id={item.id}
                idTenant={item.id_tenant}
                name={data[1].desc}
                ingredients={data[0].desc}
                price={item.price}
                status={item.is_active}
                imagePath={item.picturePath}
                onValue={1}
              />
            );
          })}
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
      <SkeletonContent
        containerStyle={{flex: 1}}
        isLoading={loading}
        layout={skeletonChooseFood}>
        <AllFood />
      </SkeletonContent>
    </View>
  );
};

export default CustomTab;

const styles = StyleSheet.create({
  buttonSection: {
    marginTop: 15,
    paddingHorizontal: 19,
    flexDirection: 'row',
  },
});
