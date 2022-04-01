import axios from 'axios';
import {Alert} from 'react-native';
import {showMessage} from '../../utils';
import {ENDPOINT_API_SMART_CANTEEN} from '../../utils/API/httpClient';

export const getDataTenant = types => async dispatch => {
  const result = await axios
    .get(
      `${ENDPOINT_API_SMART_CANTEEN}tenant/fetch/several?lokasi_kantin=${types}`,
    )
    .then(res => {
      if (types === 'Fakultas Ilmu Terapan') {
        dispatch({type: 'SET_ILMU_TERAPAN', value: res.data.data});
      }
    })
    .catch(err => {
      if (err?.message == 'Network Error') {
        showMessage(err?.message);
      } else {
        Alert.alert('Oops!', err?.response?.data?.message);
      }
    });

  return Promise.resolve(result);
};
