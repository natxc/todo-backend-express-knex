import React, { createContext, useState } from 'react';

const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);

    const createProject = async (projectData) => {
        try {
            const response = await fetch('/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(projectData),
            });
            console.log(response);
            if (!response.ok) {
                throw new Error('Failed to create project');
                
            }

            const newProject = await response.json();
            setProjects((prevProjects) => [...prevProjects, newProject]);
        } catch (error) {
            console.error('Error creating project:', error);
            throw error;
        }
    };

    const fetchProjects = async () => {
        try {
            const response = await fetch('/projects');
            const data = await response.json();
            setProjects(data);
        } catch (error) {
            console.error('Failed to fetch projects:', error);
        }
    };


    const updateProject = async (id, projectData) => {
        await fetch(`/projects/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(projectData),
        });
        fetchProjects();
    };

    const deleteProject = async (id) => {
        await fetch(`/projects/${id}`, { method: 'DELETE' });
        setProjects((prevProjects) => prevProjects.filter((project) => project.project_id !== id));
    };

    return (
        <ProjectsContext.Provider value={{ projects, createProject, fetchProjects, updateProject, deleteProject }}>
            {children}
        </ProjectsContext.Provider>
    );
};

export default ProjectsContext;
