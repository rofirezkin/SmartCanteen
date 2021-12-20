import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ICCLoseModals} from '../../../assets';
import {colors, fonts} from '../../../utils';

const Modals = ({type, visible, onRequestClose}) => {
  return (
    <View>
      {type === 'buka' && (
        <Modal
          visible={visible}
          transparent
          onRequestClose={onRequestClose}
          animationType="slide"
          hardwareAccelerated>
          <View style={styles.centered_view}>
            <View style={styles.warning_modal}>
              <View style={styles.warning_title}>
                <Text style={styles.textHeader}>SUCCESS ORDER</Text>
              </View>
              <Text style={styles.text}>
                Transaction successfull, we will process your order
              </Text>
              <View style={styles.modalsButton}>
                <TouchableOpacity
                  onPress={onRequestClose}
                  style={styles.warning_button}>
                  <Text style={styles.textModals}>Oke</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default Modals;

const styles = StyleSheet.create({
  centered_view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000099',
  },
  warning_modal: {
    width: 300,
    height: 200,
    backgroundColor: '#ffffff',
    borderRadius: 10,
  },
  warning_title: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  textHeader: {
    color: '#000000',
    fontSize: 14,
    fontFamily: fonts.primary[400],
    borderBottomWidth: 3,
    borderBottomColor: '#F21818',
    padding: 10,
    textAlign: 'center',
  },
  warning_modal_catatan: {
    width: 200,
    height: 200,
    backgroundColor: '#ffffff',

    borderRadius: 10,
  },
  modalsButton: {
    marginTop: 20,
    alignItems: 'center',
    paddingHorizontal: 15,
  },

  warning_button: {
    backgroundColor: '#C51B24',
    width: 100,
    borderRadius: 10,
  },
  text: {
    color: '#000000',
    fontSize: 13,
    margin: 10,
    textAlign: 'center',
  },
  textModals: {
    color: 'white',
    fontSize: 13,
    margin: 10,
    textAlign: 'center',
  },
});
