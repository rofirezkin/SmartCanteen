export const ENDPOINT = 'https://gateway.telkomuniversity.ac.id/issueauth';
export const ENDPOINT_PROFILE = 'https://gateway.telkomuniversity.ac.id/issueprofile'
export const ENDPOINT_ROLE = 'https://gateway.telkomuniversity.ac.id/issuerole'
export const ENDPOINT_API_SMART_CANTEEN = 'http://27.112.78.169/api/'
export const ENDPOINT_SMART_CANTEEN = 'http://27.112.78.169'



const headersResponseAPITELKOM = (methodH = '',payloadH,tokenH = '') => {
  switch(methodH){
    case 'post':
      return {
        methodH,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokenH}`,
            'X-Orgid': 'l6WxJyXH6toDsTnOIOZYxy8jBshOlEzDZzp2iqdxg7dT60Wh52BDw0Dhq276qcSlQCbayrWOpdHCXGmvZTA1UU0R16Knj76FDCGkOlpSlWsj1MlkqOrHtkQWWataMfsm',
            redirect: 'follow',
         },
         body: JSON.stringify(payloadH),
      }
    case 'get':
      return {
        methodH,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokenH}`,
            'X-Orgid': 'l6WxJyXH6toDsTnOIOZYxy8jBshOlEzDZzp2iqdxg7dT60Wh52BDw0Dhq276qcSlQCbayrWOpdHCXGmvZTA1UU0R16Knj76FDCGkOlpSlWsj1MlkqOrHtkQWWataMfsm',
            redirect: 'follow',
         },
      }
  }
}

const headersResponseWithToken = (methodH = '',payloadH,tokenH = '') => {
  switch(methodH){
    case 'post':
      return {
        methodH,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokenH}`,
            redirect: 'follow',
         },
         body: JSON.stringify(payloadH),
      }
    case 'get':
      return {
        methodH,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokenH}`,
            redirect: 'follow',
         },
      }
  }
}


const headersResponseWithoutToken = (methodH = '',payloadH) => {
  switch(methodH){
    case 'post':
      return {
        methodH,
        headers: {
            'Content-Type': 'application/json',
            redirect: 'follow',
         },
         body: JSON.stringify(payloadH),
      }
    case 'get':
      return {
        methodH,
        headers: {
            'Content-Type': 'application/json',
            redirect: 'follow',
         },
      }
  }
}





/**
 * make a request to api without token
 * @param {string} url
 * @param {('post' | 'get')} method
 * @param {object=} payload
 * @returns object
 */
export const useRequestLogin = async (url, method, payload) => {
  const request = await fetch(url, {
    method,
    headers: {
      Authorization: 'Bearer ',
      'Content-Type': 'application/json',
      redirect: 'follow',
      'X-Orgid': 'l6WxJyXH6toDsTnOIOZYxy8jBshOlEzDZzp2iqdxg7dT60Wh52BDw0Dhq276qcSlQCbayrWOpdHCXGmvZTA1UU0R16Knj76FDCGkOlpSlWsj1MlkqOrHtkQWWataMfsm'
    },
    body: payload,
    
  })
    .then((res) => res.json())
    .then((responseJson) => responseJson)
  return Promise.resolve(request);
};

/**
 * make a request to api without token
 * @param {string} url
 * @param {('post' | 'get')} method
 * @param {object=} payload
 * @returns object
 */
export const useRequest = async (url, method, payload) => {
  const request = await fetch(url, {
    method,
    headers: {
      Authorization: 'Basic ',
      'Content-Type': 'application/json',
      redirect: 'follow',
      'Accept-Encoding' : 'gzip, deflate, br'
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((responseJson) => responseJson)
    .catch((err) => {
      console.log('error', err);
    });

  return Promise.resolve(request);
};


/**
 * make a request to api with token
 * @param {string} url
 * @param {string} token
 * @param {('post' | 'get')} method
 * @param {object=} payload
 * @returns object
 */
export const useRequestWithToken = async (url, token, method, payload) => {
    const request = await fetch(url, headersResponseAPITELKOM(method,payload,token))
    .then((res) => res.json())
    .then((responseJson) => responseJson)
    .catch((err) => {
      console.log('error', err);
    });

    
    return Promise.resolve(request);
};




/**
 * make a request to api with token
 * @param {string} url
 * @param {string} token
 * @param {('post' | 'get')} method
 * @param {object=} payload
 * @returns object
 */

export const useRequestFetchData = async (url, method, payload) => {
  const request = await fetch(url, headersResponseWithoutToken(method,payload))
    .then((res) => res.json())
    .then((responseJson) => console.log(responseJson))

  return Promise.resolve(request);
}

