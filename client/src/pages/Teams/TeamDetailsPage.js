import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import TeamsContext from '../../context/TeamsContext';
import ProjectsContext from '../../context/ProjectsContext';
import '../../styles/Team.css';
import Navbar from '../../components/Navbar';

const TeamDetailsPage = () => {
    const { id } = useParams();
    const { state } = useLocation();
    const { teams, fetchTeams } = useContext(TeamsContext);
    const { projects, fetchProjects } = useContext(ProjectsContext);
    const [team, setTeam] = useState(state?.updatedTeam || null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    useEffect(() => {
        const loadTeamDetails = async () => {
            if (!state?.updatedTeam && teams.length === 0) {
                await fetchTeams();
            }
            const currentTeam =
                state?.updatedTeam || teams.find((team) => team.team_id === Number(id));
            setTeam(currentTeam);
            setLoading(false);
        };

        loadTeamDetails();
    }, [id, teams, state, fetchTeams, fetchProjects]);

    if (loading) {
        return <div className="loading">Loading team details...</div>;
    }

    if (!team) {
        return <div className="error">Team not found.</div>;
    }

    const teamProjects = projects.filter((project) => project.team_id === Number(id));

    return (
        <div className="team-details-page">
            <header>
                <Navbar />
            </header>
            
                <h1>{team.name}</h1>
                <button onClick={() => navigate(`/teams/${id}/edit`)} className="edit-btn">
                    Edit Team
                </button>
            

            <section className="team-projects-section">
                <h2>Projects</h2>
                {teamProjects.length > 0 ? (
                    <ul className="projects-list">
                        {teamProjects.map((project) => (
                            <li key={project.project_id} className="project-item">
                                <Link to={`/projects/${project.project_id}`} className="project-link">
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
