import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ListFoodCourt} from '..';
import {Button} from '../..';

const CustomTab = () => {
  const [foodMenu, setFoodMenu] = useState('all');
  const [all, setAll] = useState('red');
  const [food, setFood] = useState('#909090');
  const [baverages, setBaverages] = useState('#909090');

  useEffect(() => {
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
  }, [foodMenu]);

  const getFoodData = value => {
    setFoodMenu(value);
  };

  const AllFood = () => {
    if (foodMenu === 'all') {
      return (
        <View>
          <ListFoodCourt />
          <ListFoodCourt />
          <ListFoodCourt />
          <ListFoodCourt />
          <ListFoodCourt />
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
