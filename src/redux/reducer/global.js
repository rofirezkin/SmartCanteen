const initGlobalState = {
  token: '',
  token_expired: 0,
  fullName: '',
  numberId: '',
  studyProgram: '',
  faculty: '',
  studentClass: '',
  role: '',
  photo: '/',
  phone: '',
  authenticated: false,
};

export const globalReducer = (state = initGlobalState, action) => {
  if (action.type === 'SET_GLOBAL_USER') {
    return {
      ...state,
      token: action.value.token,
      token_expired: action.value.token_expired,
      fullName: action.value.fullName,
      numberId: action.value.numberId,
      studyProgram: action.value.studyProgram,
      studentClass: action.value.studentClass,
      role: action.value.role,
      photo: action.value.photo,
      phone: action.value.phone,
      authenticated: action.value.authenticated,
    };
  }
  return state;
};
