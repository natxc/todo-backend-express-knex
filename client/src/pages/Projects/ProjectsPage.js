import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProjectsContext from '../../context/ProjectsContext';

const ProjectsPage = () => {
    const { projects, fetchProjects } = useContext(ProjectsContext);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

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
                <button className='submit-btn' onClick={() => navigate('/projects/new')}>Create Project</button>
            </header>

            <section className="projects-list-section">
                {projects.length > 0 ? (
                    <ul className="projects-list">
                        <ul>
                            {projects.map((project) => (
                                <li key={project.project_id} className="project-item">
                                    <Link to={`/projects/${project.project_id}`} className="project-link">
                                        <h2>{project.name}</h2>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </ul>
                ) : (
                    <p>No projects found. </p>
                )}
            </section>
        </div>
    );
};

export default ProjectsPage;
