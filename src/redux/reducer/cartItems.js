const initCartItems = {
  allCart: '',
};

export const cartItems = (state = initCartItems, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return [...state, action.payload];
    case 'REMOVE_FROM_CART':
      return state.filter(cartItem => cartItem.id !== action.payload.id);
    case 'GET_DATA_CART':
      return {
        ...state,
        allCart: action.value,
      };
  }

  return state;
};
