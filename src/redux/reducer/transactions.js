const initFilterOrder = {
  orders: [],
  inProgress: [],
  pastOrder: [],
  feedback: [],
  inProgressBadges: [],
};
export const transactionsReducer = (state = initFilterOrder, action) => {
  if (action.type === 'SET_IN_PROGRESS') {
    return {
      ...state,
      inProgress: action.value,
    };
  }
  if (action.type === 'SET_IN_PROGRESS_BADGES') {
    return {
      ...state,
      inProgressBadges: action.value,
    };
  }
  if (action.type === 'SET_PAST_ORDERS') {
    return {
      ...state,
      pastOrder: action.value,
    };
  }
  if (action.type === 'SET_FEEDBACK') {
    return {
      ...state,
      feedback: action.value,
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
