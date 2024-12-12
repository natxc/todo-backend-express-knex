import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProjectsContext from '../../context/ProjectsContext';
import Navbar from '../../components/Navbar';
import Button from '../../components/Button';
import LoadingSpinner from '../../components/LoadingSpinner';
import '../../styles/PageAndDetail.css';

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

    return (
        <div className="object-page">
            <header>
                <Navbar />
            </header>

            <main className="object-page-content">
                <h1 className="page-title">All Projects</h1>
                <div className="create-object-container">
                    <Button
                        onClick={() => navigate('/projects/new')}
                        className="create-object-btn"
                    >
                        Create Project
                    </Button>
                </div>

                {loading ? (
                    <div className="loading-container">
                        <LoadingSpinner />
                        <p>Loading projects...</p>
                    </div>
                ) : (
                    <section className="object-list-section">
                        {projects.length > 0 ? (
                            <ul className="object-list">
                                {projects.map((project) => (
                                    <li key={project.project_id} className="object-item">
                                        <Link to={`/projects/${project.project_id}`} className="object-link">
                                            <h2 className="object-name">{project.name}</h2>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No projects found.</p>
                        )}
                    </section>
                )}
            </main>
        </div>
    );
};

export default ProjectsPage;
