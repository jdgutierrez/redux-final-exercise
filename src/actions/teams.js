import {v4} from 'uuid';
import {ADD_TEAM, DELETE_TEAM, MODIFY_TEAM} from './types';

export const addTeam = (teamName) => ({
    type: ADD_TEAM,
    payload: {
        teamName,
        id: v4(),
    },
});

export const deleteTeam = (id) => ({
    type: DELETE_TEAM,
    payload: {
        id
    },
});

export const modifyTeam = (id, teamName) => ({
    type: MODIFY_TEAM,
    payload: {
        id,
        teamName,
    },
});