import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {ILSuccessOrder} from '../../assets';
import {Button, Gap, Header} from '../../components';

const SuccessOrder = ({navigation}) => {
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Image source={ILSuccessOrder} style={styles.icon} />
        <Gap height={15} />
        <View>
          <Text style={styles.title}>You've Made Order</Text>
          <Text style={styles.subtitle}>Transaction Successful,</Text>
          <Text style={styles.subtitle}>We will process your order</Text>
        </View>
        <Gap height={15} />
        <View>
          <Button
            label="Order Other Food"
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [{name: 'MainApp'}],
              })
            }
          />
          <Gap height={20} />
          <Button
            onPress={() => navigation.replace('MainApp', {screen: 'Order'})}
            label="View My Order"
            color="#8D92A3"
          />
        </View>
      </View>
    </View>
  );
};

export default SuccessOrder;

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
  },
  subtitle: {
    textAlign: 'center',
    color: '#8D92A3',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  icon: {
    width: 145,
    height: 209,
  },
  container: {
    alignItems: 'center',
  },
});
