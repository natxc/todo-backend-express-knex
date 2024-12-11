import React, { createContext, useState } from 'react';

const TeamsContext = createContext();

export const TeamsProvider = ({ children }) => {
    const [teams, setTeams] = useState([]);

    const fetchTeams = async () => {
        try {
            const response = await fetch('/api/teams');
            const data = await response.json();
            setTeams(data);
        } catch (error) {
            console.error('Failed to fetch teams', error);
        }
    };

    return (
        <TeamsContext.Provider value={{ teams, fetchTeams }}>
            {children}
        </TeamsContext.Provider>
    );
};

export default TeamsContext;