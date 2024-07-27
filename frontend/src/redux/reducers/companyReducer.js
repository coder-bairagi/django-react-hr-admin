import { SET_COMPANY_INFO } from '../actions/actionTypes';

const initialState = {
  companyName: 'Stark Industries'
};

const companyReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMPANY_INFO:
      return {
        ...state,
        companyName: action.payload.companyName
      };
    default:
      return state;
  }
};

export default companyReducer;
