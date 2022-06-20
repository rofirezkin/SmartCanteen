import axios from 'axios';
import {showMessage} from '../../utils';

import {
  ENDPOINT_API_SMART_CANTEEN,
  ENDPOINT_PROFILE,
  ENDPOINT_ROLE,
} from '../../utils/API/httpClient';
import {setUser, storeData} from '../../utils/AsyncStoreServices';
import {setLoading} from './loading';

/**
 * make a request to api without token
 * @param {string} url
 * @param {('post' | 'get')} method
 * @param {object=} payload
 * @returns object
 */
export const useRequestLogin =
  (url, method, payload, Alert, device_token, navigation) => async dispatch => {
    axios
      .post(`${url}`, payload, {
        headers: {
          Authorization: 'Bearer ',
          'Content-Type': 'application/json',
          redirect: 'follow',
          'X-Orgid':
            'l6WxJyXH6toDsTnOIOZYxy8jBshOlEzDZzp2iqdxg7dT60Wh52BDw0Dhq276qcSlQCbayrWOpdHCXGmvZTA1UU0R16Knj76FDCGkOlpSlWsj1MlkqOrHtkQWWataMfsm',
        },
      })
      .then(res => {
        console.log('testingg token', res.data);
        const tokenTelkom = res.data;
        axios
          .get(`${ENDPOINT_PROFILE}`, {
            headers: {
              Authorization: `Bearer ${tokenTelkom.token}`,
              'Content-Type': 'application/json',
              redirect: 'follow',
              'X-Orgid':
                'l6WxJyXH6toDsTnOIOZYxy8jBshOlEzDZzp2iqdxg7dT60Wh52BDw0Dhq276qcSlQCbayrWOpdHCXGmvZTA1UU0R16Knj76FDCGkOlpSlWsj1MlkqOrHtkQWWataMfsm',
            },
          })
          .then(res => {
            console.log('ress tokennnn profile', res.data.user);
            const issueProfile = res.data;
            axios
              .get(`${ENDPOINT_ROLE}`, {
                headers: {
                  Authorization: `Bearer ${tokenTelkom.token}`,
                  'Content-Type': 'application/json',
                  redirect: 'follow',
                  'X-Orgid':
                    'l6WxJyXH6toDsTnOIOZYxy8jBshOlEzDZzp2iqdxg7dT60Wh52BDw0Dhq276qcSlQCbayrWOpdHCXGmvZTA1UU0R16Knj76FDCGkOlpSlWsj1MlkqOrHtkQWWataMfsm',
                },
              })
              .then(res => {
                console.log('ress tokennnn role', res);
                const resultRole = res.data;

                console.log('resul role', res.data);

                console.log(
                  'deviceToken --------------',
                  issueProfile.numberid,
                );
                const userData = {
                  nama: issueProfile.user,
                  is_login: '1',
                  device_token: device_token,
                  nim: issueProfile.numberid,
                };
                console.log('user data', userData);

                setUser({
                  token: tokenTelkom.token,
                  token_expired: tokenTelkom.expired,
                  role: resultRole[0].role,
                  fullName: issueProfile.fullname,
                  numberId: issueProfile.numberid,
                  studyProgram: issueProfile.studyprogram,
                  faculty: issueProfile.faculty,
                  studentClass: issueProfile.studentclass,
                  photo: issueProfile.photo,
                  phone: issueProfile.phone,
                  authenticated: true,
                });

                axios
                  .post(`${ENDPOINT_API_SMART_CANTEEN}userapk`, userData)
                  .then(res => {
                    console.log('eree', res);
                    storeData('token', {value: res.data.data.access_token});
                    storeData('userApk', {value: res.data.data.user});
                    console.log('respon user apk', res);

                    dispatch(setLoading(false));
                    navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
                  })
                  .catch(err => {
                    dispatch(setLoading(false));
                    if (err?.message == 'Network Error') {
                      showMessage(err?.message);
                    } else {
                      Alert.alert(
                        'Oops!',
                        `Server Error, hubungi admin (issue update Token Sign In) ${err.response.data.message}`,
                      );
                    }

                    console.log('errorr di bagian post userAPK', err?.response);
                  });
              })
              .catch(err => {
                dispatch(setLoading(false));
                if (err?.message == 'Network Error') {
                  showMessage(err?.message);
                } else {
                  Alert.alert(
                    'Oops!',
                    'Akun anda tidak dikenali  (issue role)',
                  );
                }

                console.log('eerrrr get role', err);
              });
          })
          .catch(err => {
            dispatch(setLoading(false));
            if (err?.message == 'Network Error') {
              showMessage(err?.message);
            } else {
              Alert.alert(
                'Oops!',
                `Akun anda tidak dikenali, hubungi admin (issue profile) ${err?.response?.data.message}`,
              );
            }

            console.log('eerrrr', err);
          });
      })
      .catch(err => {
        dispatch(setLoading(false));
        if (err?.message == 'Network Error') {
          showMessage(err?.message);
        } else {
          Alert.alert('Oops!', err?.response?.data?.message);
        }

        console.log('eror', err?.response);
      });
  };
