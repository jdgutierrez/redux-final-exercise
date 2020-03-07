import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {} from './actions/teams';
import { createMatches, addResult } from './actions/matches';

function Teams () {
    const [assignResultTo, setAssignResultTo] = useState(null);
    const [localScore, setLocalScore] = useState(null);
    const [visitorScore, setVisitorScore] = useState(null);
    const [filter, setFilter] = useState(false); 
    const dispatch = useDispatch();
    const {matches, teams, teamsObject} = useSelector(state => ({
        matches: state.matches.list,
        teamsObject: state.matches.teams,
        teams: state.teams.list,
    }));

    if (matches.length === 0) {
        return <div className="teams">
            <h1>Matches</h1>
            <p>
                There are no matches
            </p>
            <button onClick={() => {
                dispatch(createMatches(teams));
            }}>Create Matches</button>
        </div>;
    } 

    return <div className="teams">
        <h1>Matches</h1>
        <div style={{margin: '10px 0' }}>
            <input id="filter" type="checkbox" checked={filter} onChange={() => {
                setFilter(!filter);
            }}/> 
            <label htmlFor="filter">
                Show only matches without result
            </label>
        </div>
        {matches.map(match => {
            const local = teamsObject[match.local];
            const visitor = teamsObject[match.visitor];
            const isMatchUnset = localScore === null || visitorScore === null;
            const isReduxMatchUnset = match.localScore === null;

            if (!isReduxMatchUnset && filter) {
                return null;
            }

            if (match.id === assignResultTo) {
                return <div key={match.id}>
                    {local.name} <input value={localScore} onChange={(evt) => {
                        const newValue = evt.currentTarget.value;
                        setLocalScore(newValue);
                    }}/>
                    vs 
                    {visitor.name} <input value={visitorScore} onChange={(evt) => {
                        const newValue = evt.currentTarget.value;
                        setVisitorScore(newValue);
                    }}/>
                    <button disabled={isMatchUnset} onClick={() => {
                        dispatch(addResult(match.id, local.id, localScore, visitor.id, visitorScore));
                        setAssignResultTo(null);
                        setLocalScore(null);
                        setVisitorScore(null);
                    }}>Guardar</button>
                    <button onClick={() => {
                        setAssignResultTo(null);
                        setLocalScore(null);
                        setVisitorScore(null);
                    }}>Cancelar</button>
                </div>;
            }

            return <div key={match.id}>
                {local.name} {match.localScore} - {match.visitorScore} {visitor.name}
                {isReduxMatchUnset && <button onClick={() => {
                    setAssignResultTo(match.id);
                }}>Set Result</button>}
            </div>;
        })}
    </div>;
}

export default Teams;