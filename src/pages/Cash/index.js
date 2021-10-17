import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ILCash} from '../../assets';
import {Button, Gap, Header, Link, TextInput} from '../../components';

const Cash = ({navigation}) => {
  return (
    <View style={styles.page}>
      <Header
        title="Cash"
        onBack
        subtTitle="You deserve better meal"
        onPress={() => navigation.goBack()}
      />

      <View style={styles.container}>
        <Gap height={20} />
        <View style={styles.illustration}>
          <ILCash />
        </View>
        <View>
          <TextInput
            label="Fill Payment Amount"
            placeholder="Type your payment amount"
          />
          <Gap height={15} />
          <View style={styles.buttonCard}>
            <Button double label="Cancel" color="#B7B7B7" />
            <Button
              double
              label="Confirm"
              onPress={() => navigation.navigate('SuccessOrder')}
            />
          </View>
        </View>
        <Gap height={20} />
        <View style={styles.link}>
          <Link title="Go to Online Payment" />
        </View>
      </View>
    </View>
  );
};

export default Cash;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  buttonCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    justifyContent: 'space-between',
    flex: 1,
    backgroundColor: 'white',
    marginTop: 15,
    paddingHorizontal: 19,
    paddingTop: 10,
  },
  illustration: {
    alignItems: 'center',
  },
  link: {
    alignItems: 'center',
    marginBottom: 20,
  },
});
