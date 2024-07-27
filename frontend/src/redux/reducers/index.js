import { combineReducers } from 'redux';
import userReducer from './userReducer';
import companyReducer from './companyReducer';
import snackbarReducer from './snackbarReducer';
// import other reducers here if needed

const rootReducer = combineReducers({
    user: userReducer,
    company: companyReducer,
    snackbar: snackbarReducer,
    // other reducers here
});

export default rootReducer;
