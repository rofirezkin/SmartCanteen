import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  Gap,
  Header,
  HistorySearch,
  ListFoodCourt,
  SearchInput,
} from '../../components';

const SearchSection = ({navigation}) => {
  const [searchResult, setSearchResult] = useState(true);
  return (
    <View style={styles.page}>
      <Header
        title="Search Food & Beverages"
        subtTitle="Search your favorit food in SmartCanteen"
        onPress={() => navigation.goBack()}
        onBack
      />
      <View style={styles.container}>
        <View style={styles.boxSpace}>
          <SearchInput />
        </View>
        <Gap height={15} />
        {searchResult ? (
          <View style={styles.boxResult}>
            <View style={styles.boxSpace}>
              <Text style={styles.title}>Result</Text>
            </View>
            <View>
              <ListFoodCourt type />
              <ListFoodCourt type />
              <ListFoodCourt type />
            </View>
          </View>
        ) : (
          <View style={styles.boxHistory}>
            <HistorySearch item="Pecel Ayam" />
            <HistorySearch item="Ikan Bakar" />
            <HistorySearch item="Nasi Padang" />
            <HistorySearch item="Mie Ayam" />
            <HistorySearch item="Mie Ayam" />
            <HistorySearch item="Mie Ayam" />
          </View>
        )}
      </View>
    </View>
  );
};

export default SearchSection;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    marginTop: 15,
    paddingTop: 15,

    flex: 1,
    backgroundColor: 'white',
  },
  boxHistory: {
    alignContent: 'flex-start',
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingHorizontal: 19,
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    fontWeight: '600',
  },
  boxSpace: {
    paddingHorizontal: 19,
  },
});
