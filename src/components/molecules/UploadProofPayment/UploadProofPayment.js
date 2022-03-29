import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Colors, IconButton, List} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const UploadProofPayment = ({onPress, fileSelected, addPhoto}) => {
  return (
    <View style={styles.container}>
      <View style={styles.detailCard}>
        <Text style={styles.text}>Upload proof of payment</Text>
        <View style={styles.proofPayment}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
            }}>
            <IconButton
              icon="camera"
              color={Colors.red500}
              size={20}
              onPress={addPhoto}
            />
            {fileSelected ? (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text>selected file </Text>
                <Icon name="check" color="#1CBD49" size={16} />
              </View>
            ) : (
              <Text>no files selected</Text>
            )}
          </View>
          <TouchableOpacity
            onPress={onPress}
            disabled={!fileSelected}
            activeOpacity={0.6}
            style={{
              backgroundColor: fileSelected ? 'red' : '#A9A9A9',
              padding: 8,
              borderRadius: 9,
            }}>
            <Text style={{color: 'white'}}>Upload</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default UploadProofPayment;

const styles = StyleSheet.create({
  detailCard: {
    paddingHorizontal: 19,
    marginVertical: 15,
  },
  container: {
    backgroundColor: 'white',
    marginTop: 15,
  },
  proofPayment: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    fontWeight: 'bold',
  },
});
