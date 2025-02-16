import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import ProjectsContext from '../../context/ProjectsContext';
import Navbar from '../../components/Navbar';
import Button from '../../components/Button';

const ProjectDetailsPage = () => {
    const { id } = useParams();
    const { state } = useLocation();
    const { projects, fetchProjects } = useContext(ProjectsContext);
    const [project, setProject] = useState(state?.updatedProject || null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loadProjectDetails = async () => {
            if (!state?.updatedProject && projects.length === 0) {
                await fetchProjects();
            }
            const currentProject =
                state?.updatedProject || projects.find((project) => project.project_id === Number(id));
            setProject(currentProject);
            setLoading(false);
        };

        loadProjectDetails();
    }, [id, projects, state, fetchProjects ]);

    if (loading) {
        return <div className="loading">Loading project details...</div>;
    }

    if (!project) {
        return <div className="error">Project not found.</div>;
    }

    const projectProjects = projects.filter((project) => project.project_id === Number(id));

    return (
        <div className="project-details-page">
            <header>
                <Navbar />
            </header>
            <main className="main-content" style={{
                backgroundImage: `url('/assets/hero.png')`
            }}>
                <h1 style={{ textAlign: 'center', paddingTop: '5em' }}>{project.name}</h1>
            <Button onClick={() => navigate(`/projects/${id}/edit`)} >
                    Edit Project
            </Button>

            <section className="project-projects-section">
                <h2>Projects</h2>
                {projectProjects.length > 0 ? (
                    <ul className="projects-list">
                        {projectProjects.map((project) => (
                            <li key={project.project_id} className="project-item">
                                <Link to={`/projects/${project.project_id}`} className="project-link">
                                    <h3>{project.name}</h3>
                                    <p>{project.description}</p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No projects found for this project.</p>
                )}
            </section>
            </main>
        </div>
    );
};

export default ProjectDetailsPage;
