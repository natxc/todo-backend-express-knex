import { useContext, useEffect } from 'react';
import ProjectsContext from '../context/ProjectsContext';

const useProjects = () => {
    const { projects, fetchProjects } = useContext(ProjectsContext);

    useEffect(() => {
        if (projects.length === 0) {
            fetchProjects();
        }
    }, [projects, fetchProjects]);

    return { projects };
};

export default useProjects;