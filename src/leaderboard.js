import React from 'react';
import { useSelector } from 'react-redux'; 

import './leaderboard.scss';

function Leaderboard () {
    const {
        leaderboard,
        teams,
    } = useSelector(state => ({
        leaderboard: state.leaderboard,
        teams: state.matches.teams,
    }));

    return <div className="leaderboard">
        <div className="header team">
            <div className="teamname">Teams</div>
            <div>Pts</div>
            <div>Wins</div>
            <div>Draws</div>
            <div>Losses</div>
            <div>Scored</div>
            <div>Against</div>
        </div>
        {Object.keys(leaderboard).map(teamId => {
            const team = teams[teamId];
            const leadInfo = leaderboard[teamId];
            return <div className="team" key={teamId}>
                <div className="teamname">{team.name}</div>
                <div>{leadInfo.pts}</div>
                <div>{leadInfo.wins}</div>
                <div>{leadInfo.draws}</div>
                <div>{leadInfo.losses}</div>
                <div>{leadInfo.scored}</div>
                <div>{leadInfo.against}</div>
            </div>;
        })}
    </div>;
}

export default Leaderboard;