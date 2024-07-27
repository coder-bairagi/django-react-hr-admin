// snackbarReducer.js
import { SHOW_SNACKBAR, HIDE_SNACKBAR } from '../actions/actionTypes';

const initialState = {
    open: false,
    message: "",
    alertType: "success",
    vertical: "top",
    horizontal: "center",
};

const snackbarReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_SNACKBAR:
            return {
                ...state,
                open: true,
                message: action.payload.message,
                alertType: action.payload.alertType,
                vertical: action.payload.vertical || state.vertical,
                horizontal: action.payload.horizontal || state.horizontal,
            };
        case HIDE_SNACKBAR:
            return {
                ...state,
                open: false,
            };
        default:
            return state;
    }
};

export default snackbarReducer;
