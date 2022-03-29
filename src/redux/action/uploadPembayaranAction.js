import axios from 'axios';
import {showMessage} from '../../utils';
import {setLoading} from './loading';

export const uploadPembayaranAction =
  (dataPhoto, token, kode_transaksi, navigation) => dispatch => {
    const dataUpload = {
      file: dataPhoto,
      kode_transaksi: kode_transaksi,
    };

    console.log('data upload', dataUpload);
    dispatch(setLoading(true));

    axios
      .post(
        `http://27.112.78.169/api/transactions/user/upload-bukti-bayar`,
        dataUpload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(res => {
        dispatch(setLoading(false));
        showMessage('Upload Image Proof payment Success', 'success');
        navigation.replace('MainApp', {screen: 'Transaction'});
        console.log('rees datafffff upload ', res);
      })
      .catch(err => {
        dispatch(setLoading(false));
        showMessage('error upload bukti pembayaran, hubungi admin ');
        console.log('resss', err.response);
      });
  };
