import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {addTeam, deleteTeam, modifyTeam} from './actions/teams';
import {showNotification} from './actions/notifications';

function Teams () {
    const [teamName, setTeamName] = useState('');
    const [newTeamName, setNewTeamName] = useState(null);
    const [teamToEdit, setTeamToEdit] = useState(null);
    const dispatch = useDispatch();
    const teams = useSelector(state => state.teams.list);
    return <div className="teams">
        <h1>Teams</h1>
        <input value={teamName} onChange={(evt) => {
            const newValue = evt.currentTarget.value;
            setTeamName(newValue);
        }}/>
        <button disabled={!teamName} onClick={() => {
            dispatch(addTeam(teamName));
            dispatch(showNotification('Team added'));
            setTeamName('');
        }}>Add</button>
        {teams.map(team => {
            if (team.id === teamToEdit) {
                const name = newTeamName === null ? team.name : newTeamName;
                return <div key={team.id} className="team">
                    <div>
                        <input value={name} onChange={(evt) => {
                            const newValue = evt.currentTarget.value;
                            setNewTeamName(newValue);
                        }} /> 
                        <button disabled={newTeamName === null} onClick={() => {
                            dispatch(modifyTeam(team.id, newTeamName));
                            setTeamToEdit(null);
                            setNewTeamName(null);
                            dispatch(showNotification('Team Updated'));
                        }}>Guardar</button>
                        <button onClick={() => {
                            setTeamToEdit(null);
                        }}>Cancelar</button>
                    </div>
                </div>;
            }

            return <div key={team.id} className="team">
                <div>
                    {team.name}
                    <button onClick={() => {
                        setTeamToEdit(team.id);
                    }}>Editar</button>
                    <button onClick={() => {
                        dispatch(deleteTeam(team.id));
                        dispatch(showNotification('Team deleted'));
                    }}>Eliminar</button>
                </div>
            </div>;
        })}
    </div>;
}

export default Teams;