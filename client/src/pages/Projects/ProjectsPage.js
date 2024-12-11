import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProjectsContext from '../../context/ProjectsContext';

const ProjectsPage = () => {
    const { projects, fetchProjects } = useContext(ProjectsContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProjects = async () => {
            await fetchProjects();
            setLoading(false);
        };
        loadProjects();
    }, [fetchProjects]);

    if (loading) {
        return <div className="loading">Loading projects...</div>;
    }

    return (
        <div className="projects-page">
            <header>
                <h1>All Projects</h1>
            </header>

            <section className="projects-list-section">
                {projects.length > 0 ? (
                    <ul className="projects-list">
                        {projects.map((project) => (
                            <li key={project.id} className="project-item">
                                <Link to={`/projects/${project.id}`} className="project-link">
                                    <h2>{project.name}</h2>
                                    <p>{project.description}</p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No projects found.</p>
                )}
            </section>
        </div>
    );
};

export default ProjectsPage;