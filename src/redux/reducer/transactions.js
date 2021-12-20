const initFilterOrder = {
  orders: [],
  inProgress: [],
  pastOrder: [],
};
export const transactionsReducer = (state = initFilterOrder, action) => {
  if (action.type === 'SET_IN_PROGRESS') {
    return {
      ...state,
      inProgress: action.value,
    };
  }
  if (action.type === 'SET_PAST_ORDERS') {
    return {
      ...state,
      pastOrder: action.value,
    };
  }
  if (action.type === 'SET_ORDER') {
    return {
      ...state,
      orders: action.value,
    };
  }

  return state;
};
