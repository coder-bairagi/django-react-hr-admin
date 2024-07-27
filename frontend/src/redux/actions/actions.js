import {
  SET_USER_INFO,
  SET_COMPANY_INFO,
  SHOW_SNACKBAR,
  HIDE_SNACKBAR,
  CLEAR_USER_INFO
} from './actionTypes';

// Company Info
export const setCompanyInfo = (companyInfo) => ({
  type: SET_COMPANY_INFO,
  payload: companyInfo
});

// User Info
export const setUserInfo = (userInfo) => ({
  type: SET_USER_INFO,
  payload: userInfo
});
export const clearUserInfo = () => ({
  type: CLEAR_USER_INFO,
})

// Snackbar Show/Hide
export const showSnackbar = (snkInfo) => ({
  type: SHOW_SNACKBAR,
  payload: snkInfo
});
export const hideSnackbar = () => ({
  type: HIDE_SNACKBAR,
});
