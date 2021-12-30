import axios from 'axios';
import {showMessage} from '../../utils';
import {ENDPOINT_API_SMART_CANTEEN} from '../../utils/API/httpClient';

export const getInProgress = nim => async dispatch => {
  const result = await axios
    .all([
      axios.get(
        `${ENDPOINT_API_SMART_CANTEEN}transactions/user/fetch?status=PENDING&nim=${nim}`,
      ),
      axios.get(
        `${ENDPOINT_API_SMART_CANTEEN}transactions/user/fetch?status=PROCESS&nim=${nim}`,
      ),
      axios.get(
        `${ENDPOINT_API_SMART_CANTEEN}transactions/user/fetch?status=ON DELIVERY&nim=${nim}`,
      ),
    ])
    .then(
      axios.spread((res1, res2, res3) => {
        const pending = res1.data.data;
        const process = res2.data.data;
        const onDelivery = res3.data.data;

        dispatch({
          type: 'SET_IN_PROGRESS',
          value: [...onDelivery, ...process, ...pending],
        });
      }),
    )
    .catch(err => {
      showMessage(
        `${err?.response?.data?.message} on In Progress API` ||
          'Terjadi Kesalahan di In Progress API',
      );
    });
  return Promise.resolve(result);
};

export const getFeedbackOrder = nim => async dispatch => {
  const result = await axios
    .get(
      `${ENDPOINT_API_SMART_CANTEEN}transactions/user/fetch?status=FEEDBACK&nim=${nim}`,
    )
    .then(res => {
      console.log('data feedback', res);
      dispatch({
        type: 'SET_FEEDBACK',
        value: res.data.data,
      });
    })
    .catch(err => {
      showMessage('tidak bisa get data');
      console.log(err.message);
    });

  return Promise.resolve(result);
};

export const getPastOrders = nim => dispatch => {
  axios
    .all([
      axios.get(
        `${ENDPOINT_API_SMART_CANTEEN}transactions/user/fetch?status=CANCEL ORDER&nim=${nim}`,
      ),
      axios.get(
        `${ENDPOINT_API_SMART_CANTEEN}transactions/user/fetch?status=DELIVERED&nim=${nim}`,
      ),
    ])
    .then(
      axios.spread((res1, res2) => {
        const cancelled = res1.data.data;
        const delivered = res2.data.data;

        dispatch({
          type: 'SET_PAST_ORDERS',
          value: [...delivered, ...cancelled],
        });
      }),
    )
    .catch(err => {
      showMessage(
        `${err?.response?.data?.message} on Past Order API` ||
          'Terjadi Kesalahan di API Past Order',
      );
    });
};
