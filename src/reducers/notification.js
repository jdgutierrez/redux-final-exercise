import {SHOW_NOTIFICATION, HIDE_NOTIFICATION} from '../actions/types';

const INITIAL_STATE = {
    show: false,
    message: '',
};

export default function matches(state, action) {
    if (!state) {
        return INITIAL_STATE;
    }

    if (!action || !action.type) {
        return state;
    }

    switch(action.type) {
        case SHOW_NOTIFICATION: 
            return {
                show: true,
                message: action.payload.message,
            };
        case HIDE_NOTIFICATION: 
            return {
                show: false,
                message: '',
            };
        default:
            return state;
    }
}