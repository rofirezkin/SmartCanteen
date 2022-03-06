import axios from 'axios';
import {setLoading} from '.';

/**
 * make a request to api without token
 * @param {string} url
 * @param {('post' | 'get')} method
 * @param {object=} payload
 * @returns object
 */
export const useRequestLogin = (url, method, payload) => async dispatch => {
  console.log('resquestt', url, payload);
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
      console.log('testingg login', res);
      dispatch(setLoading(false));
    })
    .catch(err => {
      dispatch(setLoading(false));
      console.log('eror', err);
    })
    .then(responseJson => responseJson);
};
