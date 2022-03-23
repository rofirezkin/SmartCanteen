import {StyleSheet, Text, Image, TouchableOpacity, View} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {ICQris} from '../../assets';
import {Gap} from '../../components';

const QRCodeGenerator = () => {
  const [gambar, setGambar] = useState('');

  const dataQr = {
    cht: 'qr',
    chs: '200x200',
    chl: '00020101021126660014ID.LINKAJA.WWW011893600911000171900202152003070917190020303UME51440014ID.CO.QRIS.WWW0215ID20200298161760303UME5204581253033605802ID5920Kantin FIT-Tenant 026007BANDUNG61054025762070703A016304A562',
  };
  const url = `https://chart.googleapis.com/chart?cht=qr&chl=${dataQr.chl}&chs=${dataQr.chs}`;

  useEffect(() => {
    const toDataURL = url =>
      fetch(url)
        .then(response => response.blob())
        .then(
          blob =>
            new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result);
              reader.onerror = reject;
              reader.readAsDataURL(blob);
            }),
        );

    toDataURL(url).then(dataUrl => {
      setGambar(dataUrl);
    });
  });
  console.log('gambar', gambar);

  const downloadPhoto = () => {
    console.log('download');
    CameraRoll.save(gambar, {type, album})
      .then(res => {
        console.log('ress image', res);
        alert('Done', 'Photo added to camera roll!');
      })
      .catch(err => console.log('err:', err));
  };

  return (
    <View style={styles.page}>
      <Text style={styles.title}>QRIS Payment</Text>
      <View>
        <Image source={ICQris} style={{width: 200, height: 30}} />
      </View>

      <View style={styles.image}>
        {gambar !== '' && (
          <Image source={{uri: gambar}} style={{width: 260, height: 260}} />
        )}
        <Gap height={20} />
        <View>
          <TouchableOpacity
            style={{backgroundColor: 'yellow'}}
            onPress={downloadPhoto}>
            <Text>halloo download</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default QRCodeGenerator;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'red',
    padding: 21,
  },
  title: {
    fontSize: 17,
    textAlign: 'center',
  },
  image: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
