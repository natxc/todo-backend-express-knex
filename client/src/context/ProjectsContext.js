import React, { createContext, useState } from 'react';

const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);

    const fetchProjects = async () => {
        try {
            const response = await fetch('/api/projects');
            const data = await response.json();
            setProjects(data);
        } catch (error) {
            console.error('Failed to fetch projects', error);
        }
    };

    return (
        <ProjectsContext.Provider value={{ projects, fetchProjects }}>
            {children}
        </ProjectsContext.Provider>
    );
};

export default ProjectsContext;