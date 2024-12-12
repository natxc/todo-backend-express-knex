import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TeamsContext from '../../context/TeamsContext';
import Navbar from '../../components/Navbar';

const TeamsPage = () => {
    const { teams, fetchTeams } = useContext(TeamsContext);
    const navigate = useNavigate();

    useEffect(() => {
        const loadTeams = async () => {
            console.log('Fetching teams...');
            await fetchTeams();
        };
        loadTeams();
    }, [fetchTeams]);

    console.log('Teams in TeamsPage:', teams);

    if (!teams.length) {
        return <div className="loading">No teams found or loading...</div>;
    }

    return (
        <div className="teams-page">
            <header>
                <Navbar />
            </header>

                <h1>All Teams</h1>
                <button className="submit-btn" onClick={() => navigate('/teams/new')}>
                    Create Team
                </button>

            <section className="teams-list-section">
                <ul className="teams-list">
                    {teams.map((team) => (
                        <li key={team.team_id} className="team-item">
                            <Link to={`/teams/${team.team_id}`} className="team-link">
                                <h2>{team.name}</h2>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default TeamsPage;
