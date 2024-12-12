import React, { createContext, useState } from 'react';

const TeamsContext = createContext();

export const TeamsProvider = ({ children }) => {
    const [teams, setTeams] = useState([]);

    const createTeam = async (teamData) => {
        try {
            const response = await fetch('/teams', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(teamData),
            });

            if (!response.ok) {
                throw new Error('Failed to create team');
            }

            const newTeam = await response.json();
            setTeams((prevTeams) => [...prevTeams, newTeam]);
        } catch (error) {
            console.error('Error creating team:', error);
            throw error;
        }
    };

    const fetchTeams = async () => {
        try {
            const response = await fetch('/teams');
            const data = await response.json();
            console.log('Fetched teams in TeamsContext:', data);
            setTeams(data);
            console.log('Updated teams state in TeamsContext:', teams);
        } catch (error) {
            console.error('Failed to fetch teams:', error);
        }
    };


    const updateTeam = async (id, teamData) => {
        try {
            const response = await fetch(`/teams/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(teamData),
            });
            if (!response.ok) {
                throw new Error('Failed to update team');
            }

            const updatedTeam = await response.json();
            setTeams((prevTeams) =>
                prevTeams.map((team) =>
                    team.team_id === id ? { ...team, ...updatedTeam } : team
                )
            );
        } catch (error) {
            console.error('Error updating team:', error);
        }
    };


    const deleteTeam = async (id) => {
        await fetch(`/teams/${id}`, { method: 'DELETE' });
        setTeams((prevTeams) => prevTeams.filter((team) => team.team_id !== id));
    };

    return (
        <TeamsContext.Provider value={{ teams, createTeam, fetchTeams, updateTeam, deleteTeam }}>
            {children}
        </TeamsContext.Provider>
    );
};

export default TeamsContext;
