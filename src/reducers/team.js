import {ADD_TEAM, DELETE_TEAM, MODIFY_TEAM} from '../actions/types';

const INITIAL_STATE = {
    list: [],
};

export default function teams(state, action) {
    if (!state) {
        return INITIAL_STATE;
    }

    if (!action || !action.type) {
        return state;
    }

    switch(action.type) {
        case ADD_TEAM: 
            return {
                list: [
                    ...state.list,
                    {
                        id: action.payload.id,
                        name: action.payload.teamName,
                    },
                ],
            };
        case DELETE_TEAM: 
            const index = state.list.findIndex(team => team.id === action.payload.id);
            return {
                list: [
                    ...state.list.slice(0, index),
                    ...state.list.slice(index + 1),
                ],
            };
        case MODIFY_TEAM: 
            const ix = state.list.findIndex(team => team.id === action.payload.id);
            return {
                list: [
                    ...state.list.slice(0, ix),
                    {
                        id: action.payload.id,
                        name: action.payload.teamName,
                    },
                    ...state.list.slice(ix + 1),
                ],
            };
        default:
            return state;
    }
}