import { ADD_TEAM, DELETE_TEAM, ADD_STATISTICS } from '../actions/types';

const INITIAL_STATE = {};

export default function leaderboard(state, action) {
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
                [action.payload.id]: {
                    pts: 0,
                    wins: 0,
                    losses: 0,
                    draws: 0,
                    scored: 0,
                    against: 0, 
                },
            };
        case DELETE_TEAM: 
            const stateToDelete = {
                ...state,
            };
            delete stateToDelete[action.payload.id];
            return stateToDelete;
            
        case ADD_STATISTICS:
            const newState = {...state};
            const { local, visitor } = action.payload;
            newState[local.id].pts += local.win ? 3 : local.draw ? 1 : 0;
            newState[local.id].wins += local.win ? 1 : 0;
            newState[local.id].draws += local.draw ? 1 : 0;
            newState[local.id].losses += local.loss ? 1 : 0;
            newState[local.id].scored += local.scored;
            newState[local.id].against += local.against;
            
            newState[visitor.id].pts += visitor.win ? 3 : visitor.draw ? 1 : 0;
            newState[visitor.id].wins += visitor.win ? 1 : 0;
            newState[visitor.id].draws += visitor.draw ? 1 : 0;
            newState[visitor.id].losses += visitor.loss ? 1 : 0;
            newState[visitor.id].scored += visitor.scored;
            newState[visitor.id].against += visitor.against;

            return newState;
        default:
            return state;
    }
}