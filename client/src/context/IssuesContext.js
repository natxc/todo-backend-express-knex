import React, { createContext, useState } from 'react';

const IssuesContext = createContext();

export const IssuesProvider = ({ children }) => {
    const [issues, setIssues] = useState([]);

    const createIssue = async (issueData) => {
        try {
            const response = await fetch('/issues', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(issueData),
            });

            if (!response.ok) {
                throw new Error('Failed to create issue');
            }

            const newIssue = await response.json();
            setIssues((prevIssues) => [...prevIssues, newIssue]);
        } catch (error) {
            console.error('Error creating issue:', error);
            throw error;
        }
    };

    const fetchIssues = async () => {
        try {
            const response = await fetch('/issues');
            const data = await response.json();
            setIssues(data);
        } catch (error) {
            console.error('Failed to fetch issues:', error);
        }
    };


    const updateIssue = async (id, issueData) => {
        await fetch(`/issues/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(issueData),
        });
        fetchIssues();
    };

    const deleteIssue = async (id) => {
        await fetch(`/issues/${id}`, { method: 'DELETE' });
        setIssues((prevIssues) => prevIssues.filter((issue) => issue.issue_id !== id));
    };

    return (
        <IssuesContext.Provider value={{ issues, createIssue, fetchIssues, updateIssue, deleteIssue }}>
            {children}
        </IssuesContext.Provider>
    );
};

export default IssuesContext;
