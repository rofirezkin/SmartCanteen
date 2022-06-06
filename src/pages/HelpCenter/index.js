import React from 'react';
import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ICGmail, ICWhatsapp, ILHelpCenter} from '../../assets';
import {Gap, Header} from '../../components';
import {fonts} from '../../utils';

const HelpCenter = ({navigation}) => {
  const onWhatsApp = () => {
    Linking.openURL(
      'whatsapp://send?text=Bantuan SmartCanteen&phone=+6282295599463',
    );
  };
  const onEmail = () => {
    Linking.openURL(
      'mailto:kantin.telkomuniversity@gmail.com?subject=Help Center Smartcanteen&body=Bantuan Aplikasi Smart Canteen',
    );
  };
  return (
    <View style={styles.page}>
      <Header
        onBack
        onPress={() => navigation.goBack()}
        title="Kontak Admin SmartCanten"
        subtTitle="Hubungi Admin anda untuk bantuan"
      />
      <View style={styles.container}>
        <View style={styles.illustration}>
          <ILHelpCenter />
        </View>
        <Gap height={20} />
        <TouchableOpacity onPress={onWhatsApp} style={styles.button}>
          <View style={styles.icon}>
            <ICWhatsapp />
          </View>
          <Text style={styles.text}>Whatsapp Chat</Text>
        </TouchableOpacity>
        <Gap height={20} />
        <TouchableOpacity style={styles.button}>
          <View style={styles.icon}>
            <ICGmail />
          </View>
          <Text onPress={onEmail} style={styles.text}>
            Email : kantin.telkomuniversity@gmail.com
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HelpCenter;

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    flex: 1,
  },
  container: {
    marginTop: 15,
    paddingTop: 15,
    paddingHorizontal: 25,
  },
  illustration: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#ED212B',
    height: 50,
    flexDirection: 'row',
    borderRadius: 15,
    paddingHorizontal: 12,
  },
  text: {
    fontFamily: fonts.primary[500],
    color: 'white',
    marginLeft: 20,
    flex: 1,
    textAlignVertical: 'center',
  },
  icon: {
    marginLeft: 20,
    justifyContent: 'center',
  },
});
