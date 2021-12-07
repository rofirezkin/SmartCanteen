import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {ListFoodCourt} from '..';
import {Button} from '../..';
import { getAllMenuUsers } from '../../../redux/action/menuAction';

const CustomTab = ({id_tenant}) => {
  const [foodMenu, setFoodMenu] = useState('all');
  const [all, setAll] = useState('red');
  const [food, setFood] = useState('#909090');
  const [baverages, setBaverages] = useState('#909090');
  const dispatch = useDispatch();

  const {allMenu, foodMenuUsers, beveragesMenu} = useSelector(state => state.menuReducer)

  useEffect(() => {
    if (foodMenu === 'all') {
      setAll('red');
      setFood('#909090');
      setBaverages('#909090');
      dispatch(getAllMenuUsers(id_tenant))
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

  console.log('reducer',allMenu)

  const getFoodData = value => {
    setFoodMenu(value);
  };

  const AllFood = () => {
    if (foodMenu === 'all') {
      return (
        <View>
            {allMenu.map(res => {
              return(
                <ListFoodCourt
                  key={res.id}
                  name={res.name}
                  ingredients={res.ingredients}
                  price={res.price}
                  status={res.is_active}
                  imagePath={res.picturePath}
                />
                )
                
            })}
        </View>
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
