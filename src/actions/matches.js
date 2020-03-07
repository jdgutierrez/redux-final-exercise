import { CREATE_MATCHES, ADD_RESULT, ADD_STATISTICS } from "./types";
import {v4} from 'uuid';

export const createMatches = (teams) => {
    const matches = [];
    for (let i = 0; i < teams.length; i++) {
        for (let j = i + 1; j < teams.length; j++) {
            matches.push({
                id: v4(),
                local: teams[i].id,
                visitor: teams[j].id,
                localScore: null,
                visitorScore: null,
            });
        }
    }

    return {
        type: CREATE_MATCHES,
        payload: {
            matches,
        },
    };
};

export const addStatitstics = (localId, localScore, visitorId, visitorScore) => {
    const parsedLocalScore = parseInt(localScore, 10);
    const parsedVisitorScore = parseInt(visitorScore, 10);

    const local = {
        id: localId,
        win: parsedLocalScore > parsedVisitorScore,
        draw: parsedLocalScore === parsedVisitorScore,
        loss: parsedLocalScore < parsedVisitorScore,
        scored: parsedLocalScore,
        against: parsedVisitorScore,
    };

    const visitor = {
        id: visitorId,
        win: parsedLocalScore < parsedVisitorScore,
        draw: parsedLocalScore === parsedVisitorScore,
        loss: parsedLocalScore > parsedVisitorScore,
        scored: parsedVisitorScore,
        against: parsedLocalScore,
    };
    
    return {
        type: ADD_STATISTICS,
        payload: {
            local,
            visitor,
        },
    };
};

export const addResult = (id, localId, localScore, visitorId, visitorScore) => dispatch => {
    dispatch(addStatitstics(localId, localScore, visitorId, visitorScore));
    return dispatch({
        type: ADD_RESULT,
        payload: {
            id,
            localId, 
            localScore, 
            visitorId, 
            visitorScore,
        },
    });
}