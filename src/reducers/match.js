import {CREATE_MATCHES, ADD_TEAM, DELETE_TEAM, MODIFY_TEAM, ADD_RESULT} from '../actions/types';

const INITIAL_STATE = {
    list: [],
    teams: {},
};

export default function matches(state, action) {
    if (!state) {
        return INITIAL_STATE;
    }

    if (!action || !action.type) {
        return state;
    }

    switch(action.type) {
        case ADD_TEAM: 
            return {
                ...state,
                teams: {
                    ...state.teams,
                    [action.payload.id]: {
                        id: action.payload.id,
                        name: action.payload.teamName,
                    },
                },
            };
        case MODIFY_TEAM: 
            const newTeams = {
                ...state.teams,
            };
            newTeams[action.payload.id].name = action.payload.teamName;

            return {
                ...state,
                teams: newTeams,
            };
        case DELETE_TEAM: 
            const nt = {
                ...state.teams,
            };
            delete nt[action.payload.id];
            return {
                ...state,
                teams: nt,
            };
        case CREATE_MATCHES:
            return {
                ...state,
                list: action.payload.matches,
            };

        case ADD_RESULT: 
            const matchIndex = state.list.findIndex(match => match.id === action.payload.id);
            const newMatches = [
                ...state.list,
            ];
            const newMatch = {
                ...newMatches[matchIndex],
                localScore: action.payload.localScore,
                visitorScore: action.payload.visitorScore,
            };
            newMatches[matchIndex] = newMatch;

            return {
                ...state,
                list: newMatches,
            };
        default:
            return state;
    }
}