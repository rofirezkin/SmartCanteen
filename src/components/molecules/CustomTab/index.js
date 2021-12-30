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
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {ListFoodCourt} from '..';
import {Button} from '../..';
import {getAllMenuUsers} from '../../../redux/action/menuAction';

const CustomTab = ({id_tenant, lokasi_kantin, nama_tenant}) => {
  const navigation = useNavigation();
  const [foodMenu, setFoodMenu] = useState('all');
  const [all, setAll] = useState('red');
  const [food, setFood] = useState('#909090');
  const [baverages, setBaverages] = useState('#909090');

  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const {allMenu, foodMenuUsers, beveragesMenu} = useSelector(
    state => state.menuReducer,
  );

  useEffect(() => {
    dispatch(getAllMenuUsers(id_tenant));
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
          {foodMenuUsers.map(item => {
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
          {beveragesMenu.map(item => {
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
      <AllFood />
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
