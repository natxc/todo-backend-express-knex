import React, { createContext, useState } from 'react';

const IssuesContext = createContext();

export const IssuesProvider = ({ children }) => {
    const [issues, setIssues] = useState([]);

    const fetchIssues = async () => {
        try {
            const response = await fetch('/api/issues');
            const data = await response.json();
            setIssues(data);
        } catch (error) {
            console.error('Failed to fetch issues', error);
        }
    };

    return (
        <IssuesContext.Provider value={{ issues, fetchIssues }}>
            {children}
        </IssuesContext.Provider>
    );
};

export default IssuesContext;