import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {ItemListFood, ListFoodCourt} from '..';
import {Button, Gap} from '../..';

const OrderTabSection = () => {
  const navigation = useNavigation();
  const [data, setData] = useState('onProgress');
  const [onProgress, setOnProgress] = useState('red');
  const [pastOrder, setPastOrder] = useState('#909090');

  useEffect(() => {
    if (data === 'onProgress') {
      setOnProgress('red');
      setPastOrder('#909090');
    } else if (data === 'pastOrder') {
      setOnProgress('#909090');
      setPastOrder('red');
    }
  }, [data]);

  const getData = value => {
    setData(value);
  };

  const AllFood = () => {
    if (data === 'onProgress') {
      return (
        <ScrollView>
          <ItemListFood
            type="in-progress"
            date="Jun 12, 14:00"
            items={3}
            totalOrder="3.000.000"
            onPress={() => navigation.navigate('OrderDetail')}
          />
          <ItemListFood
            type="in-progress"
            date="Jun 12, 14:00"
            items={3}
            totalOrder="3.000.000"
            onPress={() => navigation.navigate('OrderDetail')}
          />
          <ItemListFood
            type="in-progress"
            date="Jun 12, 14:00"
            items={3}
            totalOrder="3.000.000"
            onPress={() => navigation.navigate('OrderDetail')}
          />
          <ItemListFood
            type="in-progress"
            date="Jun 12, 14:00"
            items={3}
            totalOrder="3.000.000"
            onPress={() => navigation.navigate('OrderDetail')}
          />
          <ItemListFood
            type="in-progress"
            date="Jun 12, 14:00"
            items={3}
            totalOrder="3.000.000"
            onPress={() => navigation.navigate('OrderDetail')}
          />
          <ItemListFood
            type="in-progress"
            date="Jun 12, 14:00"
            items={3}
            totalOrder="3.000.000"
            onPress={() => navigation.navigate('OrderDetail')}
          />
          <ItemListFood
            type="in-progress"
            date="Jun 12, 14:00"
            items={3}
            totalOrder="3.000.000"
            onPress={() => navigation.navigate('OrderDetail')}
          />
          <ItemListFood
            type="in-progress"
            date="Jun 12, 14:00"
            items={3}
            totalOrder="3.000.000"
            onPress={() => navigation.navigate('OrderDetail')}
          />
        </ScrollView>
      );
    } else if (data === 'pastOrder') {
      return (
        <ScrollView>
          <ItemListFood
            type="past-orders"
            date="Jun 12, 14:00"
            items={3}
            statusOrder="Cancelled"
            totalOrder="3.000.000"
            onPress={() => navigation.navigate('FeedbackPage')}
          />
        </ScrollView>
      );
    }
  };

  return (
    <View>
      <View style={styles.buttonSection}>
        <Button
          color={onProgress}
          costumerOrder
          label="In Progress"
          onPress={() => getData('onProgress')}
        />
        <Button
          color={pastOrder}
          costumerOrder
          label="Past Order"
          onPress={() => getData('pastOrder')}
        />
      </View>
      <Gap height={15} />
      <AllFood />
    </View>
  );
};

export default OrderTabSection;

const styles = StyleSheet.create({
  buttonSection: {
    marginTop: 10,
    paddingHorizontal: 19,
    flexDirection: 'row',
  },
});
