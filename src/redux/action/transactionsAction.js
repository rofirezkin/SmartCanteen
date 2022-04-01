import axios from 'axios';
import {Alert} from 'react-native';

import {showMessage} from '../../utils';
import {ENDPOINT_API_SMART_CANTEEN} from '../../utils/API/httpClient';
import {getData, storeData} from '../../utils/AsyncStoreServices';
import {setLoading, setLoadingSkeleton} from './loading';

export const getInProgress = nim => async dispatch => {
  dispatch(setLoadingSkeleton(true));
  getData('token')
    .then(resToken => {
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
            console.log('data pending', res1.data);
            dispatch(setLoadingSkeleton(false));
            // axios.get(
            //   `${ENDPOINT_API_SMART_CANTEEN}transactions/user/detail?id_tenant=61&nim=6705184061&status=PENDING`,
            // );
            dispatch({
              type: 'SET_IN_PROGRESS',
              value: [...onDelivery, ...process, ...pending],
            });
          }),
        )
        .catch(err => {
          dispatch(setLoadingSkeleton(false));
          if (err?.message) {
            showMessage(err?.message);
          } else {
            Alert.alert('Oops!', err?.response?.data?.message);
          }
        });
      return Promise.resolve(result);
    })
    .catch(err => {
      dispatch(setLoadingSkeleton(false));
      if (err?.message == 'Network Error') {
        showMessage(err?.message);
      } else {
        Alert.alert('Oops!', err?.response?.data?.message);
      }
    });
};

export const getDetailProgress = (nim, idTenant) => async dispatch => {
  getData('token')
    .then(resToken => {
      const result = axios
        .all([
          axios.get(
            `${ENDPOINT_API_SMART_CANTEEN}transactions/user/detail?id_tenant=${idTenant}&nim=${nim}&status=PENDING`,
            {
              headers: {
                Authorization: `Bearer ${resToken.value}`,
              },
            },
          ),
          axios.get(
            `${ENDPOINT_API_SMART_CANTEEN}transactions/user/detail?id_tenant=${idTenant}&nim=${nim}&status=PROCESS`,
            {
              headers: {
                Authorization: `Bearer ${resToken.value}`,
              },
            },
          ),
          axios.get(
            `${ENDPOINT_API_SMART_CANTEEN}transactions/user/detail?id_tenant=${idTenant}&nim=${nim}&status=ON DELIVERY`,
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
            console.log('data pending', pending);
            // axios.get(
            //   `${ENDPOINT_API_SMART_CANTEEN}transactions/user/detail?id_tenant=61&nim=6705184061&status=PENDING`,
            // );
            dispatch({
              type: 'SET_DETAIL_PROGRESS',
              value: [...onDelivery, ...process, ...pending],
            });
          }),
        )
        .catch(err => {
          if (err?.message) {
            showMessage(err?.message);
          } else {
            showMessage(
              `${err?.response?.data?.message} on detail Progress API` ||
                'Terjadi Kesalahan di detail Progress API',
            );
          }
        });
      return Promise.resolve(result);
    })
    .catch(err => {
      if (err?.message == 'Network Error') {
        showMessage(err?.message);
      } else {
        showMessage(
          `${err?.response?.data?.message} on detail Progress API` ||
            'Terjadi Kesalahan di detail Progress API',
        );
      }
    });
};

export const getInProgressBadges = nim => async dispatch => {
  getData('token')
    .then(resToken => {
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
            dispatch({
              type: 'SET_IN_PROGRESS_BADGES',
              value: [...onDelivery, ...process, ...pending, ...feedback],
            });
          }),
        )
        .catch(err => {
          if (err?.message) {
            showMessage(err?.message);
          } else {
            showMessage(
              `${err?.response?.data?.message} on Badges API` ||
                'Terjadi Kesalahan di Badges API',
            );
          }
        });
      return Promise.resolve(result);
    })
    .catch(err => {
      if (err?.message == 'Network Error') {
        showMessage(err?.message);
      } else {
        showMessage(
          `${err?.response?.data?.message} on Badges API` ||
            'Terjadi Kesalahan di Badges API',
        );
      }
    });
};

export const getFeedbackOrder = nim => async dispatch => {
  dispatch(setLoadingSkeleton(true));
  getData('token')
    .then(resToken => {
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
          dispatch(setLoadingSkeleton(false));
          dispatch({
            type: 'SET_FEEDBACK',
            value: res.data.data,
          });
        })
        .catch(err => {
          dispatch(setLoadingSkeleton(false));
          if (err?.message) {
            showMessage(err?.message);
          } else {
            showMessage(
              `${err?.response?.data?.message} on Feedback API` ||
                'Terjadi Kesalahan di Feedback API',
            );
          }
        });

      return Promise.resolve(result);
    })
    .catch(err => {
      if (err?.message == 'Network Error') {
        showMessage(err?.message);
      } else {
        showMessage(
          `${err?.response?.data?.message} on Feedback API` ||
            'Terjadi Kesalahan di Feedback API',
        );
      }
    });
};

