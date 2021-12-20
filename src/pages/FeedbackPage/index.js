import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {ICStartActive, ICStartNonActive} from '../../assets';
import {
  Button,
  DetailFoodCourt,
  Gap,
  Header,
  RatingFeedback,
} from '../../components';

const FeedbackPage = ({navigation, route}) => {
  const dataParams = route.params;
  console.log('data', dataParams);
  return (
    <View style={styles.page}>
      <Header
        subtTitle={dataParams.tenant.nama_tenant}
        title="Feedback for Canteen"
        onBack
        onPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <DetailFoodCourt
          nameCanteen={dataParams.tenant.nama_tenant}
          desc={dataParams.tenant.desc_kantin}
          locKantin={dataParams.tenant.lokasi_kantin}
          image={dataParams.tenant.profile_photo_path}
          type
        />
        <Gap height={20} />
        <View style={styles.rating}>
          <RatingFeedback />
        </View>
        <Gap height={15} />
        {/* <TextInput
          style={styles.textArea}
          underlineColorAndroid="transparent"
          placeholder="Isi Feedback anda disini"
          placeholderTextColor="grey"
          numberOfLines={5}
          multiline={true}
          //   onChangeText={value => setDescription(value)}
          //   value={description}
        /> */}
        <Gap height={15} />
        <Button
          label="Submit"
          onPress={() =>
            navigation.reset({index: 0, routes: [{name: 'MainApp'}]})
          }
        />
      </View>
    </View>
  );
};

export default FeedbackPage;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    marginTop: 15,
    paddingHorizontal: 19,
    paddingTop: 15,
    flex: 1,
    backgroundColor: 'white',
  },
  rating: {
    backgroundColor: '#F3F4F8',
    padding: 15,
    alignSelf: 'center',
  },
  textArea: {
    borderRadius: 8,
    height: 100,
    padding: 10,
    backgroundColor: '#F3F3F3',
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
  },
});
