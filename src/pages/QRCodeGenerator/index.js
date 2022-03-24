import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
// import CameraRoll from '@react-native-community/cameraroll';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {ICQris} from '../../assets';
import {Button, Gap} from '../../components';
import RNFetchBlob from 'rn-fetch-blob';

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

  const checkPermission = async () => {
    if (Platform.OS === 'ios') {
      downloadImage();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission required',
            message: 'App need access to your storage to download photos',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          downloadImage();
        } else {
          Alert.alert(
            'Oops!',
            `Server Error, hubungi admin (issue update Token Sign In) `,
          );
        }
      } catch (error) {
        console.warn(error);
      }
    }
    console.log('download');
  };

  //   const downloadImage = () => {
  //     let date = new Date();
  //     let image_URL = gambar;
  //     console.log('data gambar', image_URL);
  //     let ext = getExtention(image_URL);
  //     console.log('data gamccbar', ext);
  //     ext = '.' + ext[0];
  //     //gt config fs from rnfecthblob
  //     const {config, fs} = RNFetchBlob;
  //     let PictureDir = fs.dirs.PictureDir;
  //     let options = {
  //       fileCache: true,
  //       addAndroidDownloads: {
  //         useDownloadManager: true,
  //         notification: true,
  //         path:
  //           PictureDir +
  //           '/image_' +
  //           Math.floor(date.getTime() + date.getSeconds() / 2) +
  //           ext,
  //         description: 'Image',
  //       },
  //     };
  //     config(options)
  //       .fetch('GET', image_URL)
  //       .then(res => {
  //         // showing alert after success
  //         console.log('res=> ', JSON.stringify(res));
  //         alert('Image Downloaded Successfully');
  //       });
  //   };

  //   const getExtention = filename => {
  //     return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  //   };

  const downloadImage = () => {
    var Base64Code = gambar.split('data:application/octet-stream;base64,'); //base64Image is my image base64 string
    let date = new Date();
    const dirs = RNFetchBlob.fs.dirs;
    console.log('baseee', Base64Code);

    var path = dirs.DCIMDir + '/imcccage.jpg';
    console.log('daaaacs', path);

    RNFetchBlob.fs.writeFile(path, Base64Code[1], 'base64').then(res => {
      console.log('File : ', res);
      Alert('Image Downloaded Successfully');
    });
  };

  console.log('gambar', gambar);

  return (
    <View style={styles.page}>
      <View style={{alignItems: 'center'}}>
        <Image source={ICQris} style={{width: 200, height: 30}} />
        <Gap height={20} />
        <Text>Kantin Ibu Ica</Text>
        <Text>Jumlah Yang harus dibayar : 30.000</Text>
        <Gap height={20} />
      </View>

      <View style={styles.image}>
        {gambar !== '' && (
          <Image source={{uri: gambar}} style={{width: 260, height: 260}} />
        )}
        <Gap height={20} />
        <View>
          <Button label="Download Gambar" onPress={downloadImage} />
        </View>
      </View>
    </View>
  );
};

export default QRCodeGenerator;

const styles = StyleSheet.create({
  page: {
    flex: 1,

    padding: 21,
  },
  title: {
    fontSize: 17,
    textAlign: 'center',
  },
  image: {
    flex: 1,
    alignItems: 'center',
  },
});
