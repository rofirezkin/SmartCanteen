import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {StyleSheet, Text, View} from 'react-native';

const Select = ({label}) => {
  const [selectedLanguage, setSelectedLanguage] = useState();
  return (
    <View>
      <Text style={styles.text}>{label}</Text>
      <View style={styles.input}>
        <Picker

        // selectedValue={selectedLanguage}
        // onValueChange={(itemValue, itemIndex) =>
        //   setSelectedLanguage(itemValue)
        // }
        >
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
      </View>
    </View>
  );
};

export default Select;

const styles = StyleSheet.create({
  input: {borderRadius: 8, backgroundColor: '#F9EFEF'},
  text: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#020202',
  },
});
