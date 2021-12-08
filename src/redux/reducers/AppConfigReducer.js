import * as Localization from 'expo-localization';
import {
    SET_COUNTDOWN_SEND_OTP_REDUX,
    SET_DEVICE_LOCALE, SET_DEVICE_TIMEZONE,
    SET_EXPO_TOKEN,
    SET_NAVIGATION,
    SET_PERSON_TAB_ACTIVE_INDEX,
    SET_SHOW_LOADER_STORE
} from '../ActionTypes';

const initState = {
    timezone: Localization.timezone,
    localeName: Localization.locale,
    expoToken: '',
    navigationObj: null,
    personTabActiveIndex: 0,
    showLoaderStore: false,
    countdownSendOtpRedux: 0
};

const appConfigReducer = (state = initState, action) => {
    const { payload, type } = action;
    switch (type) {
        case SET_DEVICE_TIMEZONE: {
            return { ...state, timezone: Localization.timezone };
        }
        case SET_DEVICE_LOCALE: {
            return { ...state, localeName: Localization.locale };
        }
        case SET_EXPO_TOKEN: {
            return { ...state, expoToken: payload.expoToken };
        }
        case SET_NAVIGATION: {
            return { ...state, navigationObj: payload.navigationObj };
        }
        case SET_PERSON_TAB_ACTIVE_INDEX: {
            return { ...state, personTabActiveIndex: payload.personTabActiveIndex };
        }
        case SET_SHOW_LOADER_STORE: {
            return { ...state, showLoaderStore: payload.showLoaderStore };
        }
        case SET_COUNTDOWN_SEND_OTP_REDUX: {
            return { ...state, countdownSendOtpRedux: payload.countdownSendOtpRedux };
        }
        default: {
            return state;
        }
    }
};

export default appConfigReducer;
