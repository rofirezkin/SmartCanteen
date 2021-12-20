import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {EmptyOrder, Header, OrderTabSection} from '../../components';
import {getInProgress} from '../../redux/action';

const Transaction = ({navigation}) => {
  const [isEmpty] = useState(false);
  const dispatch = useDispatch();
  const [dataTransaksi, setDataTransaksi] = useState([]);
  // const {numberId} = useSelector(state => state.globalReducer);

  // useEffect(() => {
  //   dispatch(getInProgress(numberId));
  // }, []);

  return (
    <View style={styles.page(isEmpty)}>
      <View style={styles.order}>
        <Header title="Your Orders" subtTitle="Wait for the best meal" />
        <View style={styles.container}>
          <OrderTabSection />
        </View>
      </View>
    </View>
  );
};

export default Transaction;

const styles = StyleSheet.create({
  page: isEmpty => ({
    flex: 1,
    justifyContent: isEmpty ? 'center' : 'flex-start',
  }),
  order: {
    flex: 1,
  },

  container: {
    marginTop: 15,

    backgroundColor: 'white',
    flex: 1,
  },
});
