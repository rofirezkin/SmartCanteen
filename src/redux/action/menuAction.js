import axios from 'axios';
import {ENDPOINT_API_SMART_CANTEEN} from '../../utils/API/httpClient';

export const getDataMenuByTypes = types => async dispatch => {
  const result = await axios
    .get(`${ENDPOINT_API_SMART_CANTEEN}users/menu/fetch?category_menu=${types}`)
    .then(res => {
      if (types === 'New Menu') {
        dispatch({type: 'SET_NEW_TASTE', value: res.data.data});
      }
      if (types === 'Popular') {
        dispatch({type: 'SET_POPULAR', value: res.data.data});
      }
      if (types === 'Recommended') {
        dispatch({type: 'SET_RECOMMENDED', value: res.data.data});
      }
    })
    .catch(err => {
      console.log(err.message);
    });

  return Promise.resolve(result);
};

export const getDataMenuSeveralByTypes = types => async dispatch => {
  const result = await axios
    .get(
      `${ENDPOINT_API_SMART_CANTEEN}users/menu/fetch/several?category_menu=${types}`,
    )
    .then(res => {
      if (types === 'New Taste') {
        dispatch({type: 'SET_SEVERAL_NEW_TASTE', value: res.data.data.data});
      }
      if (types === 'Popular') {
        dispatch({type: 'SET_SEVERAL_POPULAR', value: res.data.data.data});
      }
      if (types === 'Recommended') {
        dispatch({type: 'SET_SEVERAL_RECOMMENDED', value: res.data.data.data});
      }
    })
    .catch(err => {
      console.log('several recommended dll', err.response);
    });

  return Promise.resolve(result);
};

export const getDataFetchMenu = () => async dispatch => {
  const result = await axios
    .get(`${ENDPOINT_API_SMART_CANTEEN}users/menu/fetch`)
    .then(res => {
      dispatch({type: 'SET_ALL_MENU', value: res.data.data});
    })
    .catch(err => {
      console.log('all menu, di action', err.message);
    });

  return Promise.resolve(result);
};

export const getAllMenuUsers = id_tenant => async dispatch => {
  const result = await axios
    .get(
      `${ENDPOINT_API_SMART_CANTEEN}users/menu/fetch/byTenant?id_tenant=${id_tenant}`,
    )
    .then(res => {
      const dataFood = res.data.data;
      const foodMenu = dataFood.filter(res => res.category === 'Makanan');
      const baveragesMenu = dataFood.filter(res => res.category === 'Minuman');
      dispatch({
        type: 'SET_USERS_MENU',
        value: res.data.data,
      });
      dispatch({type: 'SET_FOOD_MENU', value: foodMenu});
      dispatch({type: 'SET_BEVERAGES_MENU', value: baveragesMenu});
    })
    .catch(err => {
      console.log('makanan or minuman', err.response);
    });

  return Promise.resolve(result);
};

// export const getAllMenuByCategory = (id_tenant, category) => async dispatch => {
//   const result = await axios
//     .get(
//       `${ENDPOINT_API_SMART_CANTEEN}users/menu/fetch/byTenant?id_tenant=${id_tenant}&category=${category}`,
//     )
//     .then(res => {
//       if (category === 'Makanan') {
//         console.log('res makanan', res.data.data);
//         dispatch({
//           type: 'SET_FOOD_MENU',
//           value: res.data.data.data,
//         });
//       }
//       if (category === 'Minuman') {
//         console.log('res minuman', res.data.data);
//         dispatch({
//           type: 'SET_BEVERAGES_MENU',
//           value: res.data.data.data,
//         });
//       }
//     })
//     .catch(err => {
//       console.log(err.response);
//     });

//   return Promise.resolve(result);
// };
