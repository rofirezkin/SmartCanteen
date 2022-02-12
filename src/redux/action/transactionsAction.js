import axios from 'axios';
import {showMessage} from '../../utils';
import {ENDPOINT_API_SMART_CANTEEN} from '../../utils/API/httpClient';
import {getData} from '../../utils/AsyncStoreServices';

export const getInProgress = nim => async dispatch => {
  getData('token').then(resToken => {
    const result = axios
      .all([
        axios.get(
          `${ENDPOINT_API_SMART_CANTEEN}transactions/user/fetch?status=PENDING&nim=${nim}`,
          {
            headers: {
              Authorization: `Bearer ${resToken.value}`,
            },
          },
        ),
        axios.get(
          `${ENDPOINT_API_SMART_CANTEEN}transactions/user/fetch?status=PROCESS&nim=${nim}`,
          {
            headers: {
              Authorization: `Bearer ${resToken.value}`,
            },
          },
        ),
        axios.get(
          `${ENDPOINT_API_SMART_CANTEEN}transactions/user/fetch?status=ON DELIVERY&nim=${nim}`,
          {
            headers: {
              Authorization: `Bearer ${resToken.value}`,
            },
          },
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
  });
};

export const getInProgressBadges = nim => async dispatch => {
  getData('token').then(resToken => {
    const result = axios

      .all([
        axios.get(
          `${ENDPOINT_API_SMART_CANTEEN}transactions/user/fetch?status=PENDING&nim=${nim}`,
          {
            headers: {
              Authorization: `Bearer ${resToken.value}`,
            },
          },
        ),
        axios.get(
          `${ENDPOINT_API_SMART_CANTEEN}transactions/user/fetch?status=PROCESS&nim=${nim}`,
          {
            headers: {
              Authorization: `Bearer ${resToken.value}`,
            },
          },
        ),
        axios.get(
          `${ENDPOINT_API_SMART_CANTEEN}transactions/user/fetch?status=ON DELIVERY&nim=${nim}`,
          {
            headers: {
              Authorization: `Bearer ${resToken.value}`,
            },
          },
        ),
        axios.get(
          `${ENDPOINT_API_SMART_CANTEEN}transactions/user/fetch?status=FEEDBACK&nim=${nim}`,
          {
            headers: {
              Authorization: `Bearer ${resToken.value}`,
            },
          },
        ),
      ])
      .then(
        axios.spread((res1, res2, res3, res4) => {
          const pending = res1.data.data;
          const process = res2.data.data;
          const onDelivery = res3.data.data;
          const feedback = res4.data.data;
          console.log('testtt', pending);
          dispatch({
            type: 'SET_IN_PROGRESS_BADGES',
            value: [...onDelivery, ...process, ...pending, ...feedback],
          });
        }),
      )
      .catch(err => {
        showMessage(
          `${err?.response?.data?.message} on In Badges API` ||
            'Terjadi Kesalahan di In Badges API',
        );
      });
    return Promise.resolve(result);
  });
};

export const getFeedbackOrder = nim => async dispatch => {
  getData('token').then(resToken => {
    const result = axios
      .get(
        `${ENDPOINT_API_SMART_CANTEEN}transactions/user/fetch?status=FEEDBACK&nim=${nim}`,
        {
          headers: {
            Authorization: `Bearer ${resToken.value}`,
          },
        },
      )
      .then(res => {
        console.log('data feedback', res);
        dispatch({
          type: 'SET_FEEDBACK',
          value: res.data.data,
        });
      })
      .catch(err => {
        showMessage('Network Error');
        console.log(err.message);
      });

    return Promise.resolve(result);
  });
};

export const getPastOrders = nim => dispatch => {
  getData('token').then(resToken => {
    axios
      .all([
        axios.get(
          `${ENDPOINT_API_SMART_CANTEEN}transactions/user/fetch?status=CANCEL ORDER&nim=${nim}`,
          {
            headers: {
              Authorization: `Bearer ${resToken.value}`,
            },
          },
        ),
        axios.get(
          `${ENDPOINT_API_SMART_CANTEEN}transactions/user/fetch?status=DELIVERED&nim=${nim}`,
          {
            headers: {
              Authorization: `Bearer ${resToken.value}`,
            },
          },
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
            'Network Error',
        );
      });
  });
};
