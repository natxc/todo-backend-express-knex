import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ProjectsContext from '../context/ProjectsContext';
import IssuesContext from '../context/IssuesContext';
import TeamsContext from '../context/TeamsContext';
import Button from '../components/Button';

const HomePage = () => {
    const { projects, fetchProjects } = useContext(ProjectsContext);
    const { issues, fetchIssues } = useContext(IssuesContext);
    const { teams, fetchTeams } = useContext(TeamsContext);

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            await Promise.all([fetchProjects(), fetchIssues(), fetchTeams()]);
            setLoading(false);
        };
        fetchData();
    }, [fetchProjects, fetchIssues, fetchTeams]);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="home-page">
            <header>
                <h1>Welcome to PMTNODO</h1>
                <p>Project Management Tracker, Negative One Dot Oh. Manage your projects, issues, and teams in the most simple way.</p>
            </header>

            <section className="projects-section">
                <h2>Projects</h2>
                <ul>
                    {projects.map((project) => (
                        <li key={project.project_id}>
                            <Link to={`/projects/${project.project_id}`}>{project.name}</Link>
                        </li>
                    ))}
                </ul>
                <Button onClick={() => navigate('/projects')} className="primary-btn">
                    View All Projects
                </Button>
            </section>

            <section className="issues-section">
                <h2>Your Issues</h2>
                <ul>
                    {issues.slice(0, 5).map((issue) => (
                        <li key={issue.issue_id}>
                            <Link to={`/issues/${issue.issue_id}`}>{issue.title}</Link>
                        </li>
                    ))}
                </ul>
                <Button onClick={() => navigate('/issues')} className="primary-btn">
                    View All Issues
                </Button>
            </section>

            <section className="teams-section">
                <h2>Your Teams</h2>
                <ul>
                    {teams.map((team) => (
                        <li key={team.team_id}>
                            <Link to={`/teams/${team.team_id}`}>{team.name}</Link>
                        </li>
                    ))}
                </ul>
                <Button onClick={() => navigate('/teams')} className="primary-btn">
                    View All Teams
                </Button>
            </section>

            <section className="docs-section">
                <h2>Documentation</h2>
                <p>Access the full API documentation because documentation is vital:</p>
                <Button
                    onClick={() => navigate('/docs')} 
                    className="docs-btn"
                >
                    View API Docs
                </Button>
                <br /><br />
                <h2>Developer's Notes</h2>
                <p>Access notes and other musings/learnings from thsis project:</p>
                <Button onClick={() => navigate('/notes')} className="docs-btn">
                    View Notes
                </Button>
            </section>
        </div>
    );
};

export default HomePage;
