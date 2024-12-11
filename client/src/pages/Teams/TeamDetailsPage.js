import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import TeamsContext from '../../context/TeamsContext';
import ProjectsContext from '../../context/ProjectsContext';

const TeamDetailsPage = () => {
    const { id } = useParams();
    const { teams } = useContext(TeamsContext);
    const { projects, fetchProjects } = useContext(ProjectsContext);
    const [team, setTeam] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTeamDetails = async () => {
            const currentTeam = teams.find((team) => team.id === id);
            setTeam(currentTeam);
            await fetchProjects();
            setLoading(false);
        };

        loadTeamDetails();
    }, [id, teams, fetchProjects]);

    if (loading) {
        return <div className="loading">Loading team details...</div>;
    }

    if (!team) {
        return <div className="error">Team not found.</div>;
    }

    const teamProjects = projects.filter((project) => project.teamId === id);

    return (
        <div className="team-details-page">
            <header className="team-header">
                <h1>{team.name}</h1>
                <p>{team.description}</p>
            </header>

            <section className="team-projects-section">
                <h2>Projects</h2>
                {teamProjects.length > 0 ? (
                    <ul className="projects-list">
                        {teamProjects.map((project) => (
                            <li key={project.id} className="project-item">
                                <Link to={`/projects/${project.id}`} className="project-link">
                                    <h3>{project.name}</h3>
                                    <p>{project.description}</p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No projects found for this team.</p>
                )}
            </section>
        </div>
    );
};

export default TeamDetailsPage;