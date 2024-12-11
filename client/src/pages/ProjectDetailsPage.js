import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProjectsContext from '../context/ProjectsContext';
import IssuesContext from '../context/IssuesContext';

const ProjectDetailsPage = () => {
    const { id } = useParams();
    const { projects } = useContext(ProjectsContext);
    const { issues, fetchIssues } = useContext(IssuesContext);
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProjectDetails = async () => {
            const currentProject = projects.find((project) => project.id === id);
            setProject(currentProject);
            await fetchIssues();
            setLoading(false);
        };

        loadProjectDetails();
    }, [id, projects, fetchIssues]);

    if (loading) {
        return <div className="loading">Loading project details...</div>;
    }

    if (!project) {
        return <div className="error">Project not found.</div>;
    }

    const projectIssues = issues.filter((issue) => issue.projectId === id);

    return (
        <div className="project-details-page">
            <header className="project-header">
                <h1>{project.name}</h1>
                <p>{project.description}</p>
            </header>

            <section className="project-issues-section">
                <h2>Issues</h2>
                {projectIssues.length > 0 ? (
                    <ul className="issues-list">
                        {projectIssues.map((issue) => (
                            <li key={issue.id} className="issue-item">
                                <Link to={`/issues/${issue.id}`} className="issue-link">
                                    <h3>{issue.title}</h3>
                                    <p>Status: <strong>{issue.status}</strong></p>
                                    <p>Priority: <strong>{issue.priority}</strong></p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No issues found for this project.</p>
                )}
            </section>
        </div>
    );
};

export default ProjectDetailsPage;