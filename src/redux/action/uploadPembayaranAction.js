import axios from 'axios';
import {showMessage} from '../../utils';
import {ENDPOINT_API_SMART_CANTEEN} from '../../utils/API/httpClient';
import {setLoading} from './loading';

export const uploadPembayaranAction =
  (dataPhoto, token, kode_transaksi, navigation, idTenant) => dispatch => {
    const dataUpload = {
      file: dataPhoto,
      kode_transaksi: kode_transaksi,
      id_tenant: idTenant,
    };

    console.log('data upload', idTenant);
    dispatch(setLoading(true));

    axios
      .post(
        `${ENDPOINT_API_SMART_CANTEEN}transactions/user/upload-bukti-bayar`,
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
        if (err?.message) {
          showMessage(err?.message);
        } else {
          showMessage(
            `${err?.response?.data?.message} on Upload Proof Payment API` ||
              'Terjadi Kesalahan di Upload Proof Payment API',
          );
        }
        console.log('resss', err.response);
      });
  };
