import { combineReducers } from 'redux';
import teamReducer from './team.js';
import matchReducer from './match.js';
import leaderboardReducer from './leaderboard';
import notificationReducer from './notification';

const reducers = {
    teams: teamReducer,
    matches: matchReducer,
    leaderboard: leaderboardReducer,
    notification: notificationReducer,
};

export default combineReducers(reducers);

