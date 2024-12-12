import React, { createContext, useState } from 'react';

const TeamsContext = createContext();

const getToken = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('User is not authenticated. Please log in.');
    }
    return token;
};

const apiRequest = async (url, method = 'GET', body = null) => {
    const token = getToken();
    const headers = {
        'Authorization': `Bearer ${token}`,
    };

    if (body) {
        headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
        const errorDetails = await response.text();
        console.error(`API request failed (${url}):`, errorDetails);
        throw new Error(`API request failed: ${errorDetails}`);
    }

    return response.json();
};

export const TeamsProvider = ({ children }) => {
    const [teams, setTeams] = useState([]);

    const createTeam = async (teamData) => {
        try {
            console.log('Creating team with data:', teamData);
            const newTeam = await apiRequest('/teams', 'POST', teamData);
            console.log('Newly created team:', newTeam);
            setTeams((prevTeams) => [...prevTeams, newTeam]);
        } catch (error) {
            console.error('Error creating team:', error);
            throw error;
        }
    };

    const fetchTeams = async () => {
        try {
            const fetchedTeams = await apiRequest('/teams', 'GET');
            console.log('Fetched teams in TeamsContext:', fetchedTeams);
            setTeams(fetchedTeams);
        } catch (error) {
            console.error('Failed to fetch teams:', error);
        }
    };

    const updateTeam = async (id, teamData) => {
        try {
            console.log(`Updating team ${id} with data:`, teamData);
            const updatedTeam = await apiRequest(`/teams/${id}`, 'PUT', teamData);
            console.log('Updated team:', updatedTeam);
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
        try {
            console.log(`Deleting team with id: ${id}`);
            await apiRequest(`/teams/${id}`, 'DELETE');
            console.log(`Team with id ${id} deleted successfully`);
            setTeams((prevTeams) => prevTeams.filter((team) => team.team_id !== id));
        } catch (error) {
            console.error('Error deleting team:', error);
        }
    };

    return (
        <TeamsContext.Provider
            value={{ teams, createTeam, fetchTeams, updateTeam, deleteTeam }}
        >
            {children}
        </TeamsContext.Provider>
    );
};

export default TeamsContext;