export const getPastOrders = nim => dispatch => {
  dispatch(setLoadingSkeleton(true));
  getData('token')
    .then(resToken => {
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
            dispatch(setLoadingSkeleton(false));

            dispatch({
              type: 'SET_PAST_ORDERS',
              value: [...delivered, ...cancelled],
            });
          }),
        )
        .catch(err => {
          dispatch(setLoadingSkeleton(false));
          if (err?.message) {
            showMessage(err?.message);
          } else {
            showMessage(
              `${err?.response?.data?.message} on Past Order API` ||
                'Terjadi Kesalahan di Past Order API',
            );
          }
        });
    })
    .catch(err => {
      if (err?.message == 'Network Error') {
        showMessage(err?.message);
      } else {
        showMessage(
          `${err?.response?.data?.message} on Past Order API` ||
            'Terjadi Kesalahan di Past Order API',
        );
      }
    });
};

export const postTransaction =
  (
    sendData,
    notif,
    form,
    navigation,
    paymentMethod,
    notifJSON,
    sumData,
    token,
    qrString,
    namaTenant,
  ) =>
  dispatch => {
    dispatch(setLoading(true));
    console.log('sendata', sendData);
    axios
      .post(`${ENDPOINT_API_SMART_CANTEEN}transactions/add`, sendData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then(resData => {
        axios
          .post(`https://fcm.googleapis.com/fcm/send`, notifJSON, {
            headers: {
              'Content-Type': 'application/json',
              Authorization:
                'key=AAAAmc0dakQ:APA91bECUaR9WbE_tTHJkSJ2KlcYbGThlF-h8RoQDAdgZerbZPIkbV3UKsn1Pg-Nto24LAd32cerbsf8JZQ7lUbfzFV7GxgocRSZNkA18ksUiLZoDWHZmhDB_HPKB8Vh2mWXd-cvelH0',
            },
          })
          .then(res => {
            console.log('resss', res);
            console.log('kedua', paymentMethod);
            notif.localNotif();

            const dataOrder = {
              methodPayment: form.paymentMethod,
              total: sumData,
            };
            const dataOrderQris = {
              methodPayment: form.paymentMethod,
              total: sumData,
              qrString,
              namaTenant,
            };
            if (dataOrder.methodPayment == 'QRIS Payment') {
              dispatch(setLoading(false));
              navigation.reset({
                index: 0,
                routes: [{name: 'QRCodeGenerator', params: dataOrderQris}],
              });
            } else {
              dispatch(setLoading(false));
              navigation.reset({
                index: 0,
                routes: [{name: 'SuccessOrder', params: dataOrder}],
              });
            }
          })
          .catch(err => {
            dispatch(setLoading(false));
            if (err?.message) {
              showMessage(err?.message);
            } else {
              showMessage(
                `${err?.response?.data?.message} on Transaction API` ||
                  'Terjadi Kesalahan di Transaction API',
              );
            }
            console.log('testing notif err', err);
          });
      })
      .catch(err => {
        dispatch(setLoading(false));
        if (err?.message == 'Network Error') {
          showMessage(err?.message);
        } else {
          showMessage(
            `${err?.response?.data?.message} on Transaction API` ||
              'Terjadi Kesalahan di Transaction API',
          );
        }
        console.log(err.response);
      });
  };

export const postTransactionCart =
  (
    sendData,
    notif,
    form,
    navigation,
    paymentMethod,
    allCart,
    notifJSON,
    arrayData,
    sumData,
    token,
    qrString,
    namaTenant,
  ) =>
  dispatch => {
    console.log('sendata', sendData);
    dispatch(setLoading(true));
    axios
      .post(`${ENDPOINT_API_SMART_CANTEEN}transactions/add`, sendData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        axios
          .post(`https://fcm.googleapis.com/fcm/send`, notifJSON, {
            headers: {
              'Content-Type': 'application/json',
              Authorization:
                'key=AAAAmc0dakQ:APA91bECUaR9WbE_tTHJkSJ2KlcYbGThlF-h8RoQDAdgZerbZPIkbV3UKsn1Pg-Nto24LAd32cerbsf8JZQ7lUbfzFV7GxgocRSZNkA18ksUiLZoDWHZmhDB_HPKB8Vh2mWXd-cvelH0',
            },
          })
          .then(resData => {
            dispatch(setLoading(false));
            notif.localNotif();
            delete allCart[arrayData[0].id_tenant];

            const dataOrder = {
              methodPayment: form.paymentMethod,
              total: sumData,
            };
            const dataOrderQris = {
              methodPayment: form.paymentMethod,
              total: sumData,
              qrString,
              namaTenant,
            };
            storeData('dataCart', allCart);
            if (dataOrder.methodPayment == 'QRIS Payment') {
              navigation.reset({
                index: 0,
                routes: [{name: 'QRCodeGenerator', params: dataOrderQris}],
              });
            } else {
              navigation.reset({
                index: 0,
                routes: [{name: 'SuccessOrder', params: dataOrder}],
              });
            }
          })
          .catch(err => {
            dispatch(setLoading(false));
            if (err?.message == 'Network Error') {
              showMessage(err?.message);
            } else {
              showMessage(
                `${err?.response?.data?.message} on post transaction cart API` ||
                  'Terjadi Kesalahan di post transaction cart API',
              );
            }
          });
      })
      .catch(err => {
        dispatch(setLoading(false));

        if (err?.message == 'Network Error') {
          showMessage(err?.message);
        } else {
          showMessage(
            `${err?.response?.data?.message} on transaction API` ||
              'Terjadi Kesalahan di transaction API',
          );
        }
        console.log('erro pada post transaction cart', err.response);
      });
  };
