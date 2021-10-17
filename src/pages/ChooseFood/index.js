import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  DecisionUser,
  Gap,
  Header,
  ListFoodSection,
  ProfileFoodCourt,
  TabViewFoodCourt,
  TabViewHome,
} from '../../components';

const ChooseFood = ({navigation}) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.page}>
        <Header
          onPress={() => navigation.goBack()}
          title="Choose Food"
          subtTitle="Food Court-A - Kantin Fak. Teknik"
          onBack
        />
        <View style={styles.container}>
          <ProfileFoodCourt />
          <Gap height={16} />
          <DecisionUser />
        </View>
        <View style={styles.tabContainer}>
          <TabViewFoodCourt />
        </View>
      </View>
    </ScrollView>
  );
};

export default ChooseFood;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    marginTop: 20,
    backgroundColor: 'white',
    paddingHorizontal: 18,
    paddingTop: 20,
    flex: 1,
  },
  tabContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
});
