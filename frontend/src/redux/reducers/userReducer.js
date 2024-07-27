import { CLEAR_USER_INFO, SET_USER_INFO } from '../actions/actionTypes';

const initialState = {
  name: localStorage.getItem('name') ? localStorage.getItem('name') : null,
  jobPosition: localStorage.getItem('jobPosition') ? localStorage.getItem('jobPosition') : null,
  accessToken: localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : null,
  refreshToken: localStorage.getItem('refreshToken') ? localStorage.getItem('refreshToken') : null,
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_INFO:
      localStorage.setItem('name', action.payload.name || state.name)
      localStorage.setItem('jobPosition', action.payload.jobPosition || state.jobPosition)
      localStorage.setItem('accessToken', action.payload.accessToken || state.accessToken)
      localStorage.setItem('refreshToken', action.payload.refreshToken || state.refreshToken)
      return {
        ...state,
        name: action.payload.name || state.name,
        jobPosition: action.payload.jobPosition || state.jobPosition,
        exp: action.payload.exp,
      }
    case CLEAR_USER_INFO:
      localStorage.removeItem('name')
      localStorage.removeItem('jobPosition')
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      return {
        ...state,
        name: null,
        jobPosition: null,
        exp: null,
      };
    default:
      return state
  }
};

export default userReducer;
