import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, Carousel, Gap} from '../../components';
import {dummyData} from '../../data';

const Home = ({navigation}) => {
  return (
    <View>
      <Carousel data={dummyData} />
      <View style={styles.viewButton}>
        <Button label="SIGN UP" onPress={() => navigation.navigate('SignUp')} />
        <Gap height={17} />
        <Button
          label="LOGIN WITH SSO"
          color="white"
          textColor="#ED212B"
          onPress={() => navigation.navigate('SignIn')}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  viewButton: {
    padding: 24,
  },
});

export default Home;
