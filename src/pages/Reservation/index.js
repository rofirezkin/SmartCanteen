import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  Button,
  DetailReservation,
  Gap,
  Header,
  SelectedBox,
} from '../../components';

const Reservation = ({navigation}) => {
  return (
    <View style={styles.page}>
      <Header
        onPress={() => navigation.goBack()}
        onBack
        title="Reservation"
        subtTitle="You deserve better meal"
      />
      <View style={styles.container}>
        <View>
          <DetailReservation />
        </View>
        <Gap height={20} />
        <View style={styles.containerBox}>
          <SelectedBox color="#21B0ED" text="Booked" />
          <SelectedBox color="#C4C4C4" text="Empty" />
          <SelectedBox color="#FF0000" text="Selected" />
        </View>
        <View>
          <Gap height={20} />
          <Button
            onPress={() => navigation.navigate('FoodCourt')}
            label="Checkout Now"
          />
        </View>
      </View>
    </View>
  );
};

export default Reservation;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    padding: 18,
    flex: 1,
    backgroundColor: 'white',
    marginTop: 13,
  },
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    transform: [{rotate: '-90deg'}],
    position: 'absolute',
    fontSize: 20,
    left: 0,
  },
  containerBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
