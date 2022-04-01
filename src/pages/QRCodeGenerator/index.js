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

import React, {useEffect, useState} from 'react';

import {ICQris} from '../../assets';
import {Button, Gap, Header, Link} from '../../components';
import RNFetchBlob from 'rn-fetch-blob';
import Number from '../../utils/Number/Number';
import {useDispatch} from 'react-redux';
import {setLoading} from '../../redux/action';

const QRCodeGenerator = ({navigation, route}) => {
  const paramData = route.params;
  const dispatch = useDispatch();
  console.log('param data', paramData);
  const [gambar, setGambar] = useState('');

  const dataQr = {
    cht: 'qr',
    chs: '200x200',
    chl: paramData.qrString,
  };
  const url = `https://chart.googleapis.com/chart?cht=qr&chl=${dataQr.chl}&chs=${dataQr.chs}`;

  useEffect(() => {
    dispatch(setLoading(true));
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
      dispatch(setLoading(false));
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
            `Server Error, hubungi admin (issue download image qris) `,
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

    const directory = Math.floor(date.getTime() + date.getSeconds() / 2);

    var path = dirs.DCIMDir + `/${directory}qris.jpg`;

    RNFetchBlob.fs.writeFile(path, Base64Code[1], 'base64').then(res => {
      console.log('File : ', res);
      Alert.alert('Image', 'Image Downloaded Successfully');
    });
  };

  return (
    <View style={styles.page}>
      {paramData.order && (
        <Header
          onPress={() => navigation.goBack()}
          onBack
          title="QRIS Payment"
          subtTitle="Scan QRIS Tenant for Payment"
        />
      )}
      <Gap height={20} />
      <View style={{alignItems: 'center'}}>
        <Image source={ICQris} style={{width: 200, height: 30}} />
        <Gap height={20} />
        <Text style={styles.title}>{paramData.namaTenant}</Text>
        <Text style={styles.jumlah}>
          amount to be paid : <Number number={paramData.total} />
        </Text>
        <Gap height={20} />
      </View>

      <View style={styles.image}>
        {gambar !== '' && (
          <Image source={{uri: gambar}} style={{width: 260, height: 260}} />
        )}
        <Gap height={20} />
        <View style={{paddingHorizontal: 19}}>
          <Text style={styles.subtitle}>
            You can upload proof of payment on the page: My Order {'->'} Order
            Details {'->'} Upload Proof of Payment
          </Text>
        </View>
        <Gap height={20} />
        <View>
          <Link
            align="center"
            title="Download QRIS"
            onPress={checkPermission}
          />

          {!paramData.order && (
            <View>
              <Gap height={20} />
              <Button
                label="Order Other Food"
                onPress={() =>
                  navigation.reset({
                    index: 0,

                    routes: [{name: 'MainApp'}],
                  })
                }
              />
              <Gap height={20} />
              <Button
                onPress={() =>
                  navigation.replace('MainApp', {screen: 'Transaction'})
                }
                label="View My Order"
                color="#8D92A3"
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default QRCodeGenerator;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    textAlign: 'center',
  },
  image: {
    flex: 1,
    alignItems: 'center',
  },
  jumlah: {
    textAlign: 'center',
    color: 'black',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  subtitle: {
    textAlign: 'center',
    color: '#8D92B3',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
});
