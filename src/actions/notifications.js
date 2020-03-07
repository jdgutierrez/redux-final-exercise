import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from "./types"

export const showNotification = (message) => dispatch => {
    setTimeout(() => {
        dispatch({
            type: HIDE_NOTIFICATION,
        });
    }, 5000);
    return dispatch({
        type: SHOW_NOTIFICATION,
        payload: {
            message,
        },
    });
}