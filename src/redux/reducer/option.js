const initOption = {
  method: '',
  location: '',
  speclocation: '',
};

export const optionReducer = (state = initOption, action) => {
  if (action.type === 'SET_OPTION_USER') {
    return {
      ...state,
      method: action.value.method,
    };
  }
  if (action.type === 'SET_LOCATION_USER') {
    return {
      ...state,
      location: action.value.location,
      speclocation: action.value.speclocation,
    };
  }
  return state;
};
