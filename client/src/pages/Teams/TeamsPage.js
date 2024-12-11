import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TeamsContext from '../../context/TeamsContext';

const TeamsPage = () => {
    const { teams, fetchTeams } = useContext(TeamsContext);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loadTeams = async () => {
            await fetchTeams();
            setLoading(false);
        };
        loadTeams();
    }, [fetchTeams]);

    if (loading) {
        return <div className="loading">Loading teams...</div>;
    }

    return (
        <div className="teams-page">
            <header>
                <h1>All Teams</h1>
                <button className='submit-btn' onClick={() => navigate('/teams/new')}>Create Team</button>
            </header>

            <section className="teams-list-section">
                {teams.length > 0 ? (
                    <ul className="teams-list">
                        <ul>
                            {teams.map((team) => (
                                <li key={team.team_id} className="team-item">
                                    <Link to={`/teams/${team.team_id}`} className="team-link">
                                        <h2>{team.name}</h2>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </ul>
                ) : (
                    <p>No teams found. </p>
                )}
            </section>
        </div>
    );
};

export default TeamsPage;
