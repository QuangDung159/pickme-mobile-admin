import {
    SET_CURRENT_USER,
    SET_IS_SIGN_IN_OTHER_DEVICE_STORE, SET_LIST_BOOKING_STORE, SET_LIST_CASH_HISTORY_STORE,
    SET_TOKEN,
    SET_VERIFICATION_STORE
} from '../ActionTypes';

const initState = {
    currentUser: {},
    token: '',
    loginInfo: {},
    listCashHistoryStore: [],
    listBookingStore: [],
    verificationIdStore: '',
    verificationStore: null,
    isSignInOtherDeviceStore: false
};

const userReducer = (state = initState, action) => {
    const {
        type,
        payload
    } = action;
    switch (type) {
        case SET_CURRENT_USER: {
            return { ...state, currentUser: payload.currentUser };
        }
        case SET_TOKEN: {
            return { ...state, token: payload.token };
        }
        case SET_LIST_CASH_HISTORY_STORE: {
            return { ...state, listCashHistoryStore: payload.listCashHistoryStore };
        }
        case SET_LIST_BOOKING_STORE: {
            return { ...state, listBookingStore: payload.listBookingStore };
        }
        case SET_IS_SIGN_IN_OTHER_DEVICE_STORE: {
            return { ...state, isSignInOtherDeviceStore: payload.isSignInOtherDeviceStore };
        }
        case SET_VERIFICATION_STORE: {
            return { ...state, verificationStore: payload.verificationStore };
        }
        default: {
            return state;
        }
    }
};

export default userReducer;
